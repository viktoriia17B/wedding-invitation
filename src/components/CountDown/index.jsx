import { useState, useEffect } from "react";
import { forwardRef } from "react";
import { calculateTimeLeft } from "../../utils/timeUtils";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";
import styles from './countDown.module.scss'
const CountDown = forwardRef(({ subtitle, names, targetDate, backgroundImg, scrollTargetRef }, ref) => {
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));
    useEffect(() => {
        let timer = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000);
        return () => clearInterval(timer)
    }, [targetDate]);
    const [triggerRef] = useScrollTrigger({ scrollTargetRef });
    const units = [
        { id: 'days', value: timeLeft.days, label: 'днів' },
        { id: 'hours', value: timeLeft.hours, label: 'годин' },
        { id: 'minutes', value: timeLeft.minutes, label: 'хвилин' },
        { id: 'seconds', value: timeLeft.seconds, label: 'секунд' }];

    return (
        <section ref={ref} className={styles.countdown} style={{ '--bg-image': `url(${backgroundImg})` }}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <p className={styles.subtitle}>{subtitle}</p>
                    <p className={styles.date}>{targetDate.split('-').reverse().join('.')}</p>
                </div>
                <div className={styles.center}> <h2 className={styles.names}>{names}</h2>
                </div>
                <div className={styles.bottom}>
                    <p className={styles.welcome}>Побачимось з вами через...</p>
                    <div className={styles.timer}>
                        {units.map(unit => (<div className={styles.timeBlock} key={unit.id}>
                            <span className={styles.timeValue}>{unit.value}</span>
                            <span className={styles.timeLabel}>{unit.label}</span>
                        </div>))}
                    </div>
                </div>
                <div ref={triggerRef} className={styles.scrollTrigger} />
            </div>
        </section >
    )
});
export default CountDown;