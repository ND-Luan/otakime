import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import type { IApiResponse, IPagination } from "@/types/response";
import { sendError, sendSuccess } from "@/utils/response_util";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<{ items: any[]; pagination: IPagination }>>
) {
  console.log(prisma);
  switch (req.method) {
    case "GET": {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const search = (req.query.search as string) || "";

      const where = search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" } },
              { author: { contains: search, mode: "insensitive" } },
            ],
          }
        : {};

      try {
        const [total, mangas] = await Promise.all([
          prisma.manga.count({ where }),
          prisma.manga.findMany({
            where,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: "desc" },
            include: {
              genres: { include: { genre: true } },
              chapters: true,
              favorites: true,
            },
          }),
        ]);
        const pagination: IPagination = {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        };
        sendSuccess(
          res,
          { items: mangas, pagination },
          "Lấy danh sách manga thành công"
        );
      } catch {
        sendError(res, "Lỗi server khi lấy danh sách manga.", {
          items: [],
          pagination: { total: 0, page, pageSize, totalPages: 0 },
        });
      }
      break;
    }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
