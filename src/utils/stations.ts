export const getStations = async () => {
    const response = await fetch('/api/stations');
    return await response.json();
}