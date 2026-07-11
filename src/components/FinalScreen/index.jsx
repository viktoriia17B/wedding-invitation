import { forwardRef } from 'react';
import styles from './finalScreen.module.scss';
const FinalScreen = forwardRef(({ backgroundImg, attending }, ref) => {
    return (
        <section ref={ref} className={styles.finalScreen}
            style={{ '--bg-image': `url(${backgroundImg})` }}>
            <div className={styles.content}>
                <h2 className={styles.title}>Чекаємо на Вас!</h2>
            </div>
        </section >
    )
});
export default FinalScreen;