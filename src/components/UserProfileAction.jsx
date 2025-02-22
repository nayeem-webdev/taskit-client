import { useContext } from "react";
import AllContext from "../contexts/AllContext";

const UserProfileAction = ({ setIsAddTaskOpen }) => {
  const { user, logoutUser } = useContext(AllContext);
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-white/20 dark:bg-black/5 border border-white/30 dark:border-black/10 backdrop-blur-sm shadow-lg rounded-lg p-2 md:p-4 space-y-4 md:space-y-6">
      {/* User Details */}
      <div className="border-b-2 border-black/20 pb-4 md:pb-6 flex flex-col items-center gap-2">
        <div className="overflow-hidden rounded-full py-2">
          <img
            src={
              user?.photoURL ||
              "https://i.ibb.co.com/nRm6fz9/Png-Item-5067022.png"
            }
            alt={user?.displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="font-bold text-md">{user.displayName}</h2>
          <p className="text-[12px]">{user.email}</p>
        </div>
      </div>
      <div className="space-y-2">
        <button
          onClick={() => setIsAddTaskOpen(true)}
          className="w-full px-4 py-2 bg-white/40 text-black dark:bg-black/60 dark:text-white hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-sm shadow-md rounded-lg"
        >
          Add Task
        </button>
        <button
          onClick={logoutUser}
          className="w-full px-4 py-2 bg-white/40 text-black dark:bg-black/60 dark:text-white hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-sm shadow-md rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfileAction;
