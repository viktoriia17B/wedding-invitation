import { useScrollTrigger } from '../../hooks/useScrollTrigger';
import styles from './welcome.module.scss';

const Welcome = ({ ref, title, text, backgroundImg, iconImg, scrollTargetRef }) => {
    const [triggerRef] = useScrollTrigger({ scrollTargetRef })
    return (
        <section ref={ref} className={styles.welcome} style={{ '--bg-image': `url(${backgroundImg})` }}>
            <div className={styles.container}>
                <h2 className={styles.title}>{title}</h2>
                <img className={styles.icon} src={iconImg} alt='Крила' width='612' height='408' loading='lazy' />
                <p className={styles.text}>{text}</p>
                <div ref={triggerRef} className={styles.scrollTrigger} />
            </div>
        </section>
    )
};
export default Welcome