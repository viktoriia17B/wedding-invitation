export const reverseCouple = (coupleString) => {
    if (typeof coupleString !== 'string' || !coupleString) {
        return '';
    };
    const separator = ' і ';
    const names = coupleString.split(separator);
    if (names.length === 2) {
        return `${names[1]}${separator}${names[0]}`
    }
    return coupleString;
}