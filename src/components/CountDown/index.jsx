import { useState, useEffect } from "react";
import { calculateTimeLeft, ukPlural } from "../../utils/timeUtils";
import styles from './countDown.module.scss'
const CountDown = ({ ref, subtitle, names, targetDate, backgroundImg }) => {
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));
    useEffect(() => {
        let timer = setInterval(() => setTimeLeft(calculateTimeLeft(targetDate)), 1000);
        return () => clearInterval(timer)
    }, [targetDate]);
    const units = [
        { id: 'days', value: timeLeft.days, label: ukPlural(timeLeft.days, ['день', 'дні', 'днів']) },
        { id: 'hours', value: timeLeft.hours, label: ukPlural(timeLeft.hours, ['година', 'години', 'годин']) },
        { id: 'minutes', value: timeLeft.minutes, label: ukPlural(timeLeft.minutes, ['хвилина', 'хвилини', 'хвилин']) },
        { id: 'seconds', value: timeLeft.seconds, label: ukPlural(timeLeft.seconds, ['секунда', 'секунди', 'секунд']) }];

    return (
        <section ref={ref} className={styles.countdown} style={{ '--bg-image': `url(${backgroundImg})` }}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <p className={styles.subtitle}>{subtitle}</p>
                    <p className={styles.date}>{targetDate.slice(0, 10).split('-').reverse().join('.')}</p>
                </div>
                <div className={styles.bottom}>
                    <h2 className={styles.names}>{names}</h2>
                    {timeLeft.isPast ? (
                        <p className={styles.welcome}>Цей день настав — до зустрічі на святі!</p>
                    ) : (
                        <>
                            <p className={styles.welcome}>Побачимось з вами через...</p>
                            <div className={styles.timer}>
                                {units.map(unit => (<div className={styles.timeBlock} key={unit.id}>
                                    {/* key={value} перемонтовує span і перезапускає анімацію зміни цифри */}
                                    <span key={unit.value} className={styles.timeValue}>{unit.value}</span>
                                    <span className={styles.timeLabel}>{unit.label}</span>
                                </div>))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section >
    )
};
export default CountDown;