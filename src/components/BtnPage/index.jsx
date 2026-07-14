import styles from './btnPage.module.scss';

const NoteIcon = ({ muted }) => (
    <svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='currentColor'
        strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true'>
        <path d='M9 18V5l12-2v13' />
        <circle cx='6' cy='18' r='3' />
        <circle cx='18' cy='16' r='3' />
        {muted && <line x1='3' y1='3' x2='21' y2='21' />}
    </svg>
);

const BtnPage = ({ isPlaying, onToggle }) => {
    return (
        <button type='button' className={styles.musicButton} onClick={onToggle}
            aria-label={isPlaying ? 'Вимкнути фонову музику' : 'Увімкнути фонову музику'}>
            <NoteIcon muted={!isPlaying} />
        </button>
    )
};
export default BtnPage;
