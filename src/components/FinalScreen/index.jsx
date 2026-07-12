import { forwardRef } from 'react';
import styles from './finalScreen.module.scss';
const FinalScreen = forwardRef(({ backgroundImg, attending, name }, ref) => {
    return (
        <section ref={ref} className={styles.finalScreen}
            style={{ '--bg-image': `url(${backgroundImg})` }}>
            <div className={styles.content}>
                <h2 className={styles.title}>{name},<br />{attending === 'yes' ? 'чекаємо на Вас із нетерпінням!' : 'обіймаємо та дякуємо за відповідь!'}</h2>
            </div>
        </section >
    )
});
export default FinalScreen;