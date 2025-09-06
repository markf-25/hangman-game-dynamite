const config = {
    api: {
        base: 'https://random-words-api.kushcreates.com/api',
        languages: {
            italian: '?language=it'
}
}
}

//Base//
const databaseUrl = config.api.base;

//Languages//
const italian = config.api.languages.italian

//Shortcuts//
export const italianWord = databaseUrl + italian

export default config