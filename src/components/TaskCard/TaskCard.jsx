// TaskCard.jsx
import api from "../../api/axios";
import styles from "./TaskCard.module.css";

const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  const handleToggle = async () => {
    const updatedTask = { ...task, completed: !task.completed };
    await api.put(`/tasks/${task._id}`, updatedTask);
    onToggleComplete(task._id);
  };

  const handleDelete = async () => {
    await api.delete(`/tasks/${task._id}`);
    onDelete(task._id);
  };

  return (
    <div className={`${styles.card} ${task.completed ? styles.done : ""}`}>
      <h3 className={styles.title}>{task.title}</h3>

      <span className={`${styles.badge} ${styles[task.priority]}`}>
        {task.priority}
      </span>

      <p className={styles.description}>{task.description}</p>

      <div className={styles.actions}>
        <button onClick={handleToggle} className={styles.primary}>
          {task.completed ? "Mark Pending" : "Mark Done"}
        </button>

        <button onClick={handleDelete} className={styles.delete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
