import { z } from 'zod';

export const invoiceSchema = z.object({
  id: z.number(),
  vendor_name: z.string(),
  amount: z.number(),
  due_date: z.string(),
  description: z.string(),
  paid: z.boolean()
});

export type Invoice = z.infer<typeof invoiceSchema>;
export const invoiceArraySchema = z.array(invoiceSchema);

export const invoiceApi = {
  getInvoices: async () => {
    const response = await fetch('http://localhost:3000/invoices', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch invoices');
    const data = await response.json();
    return invoiceArraySchema.parse(data);
  },

  getInvoiceById: async (id: number) => {
    const response = await fetch(`http://localhost:3000/invoices/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch invoice details');
    const data = await response.json();
    return invoiceSchema.parse(data);
  }
};
