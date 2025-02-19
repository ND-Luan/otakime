import sql, { ConnectionPool, config as SqlConfig } from "mssql";

// Định nghĩa cấu hình kết nối SQL Server
const config: SqlConfig = {
  user: process.env.SQLSERVER_USER || "", // Tên người dùng
  password: process.env.SQLSERVER_PASSWORD || "", // Mật khẩu
  server: process.env.SQLSERVER_HOST || "", // Địa chỉ server (ví dụ: localhost hoặc IP)
  database: process.env.SQLSERVER_DATABASE || "", // Tên database
  options: {
    encrypt: true, // Nếu sử dụng Azure SQL, cần bật encrypt
    trustServerCertificate: true, // Nếu chạy trên localhost, bật tùy chọn này để tránh lỗi SSL
  },
};

// Biến lưu trữ kết nối ConnectionPool
let pool: ConnectionPool | null = null;

// Hàm kết nối tới SQL Server
export async function getConnection(): Promise<ConnectionPool> {
  if (!pool) {
    try {
      pool = await sql.connect(config);
      console.log("Kết nối SQL Server thành công!");
    } catch (error) {
      console.error("Lỗi kết nối SQL Server:", error);
      throw error;
    }
  }
  return pool;
}
