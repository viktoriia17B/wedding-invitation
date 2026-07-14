import { useState, useEffect } from 'react';
import { snapScrollTo, getScroller } from '../../utils/snapScroll';
import styles from './dotNav.module.scss';

const SECTIONS = ['Головна', 'Дата весілля', 'Запрошення', 'Локації', 'Анкета гостя'];

const DotNav = () => {
    const [active, setActive] = useState(0);
    useEffect(() => {
        const scroller = getScroller();
        if (!scroller) return;
        let raf = 0;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const sections = [...document.querySelectorAll('#root > div > section')];
                const base = scroller.getBoundingClientRect().top;
                const middle = scroller.scrollTop + scroller.clientHeight / 2;
                const idx = sections.findLastIndex(s =>
                    s.getBoundingClientRect().top - base + scroller.scrollTop <= middle);
                setActive(Math.max(idx, 0));
            });
        };
        onScroll();
        scroller.addEventListener('scroll', onScroll, { passive: true });
        return () => { scroller.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    }, []);
    const goTo = (i) => {
        snapScrollTo(document.querySelectorAll('#root > div > section')[i]);
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
