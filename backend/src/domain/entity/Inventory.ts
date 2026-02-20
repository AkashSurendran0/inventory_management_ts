export class Inventory {
    constructor(
        public _id:string,
        public name:string,
        public normalizedName:string,
        public description:string,
        public quantity:number,
        public price:number,
        public createdAt:Date
    ) {}
}