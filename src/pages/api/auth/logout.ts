import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const cookies = cookie.parse(req.headers.cookie || "");
    const refreshToken = cookies.refreshToken;

    // 1️⃣ Xóa refresh token trong DB
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: {
          token: refreshToken,
        },
      });
    }

    // 2️⃣ Xóa cookie phía client
    res.setHeader("Set-Cookie", [
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: -1, // xoá cookie
      }),
      cookie.serialize("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: -1,
      }),
    ]);

    return res.status(200).json({
      IsSuccess: true,
      Message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      IsSuccess: false,
      Message: "Internal server error",
    });
  }
}
