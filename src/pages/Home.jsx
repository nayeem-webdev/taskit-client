import HomeNoUser from "../components/HomeNoUser";
import { LuGripVertical } from "react-icons/lu";
import {
  IoCheckmarkDoneCircleOutline,
  IoCheckmarkDoneCircle,
} from "react-icons/io5";
import AddTaskModal from "../components/AddTaskModal";
import { useContext, useState } from "react";
import AllContext from "../contexts/AllContext";
import { API } from "../api/API";
import { useQuery } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import UserProfileAction from "../components/UserProfileAction";
import { toast } from "react-toastify";

const Home = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const onClose = () => setIsAddTaskOpen(false);
  const { user } = useContext(AllContext);

  const {
    isLoading,
    error,
    data: tasks = [],
    refetch,
  } = useQuery({
    queryKey: ["tasks", user?.uid],
    queryFn: async () => {
      if (!user?.uid) throw new Error("User UID not found");
      const res = await API.get(`/tasks/${user.uid}`);
      if (res.data) return res.data;
      throw new Error("Failed to fetch Tasks");
    },
    enabled: !!user?.uid,
  });

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split("T")[0];

  const todoToday = tasks?.filter((task) => task.dueDate === today) || [];
  const todoTomorrow =
    tasks?.filter((task) => task.dueDate === tomorrowDate) || [];
  const todoComplete = tasks?.filter((task) => task.category === "Done") || [];
  const todoPending = tasks?.filter((task) => task.category !== "Done") || [];

  const onDragEnd = (result) => {
    console.log(result);
    const itemId = result.draggableId;
    if (!result.destination) {
      toast.error("Drag Drop Failed Select Destination!");
      return;
    }
    if (result.destination.droppableId === "todoComplete") {
      API.put(`/task/${itemId}`, { category: "Done" })
        .then((response) => {
          console.log("Update successful:", response.data);
          refetch();
        })
        .catch((error) => {
          console.log("Error updating task:", error);
          toast.error("Drag & Update Failed!");
        });
    } else if (result.destination.droppableId === "todoPending") {
      API.put(`/task/${itemId}`, { category: "Todo" })
        .then((response) => {
          console.log("Update successful:", response.data);
          refetch();
        })
        .catch((error) => {
          console.log("Error updating task:", error);
          toast.error("Drag & Update Failed!");
        });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Loading, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <HomeNoUser />
      ) : (
        <div className="bg-white/10 dark:bg-black/20 border border-white/20 dark:border-black/5 backdrop-blur-sm shadow-lg rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4 md:p-6 gap-4 lg:h-[calc(100vh-182px)]">
          {/* Row - 1 */}
          <UserProfileAction setIsAddTaskOpen={setIsAddTaskOpen} />

          {/* Part- 2 */}
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="col-span-1 md:col-span-2 lg:col-span-1 grid grid-cols-1 gap-4 md:gap-5 h-full overflow-hidden">
              {/* Today's Tasks */}
              <div className="bg-white/20 dark:bg-black/5 border border-white/30 dark:border-black/10 backdrop-blur-sm shadow-lg rounded-lg p-2 md:p-4 h-full overflow-hidden">
                <h1 className="font-bold text-lg leading-2">
                  Today&apos;s Tasks
                </h1>
                <Droppable droppableId="todoToday" type="grouped">
                  {(provided) => (
                    <div
                      className="mt-4 space-y-2 h-full overflow-auto scrollbar-hide pb-4 md:pb-6"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {todoToday.map((t, index) => (
                        <Draggable
                          key={t._id}
                          draggableId={t._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white/40 shadow-md rounded-lg p-2 flex justify-between items-center space-x-2 ${
                                snapshot.isDragging
                                  ? "bg-blue-100 shadow-lg"
                                  : ""
                              }`}
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
                              <div {...provided.dragHandleProps}>
                                <LuGripVertical className="text-gray-600" />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

              {/* Tomorrow's Tasks */}
              <div className="bg-white/20 dark:bg-black/5 border border-white/30 dark:border-black/10 backdrop-blur-sm shadow-lg rounded-lg p-2 md:p-4 h-full overflow-hidden">
                <h1 className="font-bold text-lg leading-2">
                  Tomorrow&apos;s Tasks
                </h1>
                <Droppable droppableId="todoTomorrow" type="grouped">
                  {(provided) => (
                    <div
                      className="mt-4 space-y-2 h-full overflow-auto scrollbar-hide pb-4 md:pb-6"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {todoTomorrow.map((t, index) => (
                        <Draggable
                          key={t._id}
                          draggableId={t._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white/40 shadow-md rounded-lg p-2 flex justify-between items-center space-x-2 ${
                                snapshot.isDragging
                                  ? "bg-blue-100 shadow-lg"
                                  : ""
                              }`}
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
                              <div {...provided.dragHandleProps}>
                                <LuGripVertical className="text-gray-600" />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>

            {/* Part- 3 */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 grid grid-cols-1 gap-4 md:gap-5 h-full overflow-hidden">
              {/* Pending Tasks */}
              <div className="bg-white/20 dark:bg-black/5 border border-white/30 dark:border-black/10 backdrop-blur-sm shadow-lg rounded-lg p-2 md:p-4 h-full overflow-hidden">
                <h1 className="font-bold text-lg leading-2">Pending Tasks</h1>
                <Droppable droppableId="todoPending" type="group">
                  {(provided) => (
                    <div
                      className="mt-4 space-y-2 h-full overflow-auto scrollbar-hide pb-4 md:pb-6"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {todoPending.map((t, index) => (
                        <Draggable
                          key={t._id}
                          draggableId={t._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white/40 shadow-md rounded-lg p-2 flex justify-between items-center space-x-2 ${
                                snapshot.isDragging
                                  ? "bg-blue-100 shadow-lg"
                                  : ""
                              }`}
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
                              <div {...provided.dragHandleProps}>
                                <LuGripVertical className="text-gray-600" />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>

            {/* Part- 4 */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 grid grid-cols-1 gap-4 md:gap-5 h-full overflow-hidden">
              {/* Completed Tasks */}
              <div className="bg-white/20 dark:bg-black/5 border border-white/30 dark:border-black/10 backdrop-blur-sm shadow-lg rounded-lg p-2 md:p-4 h-full overflow-hidden">
                <h1 className="font-bold text-lg leading-2">Completed Tasks</h1>
                <Droppable droppableId="todoComplete" type="group">
                  {(provided) => (
                    <div
                      className="mt-4 space-y-2 h-full overflow-auto scrollbar-hide pb-4 md:pb-6"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {todoComplete.map((t, index) => (
                        <Draggable
                          key={t._id}
                          draggableId={t._id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white/40 shadow-md rounded-lg p-2 flex justify-between items-center space-x-2 ${
                                snapshot.isDragging
                                  ? "bg-blue-100 shadow-lg"
                                  : ""
                              }`}
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
                              <div {...provided.dragHandleProps}>
                                <LuGripVertical className="text-gray-600" />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </DragDropContext>
        </div>
      )}
      {/* Modals */}
      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={onClose}
        refetch={refetch}
      />
    </>
  );
};

export default Home;
