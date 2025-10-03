const config = {
    api: {
        backend: '/api/server',
        languages: {
            it: 'https://random-words-api.kushcreates.com/api?language=it&words=1',
            en: 'https://random-word-api.herokuapp.com/word',
}
}
}

//Base//
export const databaseUrl = config.api.backend;

export const localizedApi = config.api.languages

export default config