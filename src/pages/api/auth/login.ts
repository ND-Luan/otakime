import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { prisma } from "@/lib/prisma";
import {
  ACCESS_TOKEN_EXPIRE,
  ACCESS_TOKEN_COOKIE_MAX_AGE,
  REFRESH_TOKEN_EXPIRE,
  REFRESH_TOKEN_COOKIE_MAX_AGE,
} from "@/lib/auth_config";

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

  const { email, password, system } = req.body; // admin | client

  if (!email || !password || !system) {
    return res.status(400).json({
      IsSuccess: false,
      Message: "Missing required fields",
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });

    if (!user) {
      return res.status(401).json({
        IsSuccess: false,
        Message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        IsSuccess: false,
        Message: "Invalid email or password",
      });
    }

    const roleNames = user.roles.map((r) => r.role.name);

    if (system === "admin" && roleNames.length === 0) {
      return res.status(403).json({
        IsSuccess: false,
        Message: "You are not allowed to access admin system",
      });
    }

    const accessSecret =
      system === "admin"
        ? process.env.JWT_SECRET_ADMIN
        : process.env.JWT_SECRET_CLIENT;

    const refreshSecret =
      system === "admin"
        ? process.env.JWT_REFRESH_SECRET_ADMIN
        : process.env.JWT_REFRESH_SECRET_CLIENT;

    if (!accessSecret || !refreshSecret) {
      throw new Error("JWT secret not configured");
    }

    // 🔐 ACCESS TOKEN
    const accessToken = jwt.sign(
      {
        UserId: user.UserId,
        email: user.email,
        username: user.username,
        roles: roleNames,
        system,
      },
      accessSecret,
      { expiresIn: ACCESS_TOKEN_EXPIRE }
    );

    // 🔁 REFRESH TOKEN (JWT)
    const refreshToken = jwt.sign(
      {
        UserId: user.UserId,
        system,
      },
      refreshSecret,
      { expiresIn: REFRESH_TOKEN_EXPIRE }
    );

    const decodedRefresh: any = jwt.decode(refreshToken);

    // Xóa refresh cũ (1 device = 1 token)
    await prisma.refreshToken.deleteMany({
      where: { UserId: user.UserId },
    });

    // Lưu refresh mới
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        UserId: user.UserId,
        expiresAt: new Date(decodedRefresh.exp * 1000),
      },
    });

    // Cookie name
    const tokenCookie =
      system === "admin" ? "token_admin" : "token_client";

    const refreshCookie =
      system === "admin" ? "refresh_admin" : "refresh_client";

    res.setHeader("Set-Cookie", [
      cookie.serialize(tokenCookie, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
      }),
      cookie.serialize(refreshCookie, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
      }),
    ]);

    // Chuẩn hóa user trả về (loại password)
    const safeUser = {
      UserId: user.UserId,
      email: user.email,
      username: user.username,
      roles: roleNames,
    };

    return res.status(200).json({
      IsSuccess: true,
      Message: "Login successful",
      Data: safeUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      IsSuccess: false,
      Message: "Internal server error",
    });
  }
}
