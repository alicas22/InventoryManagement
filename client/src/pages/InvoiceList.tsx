import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import InvoiceModal from "../components/InvoiceModal";
import { Invoice, invoiceApi } from "../types";

const InvoiceList: React.FC = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ["invoices"],
    queryFn: invoiceApi.getInvoices,
  });

  const { data: selectedInvoiceData, isLoading: isLoadingDetails } = useQuery({
    queryKey: ["invoice", selectedInvoice?.id],
    queryFn: () =>
      selectedInvoice ? invoiceApi.getInvoiceById(selectedInvoice.id) : null,
    enabled: !!selectedInvoice,
  });

  const handleRowClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load invoices
      </div>
    );
  }

  return (
    <div className="p-6 mt-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
      </div>
      <TableContainer component={Paper} className="shadow-card rounded-xl overflow-hidden border border-gray-200">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" className="bg-table-header border-r border-gray-300">
                <Checkbox size="small" />
              </TableCell>
              <TableCell className="bg-table-header font-medium text-gray-700 border-r border-gray-300">Date</TableCell>
              <TableCell className="bg-table-header font-medium text-gray-700 border-r border-gray-300">Payee</TableCell>
              <TableCell className="bg-table-header font-medium text-gray-700 border-r border-gray-300">Description</TableCell>
              <TableCell className="bg-table-header font-medium text-gray-700 border-r border-gray-300">Due Date</TableCell>
              <TableCell className="bg-table-header font-medium text-gray-700 border-r border-gray-300">Amount</TableCell>
              <TableCell className="bg-table-header font-medium text-gray-700">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices?.map((invoice) => (
              <TableRow
                key={invoice.id}
                onClick={() => handleRowClick(invoice)}
                className="cursor-pointer hover:bg-gray-50"
              >
                <TableCell padding="checkbox" className="py-4 border-r border-gray-200">
                  <Checkbox
                    size="small"
                    onClick={(e) => e.stopPropagation()}
                  />
                </TableCell>
                <TableCell className="py-4 border-r border-gray-200">{new Date(invoice.due_date).toLocaleDateString()}</TableCell>
                <TableCell className="py-4 border-r border-gray-200">{invoice.vendor_name}</TableCell>
                <TableCell className="py-4 border-r border-gray-200">{invoice.description}</TableCell>
                <TableCell className="py-4 border-r border-gray-200">{new Date(invoice.due_date).toLocaleDateString()}</TableCell>
                <TableCell className="py-4 border-r border-gray-200">${invoice.amount.toFixed(2)}</TableCell>
                <TableCell className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      invoice.paid
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {invoice.paid ? "Paid" : "Open"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <InvoiceModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedInvoice(null);
        }}
        invoice={isLoadingDetails || !selectedInvoiceData ? null : selectedInvoiceData}
      />
    </div>
  );
};

export default InvoiceList;
