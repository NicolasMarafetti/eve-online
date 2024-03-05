export const cleanItemsDoublon = () => {
    fetch(`/api/items/clean_doublon`, {
        method: 'DELETE'
    })

}

export const getItems = async () => {
    const response = await fetch(`/api/items`);
    return response.json();
}

export const updateItemPrice = async (itemId: number, station: number, price: number, sellPerDay: number): Promise<boolean> => {
    await fetch(
        `${process.env.REACT_APP_SERVER_URL}item/${itemId}/price_informations`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price,
                sellPerDay,
                station
            }),
        }
    )

    return true;
}