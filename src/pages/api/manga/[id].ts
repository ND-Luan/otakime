import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      // Lấy chi tiết post
      try {
        const post = await prisma.manga.findUnique({
          where: { id: String(id) },
        });
        if (!post)
          return res.status(404).json({ error: "Không tìm thấy post." });
        res.status(200).json(post);
      } catch {
        res.status(500).json({ error: "Lỗi server." });
      }
      break;
    case "PUT":
      // Cập nhật post
      try {
        const { title, content } = req.body;
        const post = await prisma.manga.update({
          where: { id: String(id) },
          data: { title, content },
        });
        res.status(200).json(post);
      } catch {
        res.status(500).json({ error: "Lỗi server khi cập nhật post." });
      }
      break;
    case "DELETE":
      // Xóa post
      try {
        await prisma.manga.delete({ where: { id: String(id) } });
        res.status(204).end();
      } catch {
        res.status(500).json({ error: "Lỗi server khi xóa post." });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
