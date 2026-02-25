import { IApi } from '../../types';
import { IProduct, IOrderData, IOrderResponse } from '../../types';

export class OrderApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<{ total: number, items: IProduct[] }> {
        return this.api.get<{ total: number, items: IProduct[] }>('/product');
    }

    // в postman коллекции "body": { "id": "28c57cb4-3002-4445-8aa1-2a06a5055ae5", "total": 2200}
    createOrder(data: IOrderData): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order', data);
    }
}
