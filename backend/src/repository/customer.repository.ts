import { injectable } from "inversify";
import { Customer } from "../domain/entity/Customer";
import { ICustomerRepository } from "../domain/repository/ICustomerRepository";
import { CustomerModel } from "../models/customer.model";

@injectable()
export class CustomerRepository implements ICustomerRepository {
  async addCustomer(data: {
    name: string;
    address: string;
    phone: string;
  }): Promise<{ success: boolean; customer?: Customer }> {
    const existingCustomer = await CustomerModel.findOne({
      normalizedName: data.name.toLowerCase(),
    });
    if (existingCustomer) return { success: false };

    const newCustomer = await CustomerModel.insertOne({
      name: data.name,
      normalizedName: data.name.toLowerCase(),
      address: data.address,
      phone: data.phone,
    });

    const customer = new Customer(
      String(newCustomer._id),
      newCustomer.name,
      newCustomer.normalizedName,
      newCustomer.address,
      newCustomer.phone,
      newCustomer.isActive,
    );
    return { success: true, customer };
  }

  async getAllCustomers(page: number, limit: number): Promise<{customers: Customer[], totalPages: number}> {
    const customers = await CustomerModel.find().skip((page - 1) * limit).limit(limit);
    const totalCustomers = await CustomerModel.countDocuments();
    const totalPages = Math.ceil(totalCustomers / limit);

    return {
      customers: customers.map(
        (customer) =>
          new Customer(
            String(customer._id),
            customer.name,
            customer.normalizedName,
            customer.address,
            customer.phone,
            customer.isActive,
          ),
      ),
      totalPages,
    };
  }

  async getAllCustomersByQuery(query: string, page: number, limit: number): Promise<{customers: Customer[], totalPages: number}> {
    const customers = await CustomerModel.find({
      normalizedName: { $regex: query, $options: "i" },
    }).skip((page - 1) * limit).limit(limit);
    const totalCustomers = await CustomerModel.countDocuments({ normalizedName: { $regex: query, $options: "i" } });
    const totalPages = Math.ceil(totalCustomers / limit);

    return {
      customers: customers.map(
        (customer) =>
          new Customer(
            String(customer._id),
            customer.name,
            customer.normalizedName,
            customer.address,
            customer.phone,
            customer.isActive,
          ),
      ),
      totalPages,
    };
  }

  async editCustomer(
    data: { name: string; address: string; phone: string },
    id: string,
  ): Promise<{ success: boolean; customer?: Customer }> {
    const existingCustomer = await CustomerModel.findOne({
      normalizedName: data.name.toLowerCase(),
      _id: { $ne: id },
    });
    if (existingCustomer) return { success: false };

    const newCustomer = await CustomerModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: data.name,
          normalizedName: data.name.toLowerCase(),
          address: data.address,
          phone: data.phone,
        },
      },
      { new: true },
    );

    const customer = new Customer(
      String(newCustomer!._id),
      newCustomer!.name,
      newCustomer!.normalizedName,
      newCustomer!.address,
      newCustomer!.phone,
      newCustomer!.isActive,
    );
    return { success: true, customer };
  }

  async deleteCustomer(id: string): Promise<Customer> {
    const existingCustomer = await CustomerModel.findById(id);
    const newCustomer = await CustomerModel.findByIdAndUpdate(
      id,
      {
        $set: {
          isActive: !existingCustomer?.isActive,
        },
      },
      { new: true },
    );
    const product = new Customer(
      String(newCustomer!._id),
      newCustomer!.name,
      newCustomer!.normalizedName,
      newCustomer!.address,
      newCustomer!.phone,
      newCustomer!.isActive,
    );

    return product;
  }

  async findById(id: string): Promise<Customer> {
      const customer=await CustomerModel.findById(id)

      return new Customer (
        String(customer!._id),
        customer!.name,
        customer!.normalizedName,
        customer!.address,
        customer!.phone,
        customer!.isActive,
      )
  }
}
