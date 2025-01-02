import {makeAutoObservable} from 'mobx'

export default class DeviceStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Холодильники'},
            {id: 2, name: 'Смартфоны'}
        ]
        this._brands = [
            {id: 1, name: 'Samsung'},
            {id: 2, name: 'Apple'}
        ]
        this._devices = [
            {id: 1, name: 'IPhone 15 pro', price: '90000', img: 'https://yandex.ru/images/search?pos=11&from=tabbar&img_url=https%3A%2F%2Fimg-prd-pim.poorvika.com%2Fproduct%2FApple-iphone-15-pro-max-natural-titanium-256gb-Back-Front-View.png&text=iphone+15+pro&rpt=simage&lr=131405'},
            {id: 2, name: 'IPhone 15 pro', price: '90000', img: 'https://yandex.ru/images/search?pos=11&from=tabbar&img_url=https%3A%2F%2Fimg-prd-pim.poorvika.com%2Fproduct%2FApple-iphone-15-pro-max-natural-titanium-256gb-Back-Front-View.png&text=iphone+15+pro&rpt=simage&lr=131405'},
            {id: 3, name: 'IPhone 15 pro', price: '90000', img: 'https://yandex.ru/images/search?pos=11&from=tabbar&img_url=https%3A%2F%2Fimg-prd-pim.poorvika.com%2Fproduct%2FApple-iphone-15-pro-max-natural-titanium-256gb-Back-Front-View.png&text=iphone+15+pro&rpt=simage&lr=131405'},
            {id: 4, name: 'IPhone 15 pro', price: '90000', img: 'https://yandex.ru/images/search?pos=11&from=tabbar&img_url=https%3A%2F%2Fimg-prd-pim.poorvika.com%2Fproduct%2FApple-iphone-15-pro-max-natural-titanium-256gb-Back-Front-View.png&text=iphone+15+pro&rpt=simage&lr=131405'}
        ]
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands= brands
    }

    setDevices(devices) {
        this._devices = devices
    }

    get types() {
        return this._types
    }

    get brands() {
        return this._brands
    }

    get devices() {
        return this._devices
    }
}