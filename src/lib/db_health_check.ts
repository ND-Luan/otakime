import { prisma } from './prisma';

export async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Thử query đơn giản
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    console.log('✅ Database query test:', result);
    
    return true;
  } catch (error: any) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Connection details:', {
      host: process.env.DATABASE_URL?.match(/sqlserver:\/\/([^;]+)/)?.[1],
      database: process.env.DATABASE_URL?.match(/database=([^;]+)/)?.[1],
    });
    return false;
  }
}