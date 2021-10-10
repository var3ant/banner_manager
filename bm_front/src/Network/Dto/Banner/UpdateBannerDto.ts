export class UpdateBannerDto {
    id: number
    name: string
    price: number
    categoryId: number
    text: string

    constructor(id: number, name: string = "", price: number = 0, categoryId: number = -1, text: string = "") {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.text = text;
    }
}