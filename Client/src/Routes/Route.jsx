import {
  createBrowserRouter,
} from "react-router";
import NotFound from "../Components/NotFound";
import Home from "../Components/Home";
import Login from "../Components/Login";
import App from "../App";
import Register from "../Components/Register";
import AllArticles from "../Components/AllArticles";
import MyArticles from "../Components/MyArticles";
import PostArticle from "../Components/PostArticle";
import ArticleDetails from './../Components/ArticleDetails';
import PrivateRoute from "../Components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement:<NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"articles",
        element:<AllArticles/>
      },
      {
        path:"articles/:id",
        element:<PrivateRoute><ArticleDetails/></PrivateRoute>
      },
      {
        path:"my-articles",
        element:<MyArticles/>
      },
      {
        path:"post",
        element:<PostArticle/>
      }
    ]
  },
]);