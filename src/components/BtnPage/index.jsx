import styles from './btnPage.module.scss';
const BtnPage = ({ isPlaying, onToggle }) => {
    return (
        <button type='button' className={styles.musicButton} onClick={onToggle}
            aria-label={isPlaying ? 'Вимкнути фонову музику' : 'Увімкнути фонову музику'}>
            {isPlaying ? '🎶' : '🔇'}
        </button>
    )
};
export default BtnPage;