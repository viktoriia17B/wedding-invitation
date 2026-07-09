import styles from './hero.module.scss'
const Hero = ({ title, name, backgroundImg, onStart }) => {
    return (
        <section className={styles.hero} style={{
            '--bg-image': `url(${backgroundImg})`
        }}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <h1 className={styles.title}>{title}</h1>
                </div>
                <div className={styles.center}>
                    <h2 className={styles.names}>{name}</h2>
                </div>
                <div className={styles.footer}>
                    <button className={styles.btn} type='button' onClick={onStart}>Відкрити запрошення</button>
                </div>
            </div>
        </ section >
    )
};
export default Hero;