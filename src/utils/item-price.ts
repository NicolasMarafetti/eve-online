export const analyseItemPriceHistory = (inputValue: string): {
    price: number,
    sellPerDay: number
} => {
    let rawHistoryArray: any[] = inputValue.split(new RegExp(/\d{4}\.\d{2}\.\d{2} \d{2}:\d{2}:\d{2}/));

    let sellHistory: {
        quantity: number,
        avg: number
    }[] = [];

    for (let i = 0; i < rawHistoryArray.length; i++) {
        if (rawHistoryArray[i]) {
            /\s*\d*\s*(\d*).*ISK.*ISK(.*)ISK/.exec(rawHistoryArray[i]);

            let quantity: number = parseInt(RegExp.$1);
            let avgString: string = RegExp.$2.replace(/\s+/g, '');
            avgString = avgString.replace(/,/, '.');
            let avg: number = parseFloat(avgString)

            sellHistory.push({
                quantity,
                avg
            })
        }
    }

    let totalQuantity: number = 0;
    let totalPrice: number = 0;
    let averagePrice: number;
    let sellPerDay: number = 0;

    for (let i = 0; i < sellHistory.length; i++) {
        totalQuantity += sellHistory[i].quantity;
        totalPrice += sellHistory[i].quantity * sellHistory[i].avg;
    }

    averagePrice = totalQuantity ? totalPrice / totalQuantity : 0;
    sellPerDay = totalQuantity / rawHistoryArray.length;

    return {
        price: averagePrice,
        sellPerDay
    }
}