export class UpdateCategoryDto {
    id: number
    name: string
    reqName: string

    constructor(id: number, name: string = "", reqName: string = "") {
        this.id = id;
        this.name = name;
        this.reqName = reqName;
    }
}