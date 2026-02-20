import { Inventory } from "../entity/Inventory";

export interface IInventoryRepository {
    findProductsByQuery(query:string): Promise<Inventory[]>
    findAllProducts(): Promise<Inventory[]>
}