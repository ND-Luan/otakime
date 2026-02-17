import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import crypto from "crypto";
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

  try {
    const cookies = cookie.parse(req.headers.cookie || "");

    const refreshToken =
      cookies.refresh_admin || cookies.refresh_client;

    if (!refreshToken) {
      return res.status(401).json({
        IsSuccess: false,
        Message: "Refresh token not found",
      });
    }

    console.log("Received refresh token:", refreshToken);
    // Decode trước để biết system
    const decodedRaw = jwt.decode(refreshToken) as jwt.JwtPayload;

    console.log("decodedRaw", decodedRaw);
    if (!decodedRaw?.system) {
      return res.status(401).json({
        IsSuccess: false,
        Message: "Invalid refresh token structure",
      });
    }

    const system = decodedRaw.system;

    const refreshSecret =
      system === "admin"
        ? process.env.JWT_REFRESH_SECRET_ADMIN
        : process.env.JWT_REFRESH_SECRET_CLIENT;

    const accessSecret =
      system === "admin"
        ? process.env.JWT_SECRET_ADMIN
        : process.env.JWT_SECRET_CLIENT;

    if (!refreshSecret || !accessSecret) {
      throw new Error("JWT secret not configured");
    }

    // 🔐 VERIFY JWT
    let decoded: any;

    try {
      decoded = jwt.verify(refreshToken, refreshSecret);
    } catch (err) {
      return res.status(401).json({
        IsSuccess: false,
        Message: "Invalid refresh token",
      });
    }

    // 🔥 Check type
    if (decoded.type !== "refresh") {
      return res.status(401).json({
        IsSuccess: false,
        Message: "Invalid token type",
      });
    }

    // 🔎 Check DB
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!storedToken) {
      return res.status(401).json({
        IsSuccess: false,
        Message: "Refresh token revoked",
      });
    }

    // 🔎 Check hết hạn DB
    if (storedToken.expiresAt < new Date()) {
      return res.status(401).json({
        IsSuccess: false,
        Message: "Refresh token expired",
      });
    }

    // Lấy user
    const user = await prisma.user.findUnique({
      where: { UserId: decoded.UserId },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });

    if (!user) {
      return res.status(404).json({
        IsSuccess: false,
        Message: "User not found",
      });
    }

    const roleNames = user.roles.map((r) => r.role.name);

    // ===== ROTATION =====
    await prisma.refreshToken.delete({
      where: { token: refreshToken },
    });

    const newRefreshToken = jwt.sign(
      {
        UserId: user.UserId,
        system,
        type: "refresh",
        jti: crypto.randomUUID(),
      },
      refreshSecret,
      { expiresIn: REFRESH_TOKEN_EXPIRE }
    );

    const decodedNew = jwt.decode(newRefreshToken) as jwt.JwtPayload;

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        UserId: user.UserId,
        expiresAt: new Date(decodedNew!.exp! * 1000),
      },
    });

    const newAccessToken = jwt.sign(
      {
        UserId: user.UserId,
        email: user.email,
        username: user.username,
        roles: roleNames,
        system,
        type: "access",
      },
      accessSecret,
      { expiresIn: ACCESS_TOKEN_EXPIRE }
    );

    // Set lại cookie
    res.setHeader("Set-Cookie", [
      cookie.serialize(`token_${system}`, newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: ACCESS_TOKEN_COOKIE_MAX_AGE,
      }),
      cookie.serialize(`refresh_${system}`, newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE,
      }),
    ]);

    return res.status(200).json({
      IsSuccess: true,
      Message: "Token refreshed successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      IsSuccess: false,
      Message: "Internal server error",
    });
  }
}
