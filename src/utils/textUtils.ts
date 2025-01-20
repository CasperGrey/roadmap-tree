// src/utils/textUtils.ts

const UPPERCASE_WORDS = ['AI', 'PR', 'MS', 'LMS', 'POC'];

export const toTitleCase = (str: string): string => {
    if (!str) return '';

    return str.split(' ').map(word => {
        if (UPPERCASE_WORDS.includes(word.toUpperCase())) {
            return word.toUpperCase();
        }
        if (word === '&') return '&';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
};

export const sanitizeText = (text: string): string => {
    return text.trim().replace(/[<>]/g, '');
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
};