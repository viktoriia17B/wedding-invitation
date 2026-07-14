import styles from './finalScreen.module.scss';
const FinalScreen = ({ backgroundImg, attending, name }) => {
    return (
        <section className={styles.finalScreen}
            style={{ '--bg-image': `url(${backgroundImg})` }}>
            <div className={styles.content}>
                <h2 className={styles.title}>{name},<br />{attending === 'yes' ? 'чекаємо на Вас із нетерпінням!' : 'обіймаємо та дякуємо за відповідь!'}</h2>
            </div>
        </section >
    )
};
export default FinalScreen;