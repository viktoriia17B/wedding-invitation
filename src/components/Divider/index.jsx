import styles from './divider.module.scss';

// Тонкий золотий розділювач: лінія — ромб — лінія
const Divider = () => (
    <svg className={styles.divider} viewBox="0 0 160 12" width="160" height="12" aria-hidden="true">
        <line x1="0" y1="6" x2="68" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <rect x="76.5" y="2.5" width="7" height="7" fill="none" stroke="currentColor" strokeWidth="1"
            transform="rotate(45 80 6)" />
        <line x1="92" y1="6" x2="160" y2="6" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
);
export default Divider;
