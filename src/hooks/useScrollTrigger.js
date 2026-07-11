import { useRef, useEffect } from "react"

export const useScrollTrigger = (options = {}) => {
    const { threshold = 0.1, scrollTargetRef = null, rootMargin = '-50% 0px -10% 0px' } = options;
    const triggerRef = useRef(null);
    const isFirstCall = useRef(true);// прапорець першого виклику
    useEffect(() => {
        const currentTrigger = triggerRef.current;
        if (!currentTrigger) return;
        const observer = new IntersectionObserver(([entry]) => {
            // Пропускаємо перший автоматичний виклик при підписці
            if (isFirstCall.current) {
                isFirstCall.current = false;
                return;
            }
            if (entry.isIntersecting ?? scrollTargetRef?.current) {
                setTimeout(() => {
                    // Скролимо до явно переданого рефа, а не шукаємо в DOM
                    scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50)

                observer.unobserve(entry.target); // Відписуємося, щоб скрол спрацював лише 1 раз
            }
        }, { threshold, rootMargin });
        observer.observe(currentTrigger);
        return () => observer.disconnect();
    }, [threshold, scrollTargetRef, rootMargin]); // додаємо залежності для безпеки React
    return [triggerRef];
}