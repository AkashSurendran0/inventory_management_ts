import { Inventory } from "../entity/Inventory";

type Data = {
    name:string,
    description:string,
    quantity:number,
    price:number
}

export interface IInventoryRepository {
    findProductsByQuery(query:string): Promise<Inventory[]>
    findAllProducts(): Promise<Inventory[]>
    addProduct(data: Data): Promise<{success:boolean, product?:Inventory}>
    editProduct(data: Data, id:string): Promise<{success:boolean, product?:Inventory}>
    deleteProduct(id:string): Promise<{success:boolean}>
}