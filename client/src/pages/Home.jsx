import React, { useEffect, useRef, useState } from "react";
import { useUser } from "../context/userContext";
import { toast, ToastContainer } from "react-toastify";
import { instance } from "../utils/axiosIstance";
import BlogCard from "../components/BlogCard";

const Home = () => {
    const title = useRef();
    const description = useRef();
    const [blogLoading, setBlogsLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    const { user, setBlogs, blogs } = useUser();

    const addPost = async (e) => {
        e.preventDefault();
        setBlogsLoading(true);
        const blog = {
            title: title.current.value,
            description: description.current.value,
            author: user._id,
        };

        try {
            const { data } = await instance.post("/blog", blog);
            setBlogs([{ ...data.blog, author: { name: user.name } }, ...blogs]);
            toast.success("Blog added successfully", { autoClose: 2500 });
        } catch (e) {
            console.log(e);
        } finally {
            setBlogsLoading(false);
        }

        title.current.value = "";
        description.current.value = "";
    };

    useEffect(() => {
        const getAllBlogs = async () => {
            const { data } = await instance.get("blog");
            setBlogs([...data.blogs]);
        };
        getAllBlogs();
    }, []);

    const addComment = async (e, postID) => {
        e.preventDefault();
        setCommentLoading(true);
        const input = e.target.comment.value;

        try {
            const { data } = await instance.post("/commentblog", {
                text: input,
                post: postID,
                author: user._id,
            });
            const newData = blogs.map((item) =>
                item._id === postID ? data.blog : item
            );
            setBlogs([...newData]);
            toast.success("Comment added", { autoClose: 2500 });

            e.target.comment.value = "";
        } catch (error) {
            console.log(error);
        } finally {
            setCommentLoading(false);
        }
    };

    const likePost = async (blog) => {
        const postLiked = blog.likes.find((like) => like._id === user._id);
        if (!postLiked) {
            setLikeLoading(true);
            try {
                const { data } = await instance.post(`/likeblog/${blog._id}`, {
                    author: user._id,
                });
                const newData = blogs.map((item) =>
                    item._id === blog._id ? data.blog : item
                );
                setBlogs([...newData]);
            } catch (error) {
                console.log(error);
            } finally {
                setLikeLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 py-10 px-4">
            <ToastContainer />
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    Create a New Blog Post
                </h1>
                <form onSubmit={addPost} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        required
                        min={1}
                        ref={title}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <textarea
                        placeholder="Description"
                        ref={description}
                        required
                        minLength={3}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                    <button
                        type="submit"
                        disabled={blogLoading}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
                    >
                        Add Post
                    </button>
                </form>
            </div>
            <div className="max-w-4xl mx-auto mt-10">
                <h2 className="text-3xl font-semibold mb-4 text-gray-800">All Blogs</h2>
                <div className="space-y-6">
                    {blogs?.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                            likeLoading={likeLoading}
                            commentLoading={commentLoading}
                            commmentBlogFnc={addComment}
                            likeBlogFnc={() => likePost(blog)}
                        />
                        // <div
                        //     key={blog._id}
                        //     className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        // >
                        //     <div className="flex justify-between items-center">
                        //         <div>
                        //             <h3 className="text-2xl font-bold text-gray-800">
                        //                 {blog.title}
                        //             </h3>
                        //             <p className="text-sm text-gray-500">By {blog.author.name}</p>
                        //         </div>
                        //         <button
                        //             disabled={likeLoading}
                        //             onClick={() => likePost(blog)}
                        //             className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                        //         >
                        //             <img
                        //                 src={
                        //                     blog.likes.some((like) => like._id === user._id)
                        //                         ? "./heart-fill.svg"
                        //                         : "./heart.svg"
                        //                 }
                        //                 alt="like"
                        //                 className="w-6 h-6"
                        //             />
                        //             <span className="text-lg font-medium">{blog.likes.length}</span>
                        //         </button>
                        //     </div>
                        //     <p className="mt-4 text-gray-700">{blog.description}</p>
                        //     <form
                        //         onSubmit={(e) => addComment(e, blog._id)}
                        //         className="flex items-center mt-6 space-x-2"
                        //     >
                        //         <input
                        //             name="comment"
                        //             required
                        //             placeholder="Add a comment..."
                        //             className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        //         />
                        //         <button
                        //             type="submit"
                        //             disabled={commentLoading}
                        //             className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                        //         >
                        //             Add
                        //         </button>
                        //     </form>
                        //     <div className="mt-4">
                        //         {blog.comments?.length > 0 && (
                        //             <h4 className="font-medium text-gray-800">Comments:</h4>
                        //         )}
                        //         {blog.comments?.map((comment) => (
                        //             <div
                        //                 key={comment._id}
                        //                 className="mt-2 px-4 py-2 bg-gray-100 rounded-md"
                        //             >
                        //                 <p>
                        //                     {comment.text}{" "}
                        //                     <span className="text-sm text-gray-500">
                        //                         - {comment.author.name}
                        //                     </span>
                        //                 </p>
                        //             </div>
                        //         ))}
                        //     </div>
                        // </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
