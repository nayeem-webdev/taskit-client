import HomeNoUser from "../components/HomeNoUser";
import { LuGripVertical } from "react-icons/lu";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const Home = () => {
  const user = {
    uid: "YjA9GvEwXCc12345678",
    email: "user@example.com",
    emailVerified: true,
    displayName: "John Doe",
    photoURL: "https://i.ibb.co.com/c64xvsG/istockphoto-1329936184-612x612.jpg",
    phoneNumber: "+1234567890",
    providerData: [
      {
        providerId: "google.com",
        uid: "123456789012345678901",
        displayName: "John Doe",
        email: "user@example.com",
        photoURL:
          "https://i.ibb.co.com/c64xvsG/istockphoto-1329936184-612x612.jpg",
      },
    ],
  };
  const tasks = [
    {
      title: "Buy groceries",
      description: "Get milk, eggs, and bread from the store",
      timestamp: "2025-02-21T10:30:00Z",
      dueDate: "2025-02-22",
      category: "To-Do",
    },
    {
      title: "Finish project report",
      description: "Complete the final draft and submit by Friday",
      timestamp: "2025-02-20T15:45:00Z",
      dueDate: "2025-02-23",
      category: "In Progress",
    },
    {
      title: "Book doctor appointment",
      description: "Schedule an appointment with Dr. Smith for next week",
      timestamp: "2025-02-19T09:15:00Z",
      dueDate: "2025-02-25",
      category: "To-Do",
    },
    {
      title: "Plan weekend trip",
      description: "Research destinations and book accommodation",
      timestamp: "2025-02-18T18:00:00Z",
      dueDate: "2025-02-24",
      category: "In Progress",
    },
    {
      title: "Pay electricity bill",
      description: "Due by the 25th, pay online",
      timestamp: "2025-02-17T12:30:00Z",
      dueDate: "2025-02-25",
      category: "InProgress",
    },
    {
      title: "Car service",
      description: "Oil change and tire rotation",
      timestamp: "2025-02-16T14:00:00Z",
      dueDate: "2025-02-26",
      category: "To-Do",
    },
    {
      title: "Team meeting",
      description: "Discuss Q1 targets and performance",
      timestamp: "2025-02-15T11:00:00Z",
      dueDate: "2025-02-21",
      category: "Done",
    },
    {
      title: "Team Collect",
      description: "Discuss Q1 targets and performance",
      timestamp: "2025-02-15T11:00:00Z",
      dueDate: "2025-02-21",
      category: "To-Do",
    },
    {
      title: "Team Collect",
      description: "Discuss Q1 targets and performance",
      timestamp: "2025-02-15T11:00:00Z",
      dueDate: "2025-02-21",
      category: "To-Do",
    },
    {
      title: "Team Collect",
      description: "Discuss Q1 targets and performance",
      timestamp: "2025-02-15T11:00:00Z",
      dueDate: "2025-02-21",
      category: "To-Do",
    },
    {
      title: "Dame meeting",
      description: "Discuss Q1 targets and performance",
      timestamp: "2025-02-15T11:00:00Z",
      dueDate: "2025-02-21",
      category: "Done",
    },
    {
      title: "Workout session",
      description: "Gym session at 6 PM",
      timestamp: "2025-02-14T18:00:00Z",
      dueDate: "2025-02-22",
      category: "In Progress",
    },
    {
      title: "Workout session",
      description: "Gym session at 6 PM",
      timestamp: "2025-02-14T18:00:00Z",
      dueDate: "2025-02-22",
      category: "In Progress",
    },
    {
      title: "Workout session",
      description: "Gym session at 6 PM",
      timestamp: "2025-02-14T18:00:00Z",
      dueDate: "2025-02-22",
      category: "In Progress",
    },
    {
      title: "Workout session",
      description: "Gym session at 6 PM",
      timestamp: "2025-02-14T18:00:00Z",
      dueDate: "2025-02-22",
      category: "In Progress",
    },
    {
      title: "Read new book",
      description: "Start reading 'Atomic Habits'",
      timestamp: "2025-02-13T20:45:00Z",
      dueDate: "2025-03-01",
      category: "To-Do",
    },
    {
      title: "Update resume",
      description: "Add recent projects and skills",
      timestamp: "2025-02-12T22:10:00Z",
      dueDate: "2025-02-28",
      category: "In Progress",
    },
    {
      title: "Update resume",
      description: "Add recent projects and skills",
      timestamp: "2025-02-12T22:10:00Z",
      dueDate: "2025-02-28",
      category: "In Progress",
    },
    {
      title: "Update resume",
      description: "Add recent projects and skills",
      timestamp: "2025-02-12T22:10:00Z",
      dueDate: "2025-02-28",
      category: "In Progress",
    },
    {
      title: "Update resume",
      description: "Add recent projects and skills",
      timestamp: "2025-02-12T22:10:00Z",
      dueDate: "2025-02-28",
      category: "In Progress",
    },
    {
      title: "Update resume",
      description: "Add recent projects and skills",
      timestamp: "2025-02-12T22:10:00Z",
      dueDate: "2025-02-28",
      category: "In Progress",
    },
  ];

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
      <div className="hidden">
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
          <button className="w-full px-4 py-2 bg-white/40 text-black dark:bg-black/60 dark:text-white hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-sm shadow-md rounded-lg">
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
    </>
  );
};

export default Home;
