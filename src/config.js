const config = {
    api: {
        base: 'https://random-words-api.kushcreates.com/api',
        languages: {
            italian: '?language=it',
            english: '?language=en'
}
}
}

//Base//
const databaseUrl = config.api.base;

//Languages//
const italian = config.api.languages.italian
const english = config.api.languages.english

//Shortcuts//
export const italianWord = databaseUrl + italian
export const englishWord = databaseUrl + english

export default config