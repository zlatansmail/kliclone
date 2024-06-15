import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./App.css";
import ArticlePage from "./components/pages/articlePage/ArticlePage.jsx";
import Homepage from "./components/pages/homepage/Homepage.jsx";
import RegisterPage from "./components/users/register/RegisterPage.jsx";
import LoginPage from "./components/users/login/LoginPage.jsx";
import ProfilePage from "./components/users/profile/ProfilePage.jsx";
import AdminDashboard from "./components/pages/admin/AdminDashboard.jsx";
import Admin from "./components/pages/admin/screens/admin/Admin.jsx";
import Comments from "./components/pages/admin/screens/comments/Comments.jsx";
import ManagePosts from "./components/pages/admin/screens/managePosts/ManagePosts.jsx";
import EditPost from "./components/pages/admin/screens/editPost/EditPost.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Homepage />} />
        <Route path="/clanak/:slug" element={<ArticlePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<AdminDashboard />}>
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="articles/manage" element={<ManagePosts />} />
          <Route path="articles/manage/edit/:slug" element={<EditPost />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
