import HomeNoUser from "../components/HomeNoUser";
import { LuGripVertical } from "react-icons/lu";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import AddTaskModal from "../components/AddTaskModal";
import { useContext, useState } from "react";
import AllContext from "../contexts/AllContext";

const Home = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const onClose = () => {
    setIsAddTaskOpen(false);
  };
  const user = useContext(AllContext);
  const tasks = [];

  const today = new Date().toISOString().split("T")[0];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split("T")[0];

  const todoToday = tasks.filter((task) => task.dueDate === today);
  const todoTomorrow = tasks.filter((task) => task.dueDate === tomorrowDate);
  const todoComplete = tasks.filter((task) => task.category === "Done");
  const todoPending = tasks.filter((task) => task.category !== "Done");

  return (
    <>
      <div className="">
        <HomeNoUser />
      </div>
      <></>
      <></>
      <></>
      <div className="bg-white/10 dark:bg-black/20 border border-white/20 dark:border-black/5 backdrop-blur-sm shadow-lg rounded-lg grid grid-cols-15 p-4 md:p-6 gap-5 lg:h-[calc(100vh-182px)]">
        {/* Part- 1 */}
        <div className="max-w-lg col-span-3 bg-white/20 dark:bg-black/5 border border-white/30 dark:border-black/10 backdrop-blur-sm shadow-lg rounded-lg p-2 md:p-4 space-y-4 md:space-y-6">
          {/* User Details */}
          <div className="border-b-2 border-black/20 pb-4 md:pb-6 flex gap-2">
            <div className="overflow-hidden rounded-full py-2">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="border-l-2 border-pink-300 pl-2 flex flex-col justify-center">
              <h2 className="font-bold text-xl">{user.displayName}</h2>
              <p>{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddTaskOpen(true)}
            className="w-full px-4 py-2 bg-white/40 text-black dark:bg-black/60 dark:text-white hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-sm shadow-md rounded-lg"
          >
            Add Task
          </button>
          <div></div>
        </div>
        {/* Part- 2 */}
        <div className="col-span-4 grid grid-cols-1 gap-4 md:gap-5 h-full overflow-hidden">
          {/* Today's Tasks */}
          <div className="bg-white/20 dark:bg-black/5 border border-white/30 dark:border-black/10 backdrop-blur-sm shadow-lg rounded-lg p-2 md:p-4 h-full overflow-hidden">
            <h1 className="font-bold text-lg leading-2">Today&apos;s Tasks</h1>
            <div className="mt-4 space-y-2 h-full overflow-auto scrollbar-hide pb-4 md:pb-6">
              {todoToday.map((t) => (
                <div
                  key={t.title}
                  className="bg-white/40 shadow-md rounded-lg p-2 flex justify-between items-center space-x-2"
                >
                  {t.category === "Done" ? (
                    <IoCheckmarkDoneCircle className="text-green-500" />
                  ) : (
                    <IoCheckmarkDoneCircleOutline className="text-gray-500" />
                  )}

                  <h2 className="font-semibold text-black text-lg w-full">
                    {t.title.length > 20
                      ? t.title.slice(0, 20) + "..."
                      : t.title}
                  </h2>

                  {/* Grabbing vertical dots icon */}
                  <LuGripVertical className="text-gray-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Tomorrow's Tasks */}
          <div className="bg-white/20 dark:bg-black/5 border border-white/30 dark:border-black/10 backdrop-blur-sm shadow-lg rounded-lg p-2 md:p-4 h-full overflow-hidden ">
            <h1 className="font-bold text-lg leading-2">
              Tomorrow&apos;s Tasks
            </h1>
            <div className="mt-4 space-y-2 h-full overflow-auto scrollbar-hide pb-4 md:pb-6">
              {todoTomorrow.map((t) => (
                <div
                  key={t.title}
                  className="bg-white/40 shadow-md rounded-lg p-2 flex justify-between items-center space-x-2 "
                >
                  {t.category === "Done" ? (
                    <IoCheckmarkDoneCircle className="text-green-500" />
                  ) : (
                    <IoCheckmarkDoneCircleOutline className="text-gray-500" />
                  )}

                  <h2 className="font-semibold text-black text-lg w-full">
                    {t.title.length > 20
                      ? t.title.slice(0, 20) + "..."
                      : t.title}
                  </h2>

                  {/* Grabbing vertical dots icon */}
                  <LuGripVertical className="text-gray-600" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Part- 3 */}
        <div className="col-span-4 grid grid-cols-1 gap-4 md:gap-5 h-full overflow-hidden">
          {/* Today's Tasks */}
          <div className="bg-white/20 dark:bg-black/5 border border-white/30 dark:border-black/10 backdrop-blur-sm shadow-lg rounded-lg p-2 md:p-4 h-full overflow-hidden">
            <h1 className="font-bold text-lg leading-2">Today&apos;s Tasks</h1>
            <div className="mt-4 space-y-2 h-full overflow-auto scrollbar-hide pb-4 md:pb-6">
              {todoPending.map((t) => (
                <div
                  key={t.title}
                  className="bg-white/40 shadow-md rounded-lg p-2 flex justify-between items-center space-x-2"
                >
                  {t.category === "Done" ? (
                    <IoCheckmarkDoneCircle className="text-green-500" />
                  ) : (
                    <IoCheckmarkDoneCircleOutline className="text-gray-500" />
                  )}

                  <h2 className="font-semibold text-black text-lg w-full">
                    {t.title.length > 20
                      ? t.title.slice(0, 20) + "..."
                      : t.title}
                  </h2>

                  {/* Grabbing vertical dots icon */}
                  <LuGripVertical className="text-gray-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Part- 4 */}
        <div className="col-span-4 grid grid-cols-1 gap-4 md:gap-5 h-full overflow-hidden">
          {/* Today's Tasks */}
          <div className="bg-white/20 dark:bg-black/5 border border-white/30 dark:border-black/10 backdrop-blur-sm shadow-lg rounded-lg p-2 md:p-4 h-full overflow-hidden">
            <h1 className="font-bold text-lg leading-2">Today&apos;s Tasks</h1>
            <div className="mt-4 space-y-2 h-full overflow-auto scrollbar-hide pb-4 md:pb-6">
              {todoComplete.map((t) => (
                <div
                  key={t.title}
                  className="bg-white/40 shadow-md rounded-lg p-2 flex justify-between items-center space-x-2"
                >
                  {t.category === "Done" ? (
                    <IoCheckmarkDoneCircle className="text-green-500" />
                  ) : (
                    <IoCheckmarkDoneCircleOutline className="text-gray-500" />
                  )}

                  <h2 className="font-semibold text-black text-lg w-full">
                    {t.title.length > 20
                      ? t.title.slice(0, 20) + "..."
                      : t.title}
                  </h2>

                  {/* Grabbing vertical dots icon */}
                  <LuGripVertical className="text-gray-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddTaskModal isOpen={isAddTaskOpen} onClose={onClose} />
    </>
  );
};

export default Home;
