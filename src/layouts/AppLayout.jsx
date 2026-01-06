import styles from './AppLayout.module.css';

const AppLayout = ({ sidebar, topbar, children, header }) => {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        {sidebar}
      </aside>

      <section className={styles.content}>
        {/* MOBILE HEADER */}
        <div className={styles.mobileHeader}>
          {header}
        </div>
        
        <div className={styles.topbar}>{topbar}</div>
        <div className={styles.main}>{children}</div>
      </section>
    </div>
  );
};

export default AppLayout;
