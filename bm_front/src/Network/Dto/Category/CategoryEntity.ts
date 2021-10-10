import React from 'react';

export class CategoryEntity {
    name: string;
    reqName: string;
    id: number;

    constructor(id:number = -1, name: string = "", reqName: string = "") {
        this.name = name;
        this.reqName = reqName;
        this.id = id;
    }
}