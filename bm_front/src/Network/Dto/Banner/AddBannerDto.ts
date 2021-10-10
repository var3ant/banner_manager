

export class AddBannerDto {
    name: string
    price: number
    categoryId: number
    text: string
    constructor(name: string = "", price: number = 0, categoryId: number = -1, text: string = "") {
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.text = text;
    }
}