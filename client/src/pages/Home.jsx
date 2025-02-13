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
    const deleteBlog = async (blogID) => {
        const newData = blogs.filter((item) => item._id !== blogID);
        setBlogs([...newData]);
        try {
            await instance.delete(`/blog/${blogID}`);
            toast.success("Blog deleted successfully", { autoClose: 2500 });
        } catch (error) {
            console.log(error);
        }
    }

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
                            deleteBlogFnc={() => deleteBlog(blog._id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
