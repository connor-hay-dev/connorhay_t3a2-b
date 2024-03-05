// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useCookies } from "react-cookie";
// // import { useNavigate } from "react-router-dom";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const ForumPage = () => {
// //   const [cookies] = useCookies(['token']);
// //   const navigate = useNavigate();
// //   const [posts, setPosts] = useState([]);
// //   const [newPost, setNewPost] = useState({ title: "", content: "" });

// //   useEffect(() => {
// //     if (!cookies.token) {
// //       navigate("/login");
// //     } else {
// //       fetchPosts();
// //     }
// //   }, [cookies.token, navigate]);

// //   const fetchPosts = async () => {
// //     try {
// //       const { data } = await axios.get("http://localhost:4000/api/posts", {
// //         withCredentials: true
// //       });
// //       setPosts(data);
// //     } catch (error) {
// //       console.error("Failed to fetch posts:", error);
// //       toast.error("Failed to fetch posts.");
// //     }
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setNewPost({ ...newPost, [name]: value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post("http://localhost:4000/posts", newPost, {
// //         headers: {
// //           Authorization: `Bearer ${cookies.token}`
// //         },
// //         withCredentials: true
// //       });
// //       toast.success("Post created successfully!");
// //       fetchPosts(); // Refresh posts after adding
// //       setNewPost({ title: "", content: "" }); // Reset form
// //     } catch (error) {
// //       console.error("Failed to create post:", error);
// //       toast.error("Failed to create post.");
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="forum-page">
// //         <h2>Forum</h2>
// //         <form onSubmit={handleSubmit}>
// //           <input
// //             type="text"
// //             name="title"
// //             placeholder="Title"
// //             value={newPost.title}
// //             onChange={handleInputChange}
// //             required
// //           />
// //           <textarea
// //             name="content"
// //             placeholder="Content"
// //             value={newPost.content}
// //             onChange={handleInputChange}
// //             required
// //           />
// //           <button type="submit">Submit Post</button>
// //         </form>
// //         <div className="posts">
// //           {posts.map((post) => (
// //             <div key={post._id} className="post">
// //               <h3>{post.title}</h3>
// //               <p>{post.content}</p>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //       <ToastContainer />
// //     </>
// //   );
// // };

// // export default ForumPage;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useCookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import '../forum.css'

// const ForumPage = () => {
//   const [cookies] = useCookies(['token']);
//   const navigate = useNavigate();
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState({ title: "", content: "" });

//   useEffect(() => {
//     if (!cookies.token) {
//       navigate("/login");
//     } else {
//       fetchPosts();
//     }
//   }, [cookies.token, navigate]);

//   const fetchPosts = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:4000/forum", {
//         withCredentials: true
//       });
//       setPosts(data);
//     } catch (error) {
//       toast.error("Failed to fetch posts.", {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored", // You can customize this as 'dark' or 'light' as well
//       });
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewPost({ ...newPost, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:4000/forum", newPost, {
//         headers: {
//           Authorization: `Bearer ${cookies.token}`
//         },
//         withCredentials: true
//       });
//       toast.success("Post created successfully!", {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//       fetchPosts(); // Refresh posts after adding
//       setNewPost({ title: "", content: "" }); // Reset form
//     } catch (error) {
//       toast.error("Failed to create post.", {
//         position: "bottom-left",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     }
//   };

//   return (
//     <>
//       <div className="forum-page">
//         <h2>Forum</h2>
//         <form onSubmit={handleSubmit} className="submit-post-form">
//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
//             value={newPost.title}
//             onChange={handleInputChange}
//             required
//             className="post-title-input"
//           />
//           <textarea
//             name="content"
//             placeholder="Content"
//             value={newPost.content}
//             onChange={handleInputChange}
//             required
//             className="post-content-textarea"
//           />
//           <button type="submit" className="submit-post-button">Submit Post</button>
//         </form>
//         <div className="posts">
//           {posts.map((post) => (
//             <div key={post._id} className="post">
//               <h3>{post.title}</h3>
//               <p>{post.content}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//       <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//     </>
//   );
// };

// export default ForumPage;

import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../forum.css';

const ForumPage = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

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
      setNewPost({ title: "", content: "" }); // Reset form
    } catch (error) {
      toast.error("Failed to create post.", {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <div className="forum-page">
        <h2>Forum</h2>
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
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default ForumPage;
