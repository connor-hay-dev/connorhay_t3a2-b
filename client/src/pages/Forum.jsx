import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from '../components/sidebar'; // Adjust the import path as necessary
import "react-toastify/dist/ReactToastify.css";
import Heading from '../components/heading';
import '../forum.css';

const ForumPage = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: ""});


  useEffect(() => {
    // Redirect to login if no token is found
    if (!cookies.token) {
      navigate("/login");
    } else {
      fetchPosts();
    }
  }, [cookies.token, navigate]);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/forum", {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        },
        withCredentials: true
      });
      setPosts(data);
    } catch (error) {
      toast.error("Failed to fetch posts.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/forum", newPost, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        },
        withCredentials: true
      });
      toast.success("Post created successfully!", {
        position: "top-center",
        autoClose: 5000,
      });
      fetchPosts(); // Refresh posts after adding
      setNewPost({ title: "", content: "", author: ""}); // Reset form
    } catch (error) {
      toast.error("Failed to create post.", {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
  };

  const deletePost = async (postId) => {
    try {
        await axios.delete(`http://localhost:4000/forum/${postId}`, {
            headers: {
                Authorization: `Bearer ${cookies.token}`,
            },
            withCredentials: true,
        });
        toast.success('Post deleted successfully!', {
            position: 'top-center',
            autoClose: 5000,
        });
        fetchPosts(); // Refresh posts after deletion
    } catch (error) {
        console.log(error.message);
        toast.error('Failed to delete post.', {
            position: 'bottom-left',
            autoClose: 5000,
        });
    }
};

  


  return (
    <>
      <Sidebar />
      <Heading text="Notice Board" />
      <div className="forum-page">
        <form onSubmit={handleSubmit} className="submit-post-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newPost.title}
            onChange={handleInputChange}
            required
            className="post-title-input"
          />
          <textarea
            name="content"
            placeholder="Content"
            value={newPost.content}
            onChange={handleInputChange}
            required
            className="post-content-textarea"
          />
          <button type="submit" className="submit-post-button">Submit Post</button>
        </form>
        <div className="posts">
          {posts.map((post) => (
            <div key={post._id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Author: {post.author}</p>
              <button 
                  onClick={() => deletePost(post._id)}
                  className="delete-goal-button"
                >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default ForumPage;
