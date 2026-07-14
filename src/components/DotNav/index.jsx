import { useState, useEffect } from 'react';
import styles from './dotNav.module.scss';

const SECTIONS = ['Головна', 'Дата весілля', 'Запрошення', 'Локації', 'Анкета гостя'];

const DotNav = () => {
    const [active, setActive] = useState(0);
    useEffect(() => {
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const sections = [...document.querySelectorAll('#root > div > section')];
                const middle = window.scrollY + window.innerHeight / 2;
                const idx = sections.findLastIndex(s =>
                    s.getBoundingClientRect().top + window.scrollY <= middle);
                setActive(Math.max(idx, 0));
            });
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    }, []);
    const goTo = (i) => {
        document.querySelectorAll('#root > div > section')[i]
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    return (
        <nav className={styles.dotNav} aria-label="Розділи запрошення">
            {SECTIONS.map((label, i) => (
                <button key={label} type="button" aria-label={label}
                    aria-current={active === i ? 'true' : undefined}
                    className={`${styles.dot} ${active === i ? styles.active : ''}`}
                    onClick={() => goTo(i)} />
            ))}
        </nav>
    );
};
export default DotNav;
