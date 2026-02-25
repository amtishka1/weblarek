import './scss/styles.scss';

import { Products } from './components/models/Products';
import { Cart } from './components/models/Cart';
import { Buyer } from './components/models/Buyer';
import { Api } from './components/base/Api';
import { OrderApi } from './components/models/OrderApi';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

const productsModel = new Products();
const cartModel = new Cart();
const buyerModel = new Buyer();

const api = new Api(API_URL);
const orderApi = new OrderApi(api);

productsModel.setItems(apiProducts.items);
console.log('Массив товаров из каталога:', productsModel.getItems());

const testProductId = apiProducts.items[0]?.id;
if (testProductId) {
    const product = productsModel.getItem(testProductId);
    console.log('Товар по ID (' + testProductId + '):', product);
}

if (apiProducts.items[1]) {
    productsModel.setSelectedProduct(apiProducts.items[1]);
    console.log('Выбранный товар для отображения:', productsModel.getSelectedProduct());
}

if (apiProducts.items[0]) {
    cartModel.addItem(apiProducts.items[0]);
    console.log('Добавлен товар в корзину:', apiProducts.items[0].title);
}
if (apiProducts.items[1]) {
    cartModel.addItem(apiProducts.items[1]);
    console.log('Добавлен товар в корзину:', apiProducts.items[1].title);
}

console.log('Товары в корзине:', cartModel.getItems());
console.log('Количество товаров в корзине:', cartModel.getCount());
console.log('Общая стоимость товаров в корзине:', cartModel.getTotalPrice());

if (testProductId) {
    console.log('Наличие товара с ID ' + testProductId + ' в корзине:', cartModel.hasItem(testProductId));
}
console.log('Наличие несуществующего товара в корзине:', cartModel.hasItem('non-existent-id'));

if (apiProducts.items[0]) {
    cartModel.removeItem(apiProducts.items[0]);
    console.log('Товар удалён из корзины:', apiProducts.items[0].title);
}
console.log('Товары в корзине после удаления:', cartModel.getItems());

cartModel.clear();
console.log('Корзина после очистки:', cartModel.getItems());

buyerModel.setPayment('card');
console.log('Установлен способ оплаты:', buyerModel.getData().payment);

buyerModel.setAddress('г. Москва, ул. Пушкина, д. 10');
console.log('Установлен адрес:', buyerModel.getData().address);

buyerModel.setEmail('test@example.com');
console.log('Установлен email:', buyerModel.getData().email);

buyerModel.setPhone('+7 (999) 123-45-67');
console.log('Установлен телефон:', buyerModel.getData().phone);

console.log('Все данные покупателя:', buyerModel.getData());

console.log('Результат валидации (ошибки):', buyerModel.validate());

console.log('Валидность оплаты и адреса:', buyerModel.isValidPaymentAndAddress());
console.log('Валидность email и телефон:', buyerModel.isValidEmailAndPhone());
console.log('Полная валидность данных:', buyerModel.isValid());

buyerModel.clear();
console.log('Данные после очистки:', buyerModel.getData());
console.log('Результат валидации после очистки (ошибки):', buyerModel.validate());

orderApi.getProducts()
    .then((response) => {
        console.log('Получен каталог товаров с сервера:');
        console.log('Количество товаров:', response.items.length);
        console.log('Товары:', response.items);

        productsModel.setItems(response.items);
        console.log('Товары сохранены в модель Products');
        console.log('Товары из модели после сохранения:', productsModel.getItems());
    })
    .catch((error) => {
        console.error('Ошибка при получении каталога товаров:', error);
    });

console.log('Тестирование моделей данных завершено.');
