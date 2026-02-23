"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  AlertCircle,
  User,
} from "lucide-react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import SalesReportTable from "../components/table/salesReportTable.tsx";
import ExportButtons from "../components/ui/exportButtons.tsx";
import ItemsTable from "../components/table/itemsTable.tsx";
import LedgerTable from "../components/table/ledgerTable.tsx";
import { getAllCustomers } from "../services/customerService";
import { getAllProducts } from "../services/inventoryService";
import { getSales, sendEmail } from "../services/salesService";
import { enqueueSnackbar } from "notistack";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Sale = {
    _id?:string,
    date:Date,
    productId:string,
    customerId:string,
    quantity:number,
    pricePerUnit:number,
    totalAmount:number
}

type ProductDetails = {
    _id:string,
    productName:string
}

type CustomerDetails = {
    _id:string,
    customerName:string
}

type SaleData = Sale & {
    productDetails:ProductDetails,
    customerDetails?:CustomerDetails
}

type Product = {
  _id?: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  createdAt?: Date;
};

type Customer = {
  _id?: string;
  name: string;
  address: string;
  phone: string;
};

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("sales");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState("all");
  const [selectedCustomerLedger, setSelectedCustomerLedger] = useState("");

  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allSales, setAllSales] = useState<SaleData[]>([]);

  useEffect(() => {
    const getCustomers = async () => {
      const customers = await getAllCustomers("");
      setAllCustomers(customers.result);
    };

    const fetchProducts = async () => {
      const products = await getAllProducts("");
      setAllProducts(products.result);
    };

    const getAllSales = async () => {
      const sales = await getSales();
      setAllSales(sales.result);
    };

    getAllSales();
    fetchProducts();
    getCustomers();
  }, []);

  const filteredSalesData = allSales.filter((sale) => {
    const saleDate = new Date(sale.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const matchesFrom = !from || saleDate >= from;
    const matchesTo = !to || saleDate <= to;
    const productMatch =
      selectedProduct === "all" || sale.productDetails.productName === selectedProduct;
    const customerMatch =
      selectedCustomer === "all" || sale.customerDetails?.customerName === selectedCustomer;
    return matchesFrom && matchesTo && productMatch && customerMatch;
  });

  let allProductsTotal = 0;
  allProducts.forEach((product) => {
    const total = product.quantity * product.price;
    allProductsTotal += total;
  });

  let customerLedgerData = null;
  let customerName = null;
  if (selectedCustomerLedger) {
    const customer = allCustomers.find(
      (customer) => customer._id == selectedCustomerLedger,
    );
    // setSelectedCustomer(customer.name)
    customerName = customer?.name;
    customerLedgerData = allSales.filter(
      (sale) => sale.customerDetails?.customerName == customer?.name,
    );
  }
  const totalPurchased =
    customerLedgerData &&
    customerLedgerData.reduce((sum, item) => sum + item.totalAmount, 0);

  const handleFilter = () => {
    // Filter is applied dynamically
  };

  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");
    setSelectedProduct("all");
    setSelectedCustomer("all");
  };

  const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const handleExport = async (format: string) => {
    if (format == "excel") {
      if (activeTab == "sales") {
        const formattedData = filteredSalesData.map((sale) => ({
          Date: new Date(sale.date).toLocaleDateString(),
          "Product Name": sale.productDetails.productName,
          "Customer Name": sale.customerDetails?.customerName || "Cash Sale",
          Quantity: sale.quantity,
          "Price per Unit": sale.pricePerUnit,
          "Total Amount": sale.quantity * sale.pricePerUnit,
        }));
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales report");
        XLSX.writeFile(workbook, "sales-report.xlsx");
      } else if (activeTab == "items") {
        const formattedData = allProducts.map((product) => ({
          "Product Name": product.name,
          "Current Stock": product.quantity,
          "Price per Unit": product.price,
          "Total Value": product.quantity * product.price,
        }));
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales report");
        XLSX.writeFile(workbook, "product-report.xlsx");
      } else if (activeTab == "ledger") {
        const formattedData = customerLedgerData!.map((customer) => ({
          Date: new Date(customer.date).toLocaleDateString(),
          "Product Name": customer.productDetails.productName,
          Quantity: customer.quantity,
          "Total Amount": customer.quantity * customer.pricePerUnit,
        }));
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales report");
        XLSX.writeFile(workbook, `${customerName}-report.xlsx`);
      }
    } else if (format == "pdf") {
      if (activeTab == "sales") {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Sales Report", 14, 15);

        const tableData = filteredSalesData.map((sale) => [
          new Date(sale.date).toLocaleDateString(),
          sale.productDetails.productName,
          sale.customerDetails?.customerName || "Cash Sale",
          sale.quantity,
          sale.pricePerUnit,
          sale.quantity * sale.pricePerUnit,
        ]);

        autoTable(doc, {
          startY: 25,
          head: [
            [
              "Date",
              "Product name",
              "Customer name",
              "Quantity",
              "Price per unit",
              "Total Amount",
            ],
          ],
          body: tableData,
        });

        doc.save("sales-report.pdf");
      } else if (activeTab == "items") {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Product Report", 14, 15);

        const tableData = allProducts.map((product) => [
          product.name,
          product.quantity,
          product.price,
          product.quantity * product.price,
        ]);

        autoTable(doc, {
          startY: 25,
          head: [["Product name", "Quantity", "Price per unit", "Total Value"]],
          body: tableData,
        });

        doc.save("product-report.pdf");
      } else if (activeTab == "ledger") {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`${customerName} - Ledger Report`, 14, 15);

        const tableData = customerLedgerData!.map((sale) => [
          new Date(sale.date).toLocaleDateString(),
          sale.productDetails.productName,
          sale.quantity,
          sale.quantity * sale.pricePerUnit,
        ]);

        autoTable(doc, {
          startY: 25,
          head: [["Date", "Product name", "Quantity", "Total Amount"]],
          body: tableData,
        });

        doc.save(`${customerName}-ledger-report.pdf`);
      }
    } else if (format == "email") {
      if (activeTab == "sales") {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Sales Report", 14, 15);

        const tableData = filteredSalesData.map((sale) => [
          new Date(sale.date).toLocaleDateString(),
          sale.productDetails.productName,
          sale.customerDetails?.customerName || "Cash Sale",
          sale.quantity,
          sale.pricePerUnit,
          sale.quantity * sale.pricePerUnit,
        ]);

        autoTable(doc, {
          startY: 25,
          head: [
            [
              "Date",
              "Product name",
              "Customer name",
              "Quantity",
              "Price per unit",
              "Total Amount",
            ],
          ],
          body: tableData,
        });

        const pdfBlob = doc.output("blob");

        const base64PDF = await blobToBase64(pdfBlob);

        try {
          await sendEmail(base64PDF);
          enqueueSnackbar("Mail send successfully", { variant: "success" });
        } catch (error) {
          if (error instanceof Error) {
            enqueueSnackbar(error.message, { variant: "error" });
          } else {
            enqueueSnackbar("Something went wrong", { variant: "error" });
          }
        }
      } else if (activeTab == "items") {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Product Report", 14, 15);

        const tableData = allProducts.map((product) => [
          product.name,
          product.quantity,
          product.price,
          product.quantity * product.price,
        ]);

        autoTable(doc, {
          startY: 25,
          head: [["Product name", "Quantity", "Price per unit", "Total Value"]],
          body: tableData,
        });

        const pdfBlob = doc.output("blob");

        const base64PDF = await blobToBase64(pdfBlob);

        try {
          await sendEmail(base64PDF);
          enqueueSnackbar("Mail send successfully", { variant: "success" });
        } catch (error) {
          if (error instanceof Error) {
            enqueueSnackbar(error.message, { variant: "error" });
          } else {
            enqueueSnackbar("Something went wrong", { variant: "error" });
          }
        }
      } else if (activeTab == "ledger") {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`${customerName} - Ledger Report`, 14, 15);

        const tableData = customerLedgerData!.map((sale) => [
          new Date(sale.date).toLocaleDateString(),
          sale.productDetails.productName,
          sale.quantity,
          sale.quantity * sale.pricePerUnit,
        ]);

        autoTable(doc, {
          startY: 25,
          head: [["Date", "Product name", "Quantity", "Total Amount"]],
          body: tableData,
        });

        const pdfBlob = doc.output("blob");

        const base64PDF = await blobToBase64(pdfBlob);

        try {
          await sendEmail(base64PDF);
          enqueueSnackbar("Mail send successfully", { variant: "success" });
        } catch (error) {
          if (error instanceof Error) {
            enqueueSnackbar(error.message, { variant: "error" });
          } else {
            enqueueSnackbar("Something went wrong", { variant: "error" });
          }
        }
      }
    }
  };

  return (
    <div className="bg-slate-950 print:p-0 print:w-full print:bg-white print:text-black shadow-lg print:shadow-none">
      <Sidebar />
      <Navbar />
      <div className="md:ml-64 md:pt-16 min-h-screen p-4 md:p-8">
        {/* Page Title */}
        <div className="mb-8 mt-8 md:mt-5 print:hidden">
          <h1 className="text-3xl font-bold text-white print:text-black mb-2">
            Reports
          </h1>
          <p className="text-slate-400">
            View and export detailed business reports
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-slate-700 print:hidden">
          <button
            onClick={() => setActiveTab("sales")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors duration-200 ${
              activeTab === "sales"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            Sales Report
          </button>
          <button
            onClick={() => setActiveTab("items")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors duration-200 ${
              activeTab === "items"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            Item Report
          </button>
          <button
            onClick={() => setActiveTab("ledger")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors duration-200 ${
              activeTab === "ledger"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            Customer Ledger
          </button>
        </div>

        {/* Sales Report Tab */}
        {activeTab === "sales" && (
          <div>
            {/* Filter Section */}
            <div className="bg-slate-900 rounded-lg p-6 mb-6 border border-slate-800 print:hidden">
              <h3 className="text-lg font-semibold text-white print:text-black mb-4">
                Filters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* From Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => {
                      if (toDate && e.target.value > toDate) {
                        return enqueueSnackbar(
                          "Start date should not be greater than end date",
                          { variant: "error" },
                        );
                      }
                      setFromDate(e.target.value);
                    }}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white print:text-black focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* To Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => {
                      if (fromDate && fromDate > e.target.value) {
                        return enqueueSnackbar(
                          "End date should not be less than start date",
                          { variant: "error" },
                        );
                      }
                      setToDate(e.target.value);
                    }}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white print:text-black focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Product Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Product
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white print:text-black focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Products</option>
                    {allProducts.map((product) => (
                      <option key={product._id} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Customer Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Customer
                  </label>
                  <select
                    value={selectedCustomer}
                    onChange={(e) => setSelectedCustomer(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white print:text-black focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Customers</option>
                    {allCustomers.map((customer) => (
                      <option key={customer._id} value={customer.name}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleFilter}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white print:text-black rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  Filter
                </button>
                <button
                  onClick={handleClearFilter}
                  className="px-6 py-2 bg-slate-800 text-white print:text-black rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Export Buttons */}
            <ExportButtons handleExport={handleExport} />

            {/* Sales Table */}
            <SalesReportTable filteredSalesData={filteredSalesData} />

            {/* Summary Cards */}
            {filteredSalesData.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6 print:border-black">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">
                        Total Sales Amount
                      </p>
                      <p className="text-2xl font-bold text-white print:text-black">
                        $
                        {filteredSalesData
                          .reduce((sum, sale) => sum + sale.totalAmount, 0)
                          .toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-blue-500/20 p-3 rounded-lg">
                      <TrendingUp size={24} className="text-blue-400" />
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-6 print:border-black">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">
                        Total Quantity Sold
                      </p>
                      <p className="text-2xl font-bold text-white print:text-black">
                        {filteredSalesData.reduce(
                          (sum, sale) => sum + sale.quantity,
                          0,
                        )}
                      </p>
                    </div>
                    <div className="bg-purple-500/20 p-3 rounded-lg">
                      <Package size={24} className="text-purple-400" />
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-6 print:border-black">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">
                        Number of Transactions
                      </p>
                      <p className="text-2xl font-bold text-white print:text-black">
                        {filteredSalesData.length}
                      </p>
                    </div>
                    <div className="bg-cyan-500/20 p-3 rounded-lg">
                      <ShoppingCart size={24} className="text-cyan-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Item Report Tab */}
        {activeTab === "items" && (
          <div>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl p-6 print:border-black">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Total Items</p>
                    <p className="text-2xl font-bold text-white print:text-black">
                      {allProducts.length}
                    </p>
                  </div>
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Package size={24} className="text-blue-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-6 print:border-black">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">
                      Total Stock Value
                    </p>
                    <p className="text-2xl font-bold text-white print:text-black">
                      $ {allProductsTotal}
                    </p>
                  </div>
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <TrendingUp size={24} className="text-green-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-6 print:border-black">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">
                      Low Stock Items
                    </p>
                    <p className="text-2xl font-bold text-white print:text-black">
                      {allProducts.filter((item) => item.quantity <= 3).length}
                    </p>
                  </div>
                  <div className="bg-red-500/20 p-3 rounded-lg">
                    <AlertCircle size={24} className="text-red-400" />
                  </div>
                </div>
              </div>
            </div>

            <ExportButtons handleExport={handleExport} />

            {/* Items Table */}
            <ItemsTable itemsData={allProducts} />
          </div>
        )}

        {/* Customer Ledger Tab */}
        {activeTab === "ledger" && (
          <div>
            {/* Customer Selection */}
            <div className="bg-slate-900 rounded-lg p-6 mb-6 border border-slate-800 print:hidden">
              <label className="block text-sm font-medium text-slate-300 mb-3">
                Select Customer
              </label>
              <select
                value={selectedCustomerLedger}
                onChange={(e) => setSelectedCustomerLedger(e.target.value)}
                className="w-full md:w-64 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white print:text-black focus:outline-none focus:border-blue-500"
              >
                <option value="">Choose a customer...</option>
                {allCustomers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCustomerLedger && (
              <>
                {/* Export Buttons */}
                <ExportButtons handleExport={handleExport} />

                {/* Ledger Table */}
                <LedgerTable customerLedgerData={customerLedgerData} />

                {/* Total Amount Purchased */}
                {customerLedgerData!.length > 0 && (
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-slate-700 rounded-xl p-6 print:border-black">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm mb-1">
                          Total Amount Purchased
                        </p>
                        <p className="text-3xl font-bold text-white print:text-black">
                          ${totalPurchased?.toLocaleString()}
                        </p>
                        <p className="text-slate-400 text-sm mt-2">
                          Customer: {customerName}
                        </p>
                      </div>
                      <div className="bg-blue-500/20 p-4 rounded-lg">
                        <User size={32} className="text-blue-400" />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
