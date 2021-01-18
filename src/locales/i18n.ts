import i18n from 'i18n-js'

i18n.defaultLocale = 'vi';
i18n.locale = 'vi';
i18n.fallbacks = true
// import(`./vi.json`).then(lang => {
//     i18n.translations = { lang }
// })
// i18n.translations = { vi: require('./vi.json') };
export const loadLocale = (lang: string = '') => {

    const locale = lang || localStorage.getItem('lang') || 'vi';
    if (i18n.translations[locale] !== null) {
        i18n.locale = locale
        // import(`./${locale}.json`).then(lang => {
        //     i18n.translations = { [locale]: lang }
        //     console.log("🚀 ~ file: i18n.ts ~ line 17 ~ import ~ i18n.translations", i18n.translations)
        // })
        i18n.translations = { [locale]: require(`./${locale}.json`) }
        console.log("🚀 ~ file: i18n.ts ~ line 20 ~ loadLocale ~ i18n.translations", i18n.translations)
    }

}

export const listLanguages = [
    {
        value: 'vi',
        label: 'Việt Nam',
    },
    {
        value: 'en',
        label: 'English',
    }

];

export default i18n;