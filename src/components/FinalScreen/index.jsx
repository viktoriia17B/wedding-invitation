import styles from './finalScreen.module.scss';
const FinalScreen = ({ backgroundImg, attending, name }) => {
    return (
        // div, not section: a nested <section> would get its own scroll-snap
        // stop from the global section rule and break section-per-gesture flow
        <div className={styles.finalScreen}
            style={{ '--bg-image': `url(${backgroundImg})` }}>
            <div className={styles.content}>
                <h2 className={styles.title}>{name},<br />{attending === 'yes' ? 'чекаємо на Вас із нетерпінням!' : 'обіймаємо та дякуємо за відповідь!'}</h2>
            </div>
        </div>
    )
};
export default FinalScreen;