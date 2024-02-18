export interface STATION {
    id: string;
    system: string;
    structure: string;
    needExplorationShips: boolean;
    inventory: {
        fitId?: string;
        materialId?: string;
        quantity: number;
    }[]

}

export const ALLIANCE_STATIONS = [
    {
        id: "1",
        system: "SI-I89",
        structure: "Fortizar",
        needExplorationShips: true,
        inventory: [
            {
                fitId: "1",
                quantity: 1
            },
            {
                fitId: "2",
                quantity: 1
            },
            {
                fitId: "3",
                quantity: 1
            }
        ]
    },
    {
        id: "2",
        system: "SI-I89",
        structure: "Raitaru",
        needExplorationShips: false,
        inventory: [
            {
                materialId: "9",
                quantity: 56
            },
            {
                materialId: "12",
                quantity: 64
            },
            {
                materialId: "8",
                quantity: 64
            },
            {
                materialId: "11",
                quantity: 32
            },
            {
                materialId: "4",
                quantity: 6759
            },
            {
                materialId: "6",
                quantity: 16
            },
            {
                materialId: "3",
                quantity: 43904
            },
            {
                materialId: "5",
                quantity: 170
            },
            {
                materialId: "2",
                quantity: 147453
            },
            {
                materialId: "1",
                quantity: 527772
            }
        ]
    },
    {
        id: "3",
        system: "D-6WS1",
        structure: "Astrahus",
        needExplorationShips: true,
        inventory: []
    },
    {
        id: "4",
        system: "Shitaht",
        structure: "Fortizar",
        needExplorationShips: true,
        inventory: [
            {
                stuffId: "7",
                quantity: 1
            }
        ]
    },
    {
        id: "5",
        system: "H6-CX8",
        structure: "Fortizar",
        needExplorationShips: true,
        inventory: []
    }
]