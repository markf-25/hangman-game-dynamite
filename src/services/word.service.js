export const getWord = async () => {
    try {

        const response = await fetch(`${retrievePosts}?${parameters}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        })
        const data = await response.json();

        if (response.ok) {
            return data
        }
    } catch (error) {
        console.error(error);
    }
}