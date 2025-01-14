import { useState, useEffect } from "react";

const SocialFeatures = ({ postId, currentUser }) => {
  const [socialState, setSocialState] = useState({
    likes: [],
    bookmarks: [],
  });

  // Load social data when component mounts or postId changes
  useEffect(() => {
    loadSocialData();
  }, [postId]);

  const loadSocialData = () => {
    try {
      const allSocialData = JSON.parse(
        localStorage.getItem("socialData") || "{}"
      );
      const postSocialData = allSocialData[postId] || {
        likes: [],
        bookmarks: [],
      };
      setSocialState(postSocialData);
    } catch (error) {
      console.error("Error loading social data:", error);
      setSocialState({ likes: [], bookmarks: [] });
    }
  };

  const handleLike = () => {
    if (!currentUser) return;

    try {
      // Get current social data
      const allSocialData = JSON.parse(
        localStorage.getItem("socialData") || "{}"
      );

      // Update likes for this post
      const currentLikes = allSocialData[postId]?.likes || [];
      const newLikes = currentLikes.includes(currentUser)
        ? currentLikes.filter((user) => user !== currentUser)
        : [...currentLikes, currentUser];

      // Update storage
      allSocialData[postId] = {
        ...allSocialData[postId],
        likes: newLikes,
      };
      localStorage.setItem("socialData", JSON.stringify(allSocialData));

      // Update state
      setSocialState((prev) => ({
        ...prev,
        likes: newLikes,
      }));
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleLike}
        disabled={!currentUser}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
          socialState.likes.includes(currentUser)
            ? "text-pink-500 bg-pink-50 hover:bg-pink-100"
            : "text-gray-500 hover:bg-gray-50"
        }`}
      >
        <svg
          className={`w-5 h-5 transition-all ${
            socialState.likes.includes(currentUser) ? "scale-110" : "scale-100"
          }`}
          fill={
            socialState.likes.includes(currentUser) ? "currentColor" : "none"
          }
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="font-medium">{socialState.likes.length}</span>
      </button>
    </div>
  );
};

export default SocialFeatures;
