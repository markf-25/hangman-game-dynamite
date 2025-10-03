const config = {
    api: {
        backend: '/api/word',
        languages: {
            ita: 'https://random-words-api.kushcreates.com/api?language=it&words=1',
            eng: 'https://random-word-api.herokuapp.com/word',
}
}
}

//Base//
export const databaseUrl = config.api.backend;

export const localizedApi = config.api.languages

export default config