import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { IApiResponse } from "@/types/response";
import { prisma } from "@/lib/prisma";

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

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    response.Message = "Username, email and password are required";
    return res.status(400).json(response);
  }

  try {
    // 🔎 Check tồn tại
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      response.Message = "Email or username already exists";
      return res.status(409).json(response);
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔎 Lấy role mặc định
    const defaultRole = await prisma.role.findUnique({
      where: { name: "User" }, // 👈 phải tồn tại sẵn trong DB
    });

    if (!defaultRole) {
      response.Message = "Default role not found";
      return res.status(500).json(response);
    }

    // 🧱 Tạo user + gán role trong transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      await tx.userRole.create({
        data: {
          UserId: user.UserId,
          RoleId: defaultRole.RoleId,
        },
      });

      return user;
    });

    response.IsSuccess = true;
    response.Message = "Register successful";
    response.Data = {
      UserId: newUser.UserId,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error("Register error:", error);
    response.Message = "Server error";
    return res.status(500).json(response);
  }
}
