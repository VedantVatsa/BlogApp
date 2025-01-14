import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SocialFeatures from "./SocialFeatures";
import RichTextEditor from "./RichTextEditor";
import DOMPurify from "dompurify";

export const getBlogImage = (content) => {
  const div = document.createElement("div");
  div.innerHTML = content;
  const img = div.querySelector("img");
  return img ? img.src : null;
};

const Comment = ({ comment, onReply, isAuthenticated, currentUser }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleSubmitReply = (e) => {
    e.preventDefault();
    if (replyText.trim()) {
      onReply(comment.id, {
        id: Date.now(),
        author: currentUser,
        text: replyText,
        replies: [],
      });
      setReplyText("");
      setShowReplyForm(false);
    }
  };

  return (
    <div className="border-l-2 border-primary-100 pl-4 mb-4 animate-fade-in">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold">
            {comment.author[0].toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-gray-900">{comment.author}</p>
            <p className="text-sm text-gray-500">
              {new Date(comment.id).toLocaleDateString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700 ml-10">{comment.text}</p>

        {isAuthenticated && (
          <div className="mt-3 ml-10">
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-primary-500 text-sm hover:text-primary-600 font-medium flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
              </svg>
              Reply
            </button>

            {showReplyForm && (
              <form onSubmit={handleSubmitReply} className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                >
                  Send
                </button>
              </form>
            )}
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-4 mt-2">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                onReply={onReply}
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BlogPost = ({
  index,
  id,
  title,
  content,
  author,
  comments = [], // Add default empty array
  isAuthenticated,
  userRole,
  onAddComment,
  onDelete,
  onEdit,
  currentUser,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleContentChange = (content) => {
    setEditedContent(content);
  };

  const handleSaveEdit = () => {
    if (editedContent.trim() === "") return;
    onEdit(index, { content: editedContent });
    setIsEditing(false);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment({
        id: Date.now(),
        text: newComment,
        author: currentUser,
        replies: [],
      });
      setNewComment("");
    }
  };

  const handleReply = (commentId, replyData) => {
    const addReply = (comments) => {
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...(comment.replies || []),
              { ...replyData, id: Date.now() },
            ],
          };
        }
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReply(comment.replies),
          };
        }
        return comment;
      });
    };

    const updatedComments = addReply(comments);
    onAddComment(updatedComments);
  };

  const heroImage = getBlogImage(content);

  // Ensure we have a stable, unique ID for the post
  const postId = id || `post-${index}-${Date.now()}`;

  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        "p",
        "h1",
        "h2",
        "h3",
        "strong",
        "em",
        "u",
        "blockquote",
        "ol",
        "ul",
        "li",
        "img",
      ],
      ALLOWED_ATTR: ["src", "alt", "class", "data-size"],
    });
  };

  return (
    <article className="glass-effect rounded-2xl overflow-hidden animate-fade-in">
      {/* Hero section with improved image handling */}
      <div className="relative w-full">
        <div className="max-w-4xl mx-auto">
          {heroImage ? (
            <div className="relative h-[400px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${heroImage})`,
                  filter: "brightness(0.8)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 drop-shadow-lg">
                  {title}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {author[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-white">{author}</p>
                    <p className="text-gray-200">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-primary-500/10 to-accent-500/10 h-[200px] flex items-center justify-center">
              <div className="text-center p-8">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                  {title}
                </h1>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {author[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{author}</p>
                    <p className="text-gray-500">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content section with max-width container */}
      <div className="max-w-4xl mx-auto p-8">
        {/* Admin Controls - Added before content */}
        {userRole === "admin" && (
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              {isEditing ? "Cancel Edit" : "Edit Post"}
            </button>
            <button
              onClick={() => onDelete(index)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete Post
            </button>
          </div>
        )}

        <div className="blog-post">
          {isEditing ? (
            <div className="space-y-4">
              <RichTextEditor
                value={editedContent}
                onChange={handleContentChange}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedContent(content);
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="blog-content prose prose-lg">
              <div
                className="prose prose-lg prose-img:rounded-xl prose-headings:font-display"
                dangerouslySetInnerHTML={{ __html: sanitizeContent(content) }}
              />
            </div>
          )}

          {/* Author bio section */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold">
                {author[0].toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold">{author}</h3>
                <p className="text-gray-600">Writer & Contributor</p>
              </div>
            </div>
          </div>

          {/* Social features and comments */}
          <div className="mt-8">
            <SocialFeatures postId={postId} currentUser={currentUser} />
            {/* Comments section with enhanced styling */}
            <div className="mt-8 border-t border-gray-100 pt-8">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="text-blue-500 hover:underline"
                >
                  {showComments
                    ? "Hide Comments"
                    : `Show Comments (${comments.length})`}
                </button>
              </div>

              {showComments && (
                <div className="space-y-4">
                  {isAuthenticated ? (
                    <form
                      onSubmit={handleAddComment}
                      className="flex gap-2 mb-4"
                    >
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 p-2 border border-gray-300 rounded"
                      />
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Comment
                      </button>
                    </form>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded text-center mb-4">
                      <p className="text-gray-600">
                        Please{" "}
                        <Link
                          to="/login"
                          className="text-blue-500 hover:underline"
                        >
                          login
                        </Link>{" "}
                        to add a comment
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <Comment
                        key={comment.id}
                        comment={comment}
                        onReply={handleReply}
                        isAuthenticated={isAuthenticated}
                        currentUser={currentUser}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
