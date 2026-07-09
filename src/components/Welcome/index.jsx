import styles from './welcome.module.scss';

const Welcome = ({ title, text, backgroundImg, iconImg }) => {
    return (
        <section className={styles.welcome} style={{ '--bg-image': `url(${backgroundImg})` }}>
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <img className={styles.icon} src={iconImg} alt='Крила' />
                <p className={styles.text}>{text}</p>
            </div>
        </section>
    )
};
export default Welcome