import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    const invoices = await this.prisma.invoice.findMany({
      where: {
        user_id: userId,
      },
    });

    if (!invoices.length) {
      throw new NotFoundException('No invoices found for this user');
    }

    return invoices;
  }

  async findOne(id: number, userId: number) {
    const invoice = await this.prisma.invoice.findFirst({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!invoice) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
    }

    return invoice;
  }
}
