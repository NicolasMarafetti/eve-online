export interface FIT {
    id: number;
    name: string;
    items: {
        itemId: string;
        quantity: number;
    }[];
    ship: {
        itemId: string;
    };
}

export const FITS = [
    {
        id: "1",
        name: "Magnate - Scanner",
        items: [
            {
                itemId: "3",
                quantity: 1
            },
            {
                itemId: "4",
                quantity: 16
            },
            {
                itemId: "6",
                quantity: 2
            },
            {
                itemId: "8",
                quantity: 2
            },
            {
                itemId: "10",
                quantity: 1
            },
            {
                itemId: "11",
                quantity: 2
            },
            {
                itemId: "13",
                quantity: 2
            }
        ],
        ship: {
            itemId: "7"
        }
    },
    {
        id: "2",
        name: "Magnate - Data",
        items: [
            {
                itemId: "1",
                quantity: 1
            },
            {
                itemId: "2",
                quantity: 1
            },
            {
                itemId: "5",
                quantity: 1
            },
            {
                itemId: "6",
                quantity: 2
            },
            {
                itemId: "8",
                quantity: 2
            },
            {
                itemId: "14",
                quantity: 2
            }
        ],
        ship: {
            itemId: "7"
        }
    },
    {
        id: "3",
        name: "Magnate - Relic",
        items: [
            {
                itemId: "1",
                quantity: 1
            },
            {
                itemId: "2",
                quantity: 1
            },
            {
                itemId: "6",
                quantity: 2
            },
            {
                itemId: "8",
                quantity: 2
            },
            {
                itemId: "9",
                quantity: 1
            },
            {
                itemId: "12",
                quantity: 2
            }
        ],
        ship: {
            itemId: "7"
        }
    }
]