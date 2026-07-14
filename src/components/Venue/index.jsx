import { getMapLink } from '../../utils/getMapLink';
import { useScrollTrigger } from '../../hooks/useScrollTrigger';
import styles from './venue.module.scss';
const Venue = ({ ref, locations, scrollTargetRef }) => {
    const [triggerRef] = useScrollTrigger({ scrollTargetRef })
    return (
        <section ref={ref} className={styles.venue}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <h2 className={styles.title}>Місце проведення</h2>
                </div>
                <div className={styles.cardsContainer}>
                    {locations.map(({ id, label, time, title, location, coords }) => (
                        <div key={id} className={styles.card}>
                            <h3 className={styles.label}>{label} <br /> {title}</h3>
                            <span className={styles.time}>{time}</span>
                            <p className={styles.address}>{location}</p>
                            <a href={getMapLink(coords.lat, coords.lng)}
                                target='_blank' rel='noreferrer' className={styles.btn}>Переглянути на карті</a>
                        </div>
                    ))}
                </div>
                <div className={styles.footer}>
                    <h3 className={styles.footerTitle}>Підтвердження присутності</h3>
                    <p className={styles.footerText}>Будь ласка, надайте відповідь про вашу присутність на весіллі до 10 серпня!</p>
                </div>
                <div ref={triggerRef} className={styles.scrollTrigger} />
            </div>
        </section>
    )
};
export default Venue;