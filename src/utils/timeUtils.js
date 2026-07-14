export const calculateTimeLeft = (targetDate) => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
    }
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false
    };
}

const ukPluralRules = new Intl.PluralRules('uk-UA');
const PLURAL_INDEX = { one: 0, few: 1, many: 2, other: 2 };

// forms: ['день', 'дні', 'днів']
export const ukPlural = (count, forms) => forms[PLURAL_INDEX[ukPluralRules.select(count)]];