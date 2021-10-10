

export class AddCategoryDto {
    name: string
    reqName: string
    constructor(name: string = "", reqName: string = "") {
        this.name = name;
        this.reqName = reqName;
    }
}