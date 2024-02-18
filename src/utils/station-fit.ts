export const getStationFits = async () => {
    return await fetch(`/api/stations/fits`).then(res => res.json());
}