import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import AllContext from "../contexts/AllContext";
import { API } from "../api/API";
import { toast } from "react-toastify";
// refetch
const AddTaskModal = ({ isOpen, onClose }) => {
  const { user } = useContext(AllContext);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
    category: "Todo",
    timestamp: new Date().toISOString(),
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Task Submission
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!user?.uid) {
      toast.error("User not found. Please log in.");
      return;
    }

    const task = { ...taskData, uid: user.uid };

    try {
      await API.post("/task", task);
      toast.success("Task added successfully!");
      setTaskData({
        title: "",
        description: "",
        dueDate: "",
        category: "Todo",
        timestamp: new Date().toISOString(),
      });
      // refetch();
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error adding task:", error.message);
      toast.error("Failed to add task. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Modal content */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="w-full max-w-lg mx-auto bg-white/50 border border-white/30 backdrop-blur-sm shadow-lg rounded-lg p-4 md:p-6 space-y-4 md:space-y-6"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Header */}
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Add Task</p>
            <button
              className="text-black"
              onClick={onClose}
              aria-label="Close Modal"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Task Form */}
          <form onSubmit={handleAddTask}>
            {/* Title Input */}
            <div className="mb-4">
              <label
                className="block text-xs md:text-sm font-medium text-black/60"
                htmlFor="title"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={taskData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter title (max 50 characters)"
                maxLength="50"
                required
              />
            </div>

            {/* Description Input */}
            <div className="mb-4">
              <label
                className="block text-xs md:text-sm font-medium text-black/60"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={taskData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter description (max 200 characters)"
                maxLength="200"
              ></textarea>
            </div>

            {/* Due Date Input */}
            <div className="mb-4">
              <label
                className="block text-xs md:text-sm font-medium text-black/60"
                htmlFor="dueDate"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-white/40 text-black dark:bg-black/60 dark:text-white hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-sm shadow-md rounded-lg"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

AddTaskModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // refetch: PropTypes.func,
};

export default AddTaskModal;
