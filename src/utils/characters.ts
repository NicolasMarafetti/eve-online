export async function getCharacters() {
    const response = await fetch('/api/characters');
    const data = await response.json();
    return data;
}