import Navbar from './components/navbar';
import HomePage from './components/pages/homePage';
import { Route, Routes } from 'react-router';
import Footer from './components/reusable/footer';
import LoginAndSignup from './components/reusable/login&signup';
import AllBlogsPage from './components/pages/allBlogs';
import AccountPage from './components/pages/acccount';
import NewBlogPage from './components/pages/newBlog';
import BlogPage from './components/pages/blog';
import EditBlogPage from './components/pages/editBlog';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-blogs" element={<AllBlogsPage />} />
        <Route path="/new-blog" element={<NewBlogPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/blog/:blogId" element={<EditBlogPage />} />
        <Route path="/blog/:blogId" element={<BlogPage />} />
        <Route
          path="*"
          element={
            <p className="flex h-screen w-screen justify-center items-center">
              404 not found!
            </p>
          }
        />
      </Routes>
      <Footer />
      <LoginAndSignup />
    </>
  );
}

export default App;
