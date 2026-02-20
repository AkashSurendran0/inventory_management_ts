import { Inventory } from "../entity/Inventory";

type Data = {
    name:string,
    description:string,
    quantity:number,
    price:number
}

export interface IGetAllProducts {
    getAllProducts(query: string | undefined): Promise<Inventory[]>
}

export interface IAddProduct {
    addProduct(data: Data): Promise<Inventory>
}

export interface IEditProduct {
    editProduct(data: Data, id:string): Promise<Inventory>
}