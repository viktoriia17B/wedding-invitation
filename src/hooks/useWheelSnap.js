import { useEffect } from 'react';

// Колесо/трекпад: будь-який рух на межі секції перегортає на сусідню цілком.
// CSS scroll-snap лишається для тач-жестів; тут лише допомога для wheel,
// бо нативний snap повертає малий рух до найближчої (поточної) секції.
export const useWheelSnap = () => {
    useEffect(() => {
        let lockedUntil = 0;
        const onWheel = (e) => {
            const sections = [...document.querySelectorAll('section')];
            if (!sections.length) return;
            const vh = window.innerHeight;
            const y = window.scrollY;
            const dir = e.deltaY > 0 ? 1 : -1;
            const tops = sections.map(s => Math.round(s.getBoundingClientRect().top + y));
            let idx = tops.findLastIndex(top => y >= top - 2);
            if (idx === -1) idx = 0;
            const curTop = tops[idx];
            const curBottom = curTop + sections[idx].offsetHeight;
            // Секція вища за екран: нативний скрол, поки не дійшли її краю
            if (dir > 0 && curBottom > y + vh + 2) return;
            if (dir < 0 && curTop < y - 2) return;
            e.preventDefault(); // гасимо і інерційні події під час анімації
            const now = Date.now();
            if (now < lockedUntil) return;
            const next = sections[idx + dir];
            if (!next) return;
            lockedUntil = now + 1000;
            next.scrollIntoView({ behavior: 'smooth' });
        };
        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, []);
};
