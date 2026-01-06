import styles from "./Stats.module.css";

const Stats = ({ total, pending, done }) => {
  return (
    <div className={styles.stats}>
      <div className={styles.card}>
        <h3>{total}</h3>
        <span>Total</span>
      </div>

      <div className={styles.card}>
        <h3>{pending}</h3>
        <span>Pending</span>
      </div>

      <div className={styles.card}>
        <h3>{done}</h3>
        <span>Done</span>
      </div>
    </div>
  );
};

export default Stats;
    