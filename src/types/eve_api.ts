interface DogmaAttribute {
    attribute_id: number;
    value: number;
}

export interface EveApiMarketHistoryResponse {
    average: number;
    date: string;
    highest: number;
    lowest: number;
    order_count: number;
    volume: number;
}

export interface EveApiTypeResponse {
    capacity: number;
    description: string;
    dogma_attributes: DogmaAttribute[];
    group_id: number;
    icon_id: number;
    market_group_id: number;
    mass: number;
    name: string;
    packaged_volume: number;
    portion_size: number;
    published: boolean;
    radius: number;
    type_id: number;
    volume: number;
}

export interface Order {
    duration: number;
    is_buy_order: boolean;
    issued: string;
    location_id: number;
    min_volume: number;
    order_id: number;
    price: number;
    range: string;
    system_id: number;
    type_id: number;
    volume_remain: number;
    volume_total: number;
}