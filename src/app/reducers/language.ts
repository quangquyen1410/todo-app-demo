import { loadLocale } from "../../locales/i18n";

const langReducer = (state: string = '', action: any) => {
    if (action.type === 'SET_LANG') {
        const lang = action.payload
        localStorage.setItem('lang', lang);
        loadLocale(lang);
        return lang
    }
    return state;
}
export default langReducer;