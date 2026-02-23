export class Sale {
    constructor(
        public _id:string,
        public date:Date,
        public productId:string,
        public customerId:string,
        public quantity:number,
        public pricePerUnit:number,
        public totalAmount:number
    ) {}
}