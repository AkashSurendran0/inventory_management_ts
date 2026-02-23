import { Container } from "inversify";
import { TYPES } from "./types";
import { AuthController } from "./controllers/auth.controller";
import { VerifyLogin } from "./services/auth/verifyLogin";
import { AuthRepository } from "./repository/auth.repository";
import { TokenHandler } from "./utils/token.util";
import { JwtHandler } from "./middleware/jwt.middleware";
import { InventoryController } from "./controllers/inventory.controller";
import { GetAllProducts } from "./services/inventory/getAllProducts";
import { InventoryRepository } from "./repository/inventory.repository";
import { AddProduct } from "./services/inventory/addProduct";
import { EditProduct } from "./services/inventory/editProduct";
import { DeleteProduct } from "./services/inventory/deleteProduct";
import { CustomerController } from "./controllers/customer.controller";
import { AddCustomer } from "./services/customer/addCustomer";
import { CustomerRepository } from "./repository/customer.repository";
import { GetAllCustomers } from "./services/customer/getAllCustomers";
import { EditCustomer } from "./services/customer/editCustomer";
import { DeleteCustomer } from "./services/customer/deleteCustomer";
import { SalesController } from "./controllers/sales.controller";
import { AddNewSale } from "./services/sales/addNewSale";
import { SalesRepository } from "./repository/sales.repository";
import { GetAllSales } from "./services/sales/getAllSales";
import { DeleteSale } from "./services/sales/deleteSale";
import { SendReport } from "./services/sales/sendReport";

const container=new Container()

container.bind(TYPES.IAuthRepository).to(AuthRepository).inSingletonScope()
container.bind(TYPES.IInventoryRepository).to(InventoryRepository).inSingletonScope()
container.bind(TYPES.ICustomerRepository).to(CustomerRepository).inSingletonScope()
container.bind(TYPES.ISalesRepository).to(SalesRepository).inSingletonScope()

container.bind(TYPES.IVerifyLogin).to(VerifyLogin).inSingletonScope()
container.bind(TYPES.IGetAllProducts).to(GetAllProducts).inSingletonScope()
container.bind(TYPES.IAddProduct).to(AddProduct).inSingletonScope()
container.bind(TYPES.IEditProduct).to(EditProduct).inSingletonScope()
container.bind(TYPES.IDeleteProduct).to(DeleteProduct).inSingletonScope()
container.bind(TYPES.IAddCustomer).to(AddCustomer).inSingletonScope()
container.bind(TYPES.IGetAllCustomer).to(GetAllCustomers).inSingletonScope()
container.bind(TYPES.IEditCustomer).to(EditCustomer).inSingletonScope()
container.bind(TYPES.IDeleteCustomer).to(DeleteCustomer).inSingletonScope()
container.bind(TYPES.IAddNewSale).to(AddNewSale).inSingletonScope()
container.bind(TYPES.IGetAllSales).to(GetAllSales).inSingletonScope()
container.bind(TYPES.IDeleteSale).to(DeleteSale).inSingletonScope()
container.bind(TYPES.ISendReport).to(SendReport).inSingletonScope()

container.bind(TYPES.AuthController).to(AuthController).inSingletonScope()
container.bind(TYPES.InventoryController).to(InventoryController).inSingletonScope()
container.bind(TYPES.CustomerController).to(CustomerController).inSingletonScope()
container.bind(TYPES.SalesController).to(SalesController).inSingletonScope()

container.bind(TYPES.TokenHandler).to(TokenHandler).inSingletonScope()
container.bind(TYPES.JwtHandler).to(JwtHandler).inSingletonScope()

export default container