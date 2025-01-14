import { useState, useEffect } from "react";

const UserProfile = ({ userEmail }) => {
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    avatar: "",
    posts: [],
    bookmarks: [],
  });

  useEffect(() => {
    const userProfiles = JSON.parse(
      localStorage.getItem("userProfiles") || "{}"
    );
    if (userProfiles[userEmail]) {
      setProfile(userProfiles[userEmail]);
    }
  }, [userEmail]);

  const handleUpdateProfile = (updates) => {
    const userProfiles = JSON.parse(
      localStorage.getItem("userProfiles") || "{}"
    );
    const updatedProfile = { ...profile, ...updates };
    userProfiles[userEmail] = updatedProfile;
    localStorage.setItem("userProfiles", JSON.stringify(userProfiles));
    setProfile(updatedProfile);
  };

  return (
    <div className="glass-effect p-6 rounded-xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
          {profile.name?.[0] || userEmail[0].toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold">{profile.name || userEmail}</h2>
          <p className="text-gray-500">{profile.bio || "No bio yet"}</p>
        </div>
      </div>
      {/* Add profile edit form and stats here */}
    </div>
  );
};

export default UserProfile;
