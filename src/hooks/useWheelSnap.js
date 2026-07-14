import { useEffect } from 'react';
import { snapScrollTo, getScroller } from '../utils/snapScroll';

// Колесо/трекпад: будь-який рух на межі секції перегортає на сусідню цілком.
// CSS scroll-snap лишається для тач-жестів; тут лише допомога для wheel,
// бо нативний snap повертає малий рух до найближчої (поточної) секції.
export const useWheelSnap = () => {
    useEffect(() => {
        let lockedUntil = 0;
        const onWheel = (e) => {
            const dir = Math.sign(e.deltaY);
            if (!dir) return;
            const now = Date.now();
            if (now < lockedUntil) {
                // Лок перевіряємо ДО перевірок меж: посеред анімації позиція
                // проміжна, і подія могла пройти у нативний скрол — звідси
                // тремтіння й переліт через секцію. Хвіст інерції продовжує лок:
                // новий свідомий жест — це пауза без подій, а не momentum-подія.
                e.preventDefault();
                lockedUntil = Math.max(lockedUntil, now + 300);
                return;
            }
            const scroller = getScroller();
            // top-level sections only — nested markup must not add snap targets
            const sections = [...document.querySelectorAll('#root > div > section')];
            if (!scroller || !sections.length) return;
            const vh = scroller.clientHeight;
            const y = scroller.scrollTop;
            const base = scroller.getBoundingClientRect().top;
            const tops = sections.map(s => Math.round(s.getBoundingClientRect().top - base + y));
            let idx = tops.findLastIndex(top => y >= top - 2);
            if (idx === -1) idx = 0;
            const curTop = tops[idx];
            const curBottom = curTop + sections[idx].offsetHeight;
            // Секція вища за екран: нативний скрол, поки не дійшли її краю
            if (dir > 0 && curBottom > y + vh + 2) return;
            if (dir < 0 && curTop < y - 2) return;
            e.preventDefault();
            const next = sections[idx + dir];
            if (!next) return;
            lockedUntil = now + 700; // покриває smooth-анімацію; далі тягне інерція
            snapScrollTo(next);
        };
        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, []);
};
