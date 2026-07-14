// The app scrolls inside .snap-scroller (the document never scrolls — that
// keeps the mobile URL bar, and thus the viewport height, stable).
export const getScroller = () => document.querySelector('.snap-scroller');

// Smooth-scrolls to an element while CSS scroll-snap is suspended.
// `scroll-snap-type: y mandatory` fights programmatic smooth scrolling
// (the browser keeps re-snapping mid-animation → jerks, and
// `scroll-snap-stop: always` strands multi-section jumps on an
// intermediate section), so we drop snapping for the duration and
// restore it once scrolling settles.
let restoreTimer = 0;

const restoreSnap = () => {
    clearTimeout(restoreTimer);
    const scroller = getScroller();
    if (!scroller) return;
    scroller.removeEventListener('scrollend', restoreSnap);
    scroller.classList.remove('no-snap');
};

export const snapScrollTo = (el) => {
    const scroller = getScroller();
    if (!el || !scroller) return;
    scroller.classList.add('no-snap');
    scroller.addEventListener('scrollend', restoreSnap);
    // Safari has no `scrollend` — fall back to a timer that outlives the animation
    clearTimeout(restoreTimer);
    restoreTimer = setTimeout(restoreSnap, 1500);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
