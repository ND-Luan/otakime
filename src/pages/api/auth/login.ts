import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { IApiResponse } from "@/types/response";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response: IApiResponse<User> = {
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

    // Tạo JWT token
    const token = jwt.sign(
      { UserId: user.UserId, email: user.email, username: user.username },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    // Set HTTP-only cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    );

    response.IsSuccess = true;
    response.Message = "Login successful";
    response.Data = user;
    
    return res.status(200).json(response);
  } catch (error) {
    response.Message = error!.toString();
    return res.status(500).json(response);
  }
}
