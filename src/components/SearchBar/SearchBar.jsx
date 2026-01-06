import styles from './SearchBar.module.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      className={styles.search}
      type="text"
      placeholder="Search tasks..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
