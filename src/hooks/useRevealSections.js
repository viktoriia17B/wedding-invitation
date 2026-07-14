import { useEffect } from 'react';

// Позначає секції верхнього рівня data-visible, коли вони входять у в'юпорт.
// CSS у global.scss робить fade-up контенту; спрацьовує один раз на секцію.
export const useRevealSections = () => {
    useEffect(() => {
        const sections = document.querySelectorAll('#root > div > section');
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.dataset.visible = 'true';
                    observer.unobserve(entry.target);
                }
            }
        }, { threshold: 0.3 });
        sections.forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, []);
};
