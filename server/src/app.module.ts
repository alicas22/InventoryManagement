import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { InvoiceModule } from './invoice/invoice.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [AuthModule, InvoiceModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
