import { IBuyer, TPayment } from '../../types';

export interface IValidationErrors {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string;
}

export class Buyer {
    private payment: TPayment;
    private email: string;
    private phone: string;
    private address: string;

    constructor() {
        this.payment = 'card';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    setPayment(payment: TPayment): void {
        this.payment = payment;
    }

    setAddress(address: string): void {
        this.address = address;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setPhone(phone: string): void {
        this.phone = phone;
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }

    clear(): void {
        this.payment = 'card';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    validate(): IValidationErrors {
        const errors: IValidationErrors = {};

        if (!this.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }

        if (!this.address) {
            errors.address = 'Укажите адрес доставки';
        }

        if (!this.email) {
            errors.email = 'Укажите электронную почту';
        }

        if (!this.phone) {
            errors.phone = 'Укажите телефон';
        }

        return errors;
    }

    isValidStep1(): boolean {
        return !!this.payment && !!this.address;
    }

    isValidStep2(): boolean {
        return !!this.email && !!this.phone;
    }

    isValid(): boolean {
        const errors = this.validate();
        return Object.keys(errors).length === 0;
    }
}
