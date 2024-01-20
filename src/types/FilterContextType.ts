export interface FilterType {
    name: string;
    value: string;
}

export default interface FilterContextType {
    filters: FilterType;
    addingShip: boolean;
    setAddingShip: (addingShip: boolean) => void;
    setFilters: (filter: FilterType) => void;
}
