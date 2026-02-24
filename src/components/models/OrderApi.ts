import { IApi } from '../../types';
import { IProduct, IOrderData, IOrderResponse } from '../../types';

export class OrderApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<{ items: IProduct[] }> {
        return this.api.get<{ items: IProduct[] }>('/product');
    }

    createOrder(data: IOrderData): Promise<IOrderResponse> {
        return this.api.post<IOrderResponse>('/order', data);
    }
}
