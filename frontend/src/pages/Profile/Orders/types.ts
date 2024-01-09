import { Order } from "../../../types/data";

export interface OrdersOutletContext {
  activeOrders: Order[];
  notActiveOrders: Order[];
  isLoading: boolean;
}
