
const UserAvatar = () => {
  return (
    <div className="relative">
      <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200 border border-gray-300">
        <img 
          src="/lovable-uploads/f538a096-e71a-4500-bc14-b790e8830aa1.png"
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500"></div>
    </div>
  );
};

export default UserAvatar;
