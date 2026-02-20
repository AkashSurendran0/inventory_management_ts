import { Inventory } from "../entity/Inventory";

export interface IGetAllProducts {
    getAllProducts(query: string | undefined): Promise<Inventory[]>
}