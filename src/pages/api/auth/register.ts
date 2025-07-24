import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
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

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    response.Message = "Username, email and password are required";
    return res.status(400).json(response);
  }

  try {
    // Kiểm tra email hoặc username đã tồn tại chưa
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      response.Message = "Email or username already exists";
      return res.status(409).json(response);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
      select: {
        UserId: true,
        username: true,
        email: true,
        password: true,
        createdAt: true,
        createdUserId: true,
        updatedAt: true,
        updatedUserId: true,
        RoleId: true,
      },
    });

    response.IsSuccess = true;
    response.Message = "Register successful";
    response.Data = user;
    return res.status(201).json(response);
  } catch (error) {
    response.Message = "Server error";
    return res.status(500).json(response);
  }
}
