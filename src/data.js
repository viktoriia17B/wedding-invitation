
const deepFreeze = (obj) => {
    if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) {
        return obj;
    }
    Object.freeze(obj);
    for (const name of Object.keys(obj)) {
        const prop = obj[name];
        deepFreeze(prop);
    };
    return obj;
};

export const DATA = deepFreeze({
    title: 'Запрошення на весілля',
    subtitle: 'Дата весілля',
    couple: 'Віталій і Вікторія',
    date: '2026-09-05T11:00:00+03:00',
    endpoint: 'https://formspree.io/f/meebbjaw',
    greeting: {
        title: 'Увага, найкращі люди!',
        text: 'Ми щиро запрошуємо вас стати свідками народження нашої родини та розділити з нами',
        accent: 'цей щасливий день!'
    },
    locations: [
        {
            id: 'ceremony',
            label: 'Церемонія',
            time: '11:00',
            location: 'м.Дніпро, площа Шевченка, 7',
            title: 'Соборний відділ ДРАЦС у місті Дніпро',
            coords: { lat: 48.46074, lng: 35.06766 }

        },
        {
            id: 'banquet',
            label: 'Банкет',
            time: '14:00',
            location: 'ж/м Придніпровськ, вул. Шляхова, 2',
            title: '1st Legion Придніпровськ',
            coords: { lat: 48.4403105, lng: 35.1136629 }
        },
    ],
    images: {
        base: new URL('./assets/images/base.webp', import.meta.url).href,
        story: new URL('./assets/images/story.webp', import.meta.url).href,
        hero: new URL('./assets/images/wedding-hero.webp', import.meta.url).href,
        icon: new URL('./assets/images/wingsIcon.png', import.meta.url).href
    },
    audio: {
        bgMusic: {
            ogg: new URL('./assets/audio/hatrsyzy.ogg', import.meta.url).href,
            mp3: new URL('./assets/audio/hatrsyzy.mp3', import.meta.url).href
        }
    }
})

