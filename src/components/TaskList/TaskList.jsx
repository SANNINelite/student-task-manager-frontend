// TaskList.jsx
import TaskCard from "../TaskCard/TaskCard";
import styles from "./TaskList.module.css";

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#64748b" }}>
        No tasks yet. Click <strong>+</strong> to add your first task 🚀
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
