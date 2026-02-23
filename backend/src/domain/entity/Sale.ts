export class Sale {
    constructor(
        public _id:string,
        public date:Date,
        public productName:string,
        public customerName:string,
        public quantity:number,
        public pricePerUnit:number,
        public totalAmount:number
    ) {}
}