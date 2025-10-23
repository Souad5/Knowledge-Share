require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || '0d1f6d56cefaf23b7ddf3fa9b72ac76a';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0evfqhu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

let usersCollection, articlesCollection, commentsCollection;

async function run() {
  try {
    const db = client.db('Assignment-11');
    usersCollection = db.collection('Knowledge');
    articlesCollection = db.collection('articles');
    commentsCollection = db.collection('comments');
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}
run().catch(console.dir);

// Auth middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Missing token' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    req.user = decoded; // Attach full payload for later use
    next();
  });
};

// Routes

app.get('/', (req, res) => {
  res.send('🚀 Knowledge Sharing Platform API');
});

// Register
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password required' });
  }
  const hashed = await bcrypt.hash(password, 10);
  try {
    const exists = await usersCollection.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const result = await usersCollection.insertOne({ name, email, password: hashed });
    res.json({ message: 'User registered' });
  } catch {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login - FIXED here: convert _id to string before signing JWT
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await usersCollection.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Wrong password' });

  const token = jwt.sign(
    { id: user._id.toString(), email: user.email, name: user.name }, // <-- FIX: toString()
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

// JWT endpoint (optional, for frontend token refresh)
app.post('/jwt', async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

// Get articles (optionally filter by category or tag)
app.get('/api/articles', async (req, res) => {
  const { category, tag } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (tag) filter.tags = { $in: [tag] };

  try {
    const articles = await articlesCollection
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch articles" });
  }
});

// Featured
app.get("/api/articles/featured", async (req, res) => {
  const limit = parseInt(req.query.limit) || 0;
  const articles = await articlesCollection
    .find()
    .limit(limit)
    .toArray();
  res.send(articles);
});

// Get all unique categories from articles
app.get("/api/category/home", async (req, res) => {
  try {
    const categories = await articlesCollection.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: 1
        }
      },
      { $sort: { count: -1 } }
    ]).toArray();

    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

// Get top contributors by number of articles
app.get("/api/top-contributors", async (req, res) => {
  try {
    const contributors = await articlesCollection.aggregate([
      {
        $group: {
          _id: "$userEmail",
          totalArticles: { $sum: 1 },
          lastArticleDate: { $max: "$createdAt" }
        }
      },
      { $sort: { totalArticles: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "Knowledge",
          localField: "_id",
          foreignField: "email",
          as: "userInfo"
        }
      },
      {
        $project: {
          _id: 0,
          email: "$_id",
          totalArticles: 1,
          lastArticleDate: 1,
          name: { $arrayElemAt: ["$userInfo.name", 0] }
        }
      }
    ]).toArray();

    res.json(contributors);
  } catch (err) {
    console.error("Error fetching top contributors:", err);
    res.status(500).json({ message: "Failed to fetch contributors" });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  const article = await articlesCollection.findOne({ _id: new ObjectId(req.params.id) });
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json(article);
});

// Get comments for article
app.get('/api/articles/:id/comments', async (req, res) => {
  const comments = await commentsCollection
    .find({ articleId: req.params.id })
    .sort({ date: -1 })
    .toArray();
  res.json(comments);
});

// Like/unlike article
app.post('/api/articles/:id/like', verifyToken, async (req, res) => {
  const id = req.params.id;
  const userEmail = req.user.email;

  const article = await articlesCollection.findOne({ _id: new ObjectId(id) });
  if (!article) return res.status(404).json({ message: 'Article not found' });

  const hasLiked = article.likes?.includes(userEmail);
  const update = hasLiked
    ? { $pull: { likes: userEmail } }
    : { $addToSet: { likes: userEmail } };

  await articlesCollection.updateOne({ _id: new ObjectId(id) }, update);

  const updatedArticle = await articlesCollection.findOne({ _id: new ObjectId(id) });
  res.json({ liked: !hasLiked, likes: updatedArticle.likes?.length || 0 });
});

// Post comment
app.post('/api/articles/:id/comments', verifyToken, async (req, res) => {
  const { comment } = req.body;
  if (!comment) return res.status(400).json({ message: 'Comment required' });

  const newComment = {
    articleId: req.params.id,
    userName: req.user.name,
    userEmail: req.user.email,
    userPhoto: req.user.photoURL || '',
    comment,
    date: new Date(),
  };

  const result = await commentsCollection.insertOne(newComment);
  const insertedComment = await commentsCollection.findOne({ _id: result.insertedId });
  res.json(insertedComment);
});

// Post Article (protected)
app.post('/api/articles', verifyToken, async (req, res) => {
  try {
    const { title, content, category, tags, thumbnailUrl, date } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Title, content, and category are required' });
    }

    const userEmail = req.user?.email || 'unknown@example.com';
    const article = {
      title,
      content,
      category,
      tags: typeof tags === 'string'
        ? tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : Array.isArray(tags)
          ? tags
          : [],
      thumbnailUrl: thumbnailUrl || '',
      date: date ? new Date(date) : new Date(),
      authorId: new ObjectId(req.userId),
      userEmail,
      likes: [],
      createdAt: new Date(),
    };

    const result = await articlesCollection.insertOne(article);

    res.status(201).json({
      message: 'Article created',
      article: { ...article, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error posting article:', error);
    res.status(500).json({ message: 'Failed to post article' });
  }
});

// Get user's articles (protected)
app.get("/api/my-articles", verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const articles = await articlesCollection.find({ userEmail: email }).toArray();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete article (protected)
app.delete("/api/articles/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articlesCollection.findOne({ _id: new ObjectId(id) });
    if (!article || article.userEmail !== req.user.email) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await articlesCollection.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update article (protected)
app.put("/api/articles/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articlesCollection.findOne({ _id: new ObjectId(id) });
    if (!article || article.userEmail !== req.user.email) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const updateData = req.body;
    await articlesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
