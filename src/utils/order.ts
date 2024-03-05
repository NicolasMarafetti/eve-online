import { Order } from "@/types/eve_api";

export const groupOrdersByItemId = (orders: Order[]): {
    [itemId: number]: Order[];
} => {
    const groupedOrders = orders.reduce((acc, order) => {
        if (!acc[order.type_id]) {
            acc[order.type_id] = [];
        }
        acc[order.type_id].push(order);
        return acc;
    }, {} as any);
    return groupedOrders;
}