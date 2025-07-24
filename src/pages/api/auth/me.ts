import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
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

  if (req.method !== "GET") {
    response.Message = "Method not allowed";
    return res.status(405).json(response);
  }

  const cookies = req.headers.cookie;
  if (!cookies) {
    response.Message = "Not authenticated";
    return res.status(401).json(response);
  }

  const { token } = cookie.parse(cookies);

  if (!token) {
    response.Message = "Not authenticated";
    return res.status(401).json(response);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      UserId: number;
      email: string;
      username: string;
    };

    const user = await prisma.user.findUnique({
      where: { UserId: decoded.UserId },
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

    if (!user) {
      response.Message = "User not found";
      return res.status(404).json(response);
    }

    response.IsSuccess = true;
    response.Message = "Get user successful";
    response.Data = user;
    return res.status(200).json(response);
  } catch (error) {
    response.Message = "Invalid or expired token";
    return res.status(401).json(response);
  }
}
