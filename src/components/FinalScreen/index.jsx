import { useState, useRef, useEffect } from 'react';
import styles from './finalScreen.module.scss';
const FinalScreen = ({ backgroundImg }) => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.2 });
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        return () => observer.disconnect();
    }, [])
    return (
        <section ref={sectionRef} className={`${styles.finalScreen} ${isVisible ? styles.animate : ''}`}
            style={{ '--bg-image': `url(${backgroundImg})` }}>
            <div className={styles.content}>
                <h2 className={styles.title}>Чекаємо на Вас!</h2>
            </div>
        </section >
    )
};
export default FinalScreen;