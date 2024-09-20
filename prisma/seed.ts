import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: 'admin', code: 'admin' },
    { name: 'store_manager', code: 'store_manager' },
    { name: 'stock_manager', code: 'stock_manager' },
    { name: 'production_manager', code: 'production_manager' },
    { name: 'delivery_manager', code: 'delivery_manager' },
    { name: 'user', code: 'user' },
  ];

  const defaultUser = {
    emp_id: "EMP_01",
    name: "Isuru Sandaruwan",
    mobile: "0770414689",
    email: "isuru1302@gmail.com",
    address: "No 196, Kudagoda, Horampella",
    role: ["admin"],
    status: true,
    password: process.env.DEFAULT_PASSWORD,
    tmp_password: null,
    pin_code: '2222',
    login_attempts: 0,
  }

  if(defaultUser){
    await prisma.users.upsert({
      where: { mobile: defaultUser.mobile },
      update: {},
      create: defaultUser,
    })
  }

  for (const role of roles) {
    await prisma.role.upsert({
      where: { code: role.code },  
      update: {},
      create: {
        name: role.name,
        code: role.code,
        status: true,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });