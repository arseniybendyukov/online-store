import { Order } from "../../../types/data";

export interface OrdersOutletContext {
  activeOrders: Order[];
  completedOrders: Order[];
}
