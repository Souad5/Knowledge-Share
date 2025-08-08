const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret';

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
    await client.connect();
    const db = client.db('Assignment-11');
    usersCollection = db.collection('Knowledge');
    articlesCollection = db.collection('articles');
    commentsCollection = db.collection('comments');
    app.post('/jwt',async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token });
    });
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

// Get articles by category
app.get('/api/articles/category/:category', async (req, res) => {
  const category = req.params.category;
  const articles = await articlesCollection
    .find({ category })
    .sort({ createdAt: -1 })
    .toArray();
  res.json(articles);
});


// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await usersCollection.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Wrong password' });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

// Post Article
app.post('/api/articles', verifyToken, async (req, res) => {
  try {
    const { title, content, category, tags, thumbnailUrl, date } = req.body;

    if (!title || !content || !category) {
      return res.status(400).json({ message: 'Title, content, and category are required' });
    }

    const article = {
      title,
      content,
      category,
      tags: typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()) : [],
      thumbnailUrl: thumbnailUrl || '',
      date: date ? new Date(date) : new Date(),
      authorId: new ObjectId(req.userId),
      likes: [],
      createdAt: new Date(),
    };

    const result = await articlesCollection.insertOne(article);
    res.status(201).json({ message: 'Article created', articleId: result.insertedId });
  } catch (error) {
    console.error('Error posting article:', error); // <== Add this
    res.status(500).json({ message: 'Failed to post article' });
  }
});


// // Get All Articles
// app.get('/api/articles', async (req, res) => {
//   const articles = await articlesCollection.find().sort({ createdAt: -1 }).toArray();
//   res.json(articles);
// });


// Replace existing GET /api/articles
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

// Single Article
app.get('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  const article = await articlesCollection.findOne({ _id: new ObjectId(id) });
  res.json(article);
});

// Get comments
app.get('/api/articles/:id/comments', async (req, res) => {
  const comments = await commentsCollection
    .find({ articleId: req.params.id })
    .sort({ date: -1 })
    .toArray();
  res.json(comments);
});

// POST Comment
app.post('/api/articles/:id/comments', async (req, res) => {
  const { userName, userEmail, userPhoto, comment } = req.body;
  const newComment = {
    articleId: req.params.id,
    userName,
    userEmail,
    userPhoto,
    comment,
    date: new Date()
  };
  const result = await commentsCollection.insertOne(newComment);
  res.json(result);
});

//POST Like
app.post('/api/articles/:id/like', async (req, res) => {
  const { userEmail } = req.body;

  const article = await articlesCollection.findOne({ _id: new ObjectId(req.params.id) });
  if (!article.likes?.includes(userEmail)) {
    await articlesCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $addToSet: { likes: userEmail } }
    );
  }

  const updated = await articlesCollection.findOne({ _id: new ObjectId(req.params.id) });
  res.json({ likes: updated.likes?.length || 0 });
});


// Get Article Details + Comments
app.get('/api/articles/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const article = await articlesCollection.findOne({ _id: new ObjectId(id) });
    const comments = await commentsCollection.find({ articleId: id }).toArray();
    res.json({ article, comments });
  } catch {
    res.status(400).json({ message: 'Invalid article ID' });
  }
});

// My Articles
app.get('/api/articles', verifyToken, async (req, res) => {
  const articles = await articlesCollection.find({ authorId: new ObjectId(req.userId) }).toArray();
  res.json(articles);
});

// Get user's articles
app.get("/api/my-articles", verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const articles = await articlesCollection.find({ userEmail: email }).toArray();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete article
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

// Update article
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

// Like/Unlike Article
app.post('/api/articles/:id/like', verifyToken, async (req, res) => {
  const id = req.params.id;
  const userId = new ObjectId(req.userId);
  const article = await articlesCollection.findOne({ _id: new ObjectId(id) });
  if (!article) return res.status(404).json({ message: 'Not found' });

  const hasLiked = article.likes?.some(uid => uid.equals(userId));
  const update = hasLiked ? { $pull: { likes: userId } } : { $addToSet: { likes: userId } };

  await articlesCollection.updateOne({ _id: new ObjectId(id) }, update);
  res.json({ liked: !hasLiked });
});

// Post Comment
app.post('/api/comments', verifyToken, async (req, res) => {
  const { articleId, content } = req.body;
  if (!articleId || !content)
    return res.status(400).json({ message: 'Article ID and content required' });

  const comment = {
    articleId,
    content,
    authorId: new ObjectId(req.userId),
    createdAt: new Date(),
  };
  const result = await commentsCollection.insertOne(comment);
  res.json(result);
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
