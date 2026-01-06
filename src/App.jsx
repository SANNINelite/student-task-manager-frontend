import { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import AddTaskForm from "./components/AddTaskForm/AddTaskForm";
import TaskList from "./components/TaskList/TaskList";
import FilterBar from "./components/FilterBar/FilterBar";
import SearchBar from "./components/SearchBar/SearchBar";
import Modal from "./components/Modal/Modal";
import Stats from "./components/Stats/Stats";

import AppLayout from "./layouts/AppLayout";
import api from "./api/axios";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  /* ----------------------------- TASK DERIVATIONS ----------------------------- */

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.addEventListener("resize", checkMobile);
  }, []);

  const getFilteredTasks = () => {
    let updatedTasks = [...tasks];

    // SEARCH
    if (searchQuery.trim()) {
      updatedTasks = updatedTasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // FILTER
    if (filterStatus === "completed") {
      updatedTasks = updatedTasks.filter((task) => task.completed);
    } else if (filterStatus === "pending") {
      updatedTasks = updatedTasks.filter((task) => !task.completed);
    }

    // SORT
    if (sortBy === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      updatedTasks.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
    }

    if (sortBy === "dueDate") {
      updatedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    return updatedTasks;
  };

  /* ----------------------------- API HANDLERS ----------------------------- */

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskAdded = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  /* ----------------------------- RENDER ----------------------------- */

  return (
    <>
      <AppLayout
        header={<Header />}
        sidebar={
          <>
            <Header /> {/* Student Task Manager */}
            <Stats
              total={totalTasks}
              pending={pendingTasks}
              done={completedTasks}
            />
            <AddTaskForm onTaskAdded={handleTaskAdded} />
          </>
        }
        topbar={
          <>
            {/* On mobile: hamburger only */}
            {isMobile ? (
              <button
                onClick={() => setShowMobileSidebar(true)}
                style={{ padding: "8px", border: "none", background: "rgba(255, 252, 79, 0.2",color:"Black" }}
              >
                ☰      Search & Filter
              </button>
            ) : (
              <>
                <SearchBar
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
                <FilterBar
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                />
              </>
            )}
          </>
        }
      >
        <TaskList
          tasks={getFilteredTasks()}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </AppLayout>

      {/* MOBILE FAB */}
      {isMobile && (
        <button className="fab" onClick={() => setShowModal(true)}>
          +
        </button>
      )}

      {/* MOBILE SLIDE-OUT SIDEBAR */}
      {isMobile && showMobileSidebar && (
        <>
          <div
            className="mobile-sidebar-overlay"
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 998,
            }}
            onClick={() => setShowMobileSidebar(false)}
          />
          <div
            className="mobile-sidebar"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              width: "320px",
              height: "100vh",
              background: "#eef2ff",
              zIndex: 999,
              padding: "20px",
              boxShadow: "-4px 0 20px rgba(0,0,0,0.1)",
            }}
          >
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <FilterBar
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <button
              onClick={() => setShowMobileSidebar(false)}
              style={{ marginTop: "20px", padding: "8px 16px" }}
            >
              Close
            </button>
          </div>
        </>
      )}

      {/* ADD TASK MODAL */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddTaskForm
            onTaskAdded={(task) => {
              handleTaskAdded(task);
              setShowModal(false);
            }}
          />
        </Modal>
      )}
    </>
  );
}

export default App;
