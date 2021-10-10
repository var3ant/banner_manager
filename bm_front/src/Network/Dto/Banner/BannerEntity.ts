import React from 'react';

export class BannerEntity {
    name: string
    price: number
    categoryId: number
    text: string
    id: number

    constructor(id:number = -1, name: string = "", price: number = 0, categoryId: number = -1, text: string = "") {
        this.name = name;
        this.price = price;
        this.categoryId = categoryId
        this.text = text;
        this.id = id;
    }
}