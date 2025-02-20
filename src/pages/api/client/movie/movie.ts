// pages/api/products.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "@/lib/sql_server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const pool = await getConnection();

    // Thực hiện truy vấn
    const result = await pool.request().query("SELECT * FROM Products");

    // Trả về dữ liệu
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
}
