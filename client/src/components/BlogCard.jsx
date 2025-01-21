import React, { useEffect } from 'react'
import { useUser } from '../context/userContext'

const BlogCard = ({ blog, likeBlogFnc, commmentBlogFnc, likeLoading, commentLoading }) => {
    const { user } = useUser();

    return (
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg max-w-screen-md mx-auto">
            {/* Posted By Section */}
            <div className="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1">
                <span className="text-sm text-slate-600 font-medium">
                    Posted by: {blog.author.name}
                </span>
            </div>

            {/* Blog Content */}
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h5 className="mb-2 text-slate-800 text-xl font-semibold">
                        {blog.title}
                    </h5>
                    {/* Like Button */}
                    <button
                        className="flex items-center space-x-2 text-slate-600 hover:text-red-500 transition-colors"
                        onClick={() => likeBlogFnc(blog)}
                        disabled={likeLoading}
                    >
                        <img
                            src={blog.likes.some(like => like._id === user._id) ? "./heart-fill.svg" : "./heart.svg"}
                            alt="like"
                            className="w-5 h-5"
                        />
                        <span className="text-sm font-medium">{blog.likes.length} Likes</span>
                    </button>
                </div>
                <p className="text-slate-600 leading-normal font-md">
                    {blog.description}
                </p>
            </div>

            {/* Like & Comment Section */}
            <div className="p-4 border-t border-slate-200">


                {/* Comment Form */}
                <form
                    onSubmit={(e) => commmentBlogFnc(e, blog._id)}
                    className="flex items-center mt-4 space-x-2"
                >
                    <input
                        name="comment"
                        required
                        placeholder="Add a comment..."
                        className="flex-1 px-4 py-2 border border-slate-200 rounded-md text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                    <button
                        type="submit"
                        disabled={commentLoading}
                        className="bg-[#2563EB] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition disabled:opacity-50"
                    >
                        Comment
                    </button>
                </form>

                {/* Comments Section */}
                <div className="mt-4">
                    {blog.comments?.length > 0 && (
                        <h4 className="text-[slate-800] text-sm font-medium">Comments:</h4>
                    )}
                    {blog.comments?.map((comment) => (
                        <div
                            key={comment._id}
                            className="mt-2 px-4 py-2 bg-slate-100 rounded-md"
                        >
                            <p className="text-slate-600 text-base">
                                {comment.text}
                                <span className="text-xs text-slate-500"> - {comment.author.name}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>


        // <div
        //     key={blog._id}
        //     className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        // >
        //     <div className="flex justify-between items-center">
        //         <div>
        //             <h3 className="text-2xl font-bold text-gray-800">
        //                 {blog.title}
        //             </h3>
        //             <p className="text-sm text-gray-500">Posted by {blog.author.name}</p>
        //         </div>
        //         <button
        //             disabled={likeLoading}
        //             onClick={likeBlogFnc}
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
        //         onSubmit={(e) => commmentBlogFnc(e, blog._id)}
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
    )
}

export default BlogCard