import styles from './FilterBar.module.css';

const FilterBar = ({
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy
}) => {
  return (
    <div className={styles.bar}>
      <div className={styles.buttons}>
        <button
          onClick={() => setFilterStatus('all')}
          className={filterStatus === 'all' ? styles.active : ''}
        >
          All
        </button>

        <button
          onClick={() => setFilterStatus('pending')}
          className={filterStatus === 'pending' ? styles.active : ''}
        >
          Pending
        </button>

        <button
          onClick={() => setFilterStatus('completed')}
          className={filterStatus === 'completed' ? styles.active : ''}
        >
          Completed
        </button>
      </div>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">Sort by</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
};

export default FilterBar;
