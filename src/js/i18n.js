function determineLanguage() {
    const savedPreference = localStorage.getItem('user-language');
    if (savedPreference) return savedPreference;

// Directly return the two-letter browser language code
    return (navigator.language || navigator.userLanguage).split('-')[0];

    return 'pl'; // Ultimate fallback
}
// 3. Get the current language code
export const lang = determineLanguage();
