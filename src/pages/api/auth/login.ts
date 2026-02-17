import {
  ACCESS_TOKEN_EXPIRE,
  REFRESH_TOKEN_COOKIE_MAX_AGE
} from "@/lib/auth_config";
import { prisma } from "@/lib/prisma";
import { IApiResponse } from "@/types/response";
import bcrypt from "bcryptjs";
import cookie from "cookie";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response: IApiResponse<any> = {
    IsSuccess: false,
    Message: "",
    Data: null,
  };

  if (req.method !== "POST") {
    response.Message = "Method not allowed";
    return res.status(405).json(response);
  }

  const { email, password } = req.body;

  if (!email || !password) {
    response.Message = "Email and password are required";
    return res.status(400).json(response);
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });

    if (!user) {
      response.Message = "Invalid email or password";
      return res.status(401).json(response);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      response.Message = "Invalid email or password";
      return res.status(401).json(response);
    }

    if (!process.env.JWT_SECRET_CLIENT) {
      throw new Error("JWT_SECRET_CLIENT is not defined");
    }

    // 🔐 Access token
    const accessToken = jwt.sign(
      {
        UserId: user.UserId,
        email: user.email,
        username: user.username,
        RoleId: user.RoleId,
      },
      process.env.JWT_SECRET_CLIENT,
      { expiresIn: ACCESS_TOKEN_EXPIRE }
    );

    // 🔁 Refresh token
    const refreshToken = crypto.randomBytes(40).toString("hex");

    const refreshExpire = new Date(
      Date.now() + REFRESH_TOKEN_COOKIE_MAX_AGE * 1000
    );

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        UserId: user.UserId,
        expiresAt: refreshExpire,
      },
    });

    // 🍪 Set cookies
    res.setHeader("Set-Cookie", [
      cookie.serialize("token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      }),
      cookie.serialize("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }),
    ]);

    // ❌ Loại bỏ password
    const { password: _, ...safeUser } = user;

    response.IsSuccess = true;
    response.Message = "Login successful";
    response.Data = safeUser;

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    response.Message = "Internal server error";
    return res.status(500).json(response);
  }
}
