const config = {
    api: {
        backend: 'http://localhost:5000/api/word',
        languages: {
            ita: 'https://random-words-api.kushcreates.com/api?language=it&words=1',
            eng: 'https://random-word-api.herokuapp.com/word'
}
}
}

//Base//
const databaseUrl = config.api.base;

//Languages//
const italian = config.api.languages.ita
const english = config.api.languages.eng

//Shortcuts//
export const italianWord = databaseUrl + italian
export const englishWord = databaseUrl + english

export default config