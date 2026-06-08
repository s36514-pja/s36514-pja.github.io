function determineLanguage() {
    const savedPreference = localStorage.getItem('user-language');
    if (savedPreference) return savedPreference;

    return (navigator.language || navigator.userLanguage).split('-')[0];

    return 'pl'; // Ultimate fallback
}
//export const lang = determineLanguage();
export const lang = 'pl';
