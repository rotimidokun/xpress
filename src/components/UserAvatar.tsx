import { getCurrentUser } from "@/services/authService";
import { useEffect, useState } from "react";

const UserAvatar = () => {
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  useEffect(() => {
    // Get the current user from auth service
    const user = getCurrentUser();

    // If user exists and has a logo, use it as avatar
    if (user && user.logo) {
      setAvatarSrc(user.logo);
    }
  }, []);

  return (
    <div className="relative">
      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
        <img
          src={avatarSrc}
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
    </div>
  );
};

export default UserAvatar;
