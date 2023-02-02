import { OrderStatus } from "src/app/dialogs/order-detail-dialog/order-detail-dialog.component";

export class SingleOrder {
    addressDescription: string;
    addressCity: string;
    addressDistrict: string;
    addressNeighborhood: string;
    basketItems: any[];
    createdDate: Date;
    description: string;
    id: string;
    orderCode: string;
    completed: boolean;
    status: any;
  }