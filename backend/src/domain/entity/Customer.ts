export class Customer {
    constructor(
        public _id:string,
        public name:string,
        public normalizedName:string,
        public address:string,
        public phone:string,
        public isActive:boolean,
    ) {}
}