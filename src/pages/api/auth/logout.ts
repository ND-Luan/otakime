import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      IsSuccess: false,
      Message: "Method not allowed",
    });
  }

  try {
    const cookies = cookie.parse(req.headers.cookie || "");

    const tokenAdmin = cookies.token_admin;
    const tokenClient = cookies.token_client;

    const refreshAdmin = cookies.refreshToken_admin;
    const refreshClient = cookies.refreshToken_client;

    const token = tokenAdmin || tokenClient;
    const refreshToken = refreshAdmin || refreshClient;

    let system: "admin" | "client" | null = null;

    if (token) {
      const decoded: any = jwt.decode(token);
      system = decoded?.system || null;
    }

    // 🔥 1️⃣ Revoke refresh token trong DB
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: {
          token: refreshToken,
        },
      });
    }

    // 🔥 2️⃣ Clear cookies đúng hệ
    const cookiesToClear = [];

    if (system === "admin") {
      cookiesToClear.push(
        cookie.serialize("token_admin", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: -1,
        }),
        cookie.serialize("refreshToken_admin", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: -1,
        })
      );
    } else if (system === "client") {
      cookiesToClear.push(
        cookie.serialize("token_client", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: -1,
        }),
        cookie.serialize("refreshToken_client", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: -1,
        })
      );
    } else {
      // Nếu không decode được system thì clear cả 2 cho chắc
      cookiesToClear.push(
        cookie.serialize("token_admin", "", {
          path: "/",
          maxAge: -1,
        }),
        cookie.serialize("refreshToken_admin", "", {
          path: "/",
          maxAge: -1,
        }),
        cookie.serialize("token_client", "", {
          path: "/",
          maxAge: -1,
        }),
        cookie.serialize("refreshToken_client", "", {
          path: "/",
          maxAge: -1,
        })
      );
    }

    res.setHeader("Set-Cookie", cookiesToClear);

    return res.status(200).json({
      IsSuccess: true,
      Message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      IsSuccess: false,
      Message: "Internal server error",
    });
  }
}
