import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const users = [
  {
    email: 'test@example.com',
    name: 'Test User',
    password: 'password',
  },
];

const invoices = [
  {
    vendor_name: 'Adobe Systems',
    amount: 52.99,
    due_date: new Date('2025-02-15'),
    description: 'Creative Cloud Monthly Subscription',
    paid: true,
  },
  {
    vendor_name: 'AWS',
    amount: 243.56,
    due_date: new Date('2025-02-01'),
    description: 'Cloud Infrastructure Services - January',
    paid: true,
  },
  {
    vendor_name: 'WeWork',
    amount: 450.0,
    due_date: new Date('2025-02-28'),
    description: 'Office Space Rental - February',
    paid: false,
  },
  {
    vendor_name: 'Microsoft',
    amount: 15.0,
    due_date: new Date('2025-02-10'),
    description: 'Office 365 Subscription',
    paid: true,
  },
  {
    vendor_name: 'Zoom',
    amount: 149.9,
    due_date: new Date('2025-02-20'),
    description: 'Annual Pro Subscription',
    paid: false,
  },
  {
    vendor_name: 'Dell',
    amount: 1299.99,
    due_date: new Date('2025-01-30'),
    description: 'XPS 13 Laptop',
    paid: true,
  },
  {
    vendor_name: 'Slack',
    amount: 8.0,
    due_date: new Date('2025-02-05'),
    description: 'Monthly Workspace Subscription',
    paid: true,
  },
  {
    vendor_name: 'Google Cloud',
    amount: 178.23,
    due_date: new Date('2025-02-15'),
    description: 'Cloud Services - January',
    paid: false,
  },
  {
    vendor_name: 'DigitalOcean',
    amount: 40.0,
    due_date: new Date('2025-02-01'),
    description: 'Cloud Hosting - Basic Droplet',
    paid: true,
  },
  {
    vendor_name: 'GitHub',
    amount: 21.0,
    due_date: new Date('2025-02-10'),
    description: 'Team Plan Monthly',
    paid: true,
  },
  {
    vendor_name: 'Notion',
    amount: 15.0,
    due_date: new Date('2025-02-28'),
    description: 'Team Workspace Monthly',
    paid: false,
  },
  {
    vendor_name: 'LogMeIn',
    amount: 349.99,
    due_date: new Date('2025-03-15'),
    description: 'Annual Remote Access License',
    paid: false,
  },
  {
    vendor_name: 'Mailchimp',
    amount: 74.99,
    due_date: new Date('2025-02-20'),
    description: 'Email Marketing Service - Standard Plan',
    paid: true,
  },
  {
    vendor_name: 'Atlassian',
    amount: 10.0,
    due_date: new Date('2025-02-25'),
    description: 'Jira Software Cloud',
    paid: false,
  },
  {
    vendor_name: 'DocuSign',
    amount: 45.0,
    due_date: new Date('2025-02-28'),
    description: 'eSignature Business Plan',
    paid: true,
  },
  {
    vendor_name: 'Cloudflare',
    amount: 20.0,
    due_date: new Date('2025-02-15'),
    description: 'Pro Website Security Plan',
    paid: true,
  },
  {
    vendor_name: 'Twilio',
    amount: 156.78,
    due_date: new Date('2025-02-10'),
    description: 'SMS API Services',
    paid: false,
  },
  {
    vendor_name: 'Dropbox',
    amount: 19.99,
    due_date: new Date('2025-02-05'),
    description: 'Plus Storage Plan',
    paid: true,
  },
  {
    vendor_name: 'LastPass',
    amount: 48.0,
    due_date: new Date('2025-03-01'),
    description: 'Teams Annual Subscription',
    paid: false,
  },
  {
    vendor_name: 'Canva',
    amount: 12.99,
    due_date: new Date('2025-02-28'),
    description: 'Pro Subscription Monthly',
    paid: true,
  },
];

async function main() {
  await prisma.invoice.deleteMany();
  await prisma.user.deleteMany();

  const createdUsers = await Promise.all(
    users.map(async (user) => {
      return prisma.user.create({
        data: {
          ...user,
          password: await bcrypt.hash(user.password, 10),
        },
      });
    }),
  );

  await Promise.all(
    invoices.map(async (invoice) => {
      return prisma.invoice.create({
        data: {
          ...invoice,
          user_id: createdUsers[0].id,
        },
      });
    }),
  );

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
