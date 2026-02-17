import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";
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

  if (req.method !== "GET") {
    response.Message = "Method not allowed";
    return res.status(405).json(response);
  }

  if (!req.headers.cookie) {
    response.Message = "Not authenticated";
    return res.status(401).json(response);
  }

  const cookies = cookie.parse(req.headers.cookie);

  // 🔥 Check cả 2 hệ
  const tokenAdmin = cookies.token_admin;
  const tokenClient = cookies.token_client;

  const token = tokenAdmin || tokenClient;

  if (!token) {
    response.Message = "Not authenticated";
    return res.status(401).json(response);
  }

  try {
    // 🔐 Decode không verify trước để biết system
    const decodedRaw: any = jwt.decode(token);

    if (!decodedRaw?.system) {
      response.Message = "Invalid token";
      return res.status(401).json(response);
    }

    const secret =
      decodedRaw.system === "admin"
        ? process.env.JWT_SECRET_ADMIN
        : process.env.JWT_SECRET_CLIENT;

    if (!secret) {
      throw new Error("JWT secret not defined");
    }

    // 🔐 Verify đúng secret
    const decoded = jwt.verify(token, secret) as {
      UserId: number;
      email: string;
      username: string;
      roles: string[];
      system: string;
    };

    // 🔎 Lấy user + roles
    const user = await prisma.user.findUnique({
      where: { UserId: decoded.UserId },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      response.Message = "User not found";
      return res.status(404).json(response);
    }

    const roleNames = user.roles.map((r) => r.role.name);

    response.IsSuccess = true;
    response.Message = "Get current user successful";
    response.Data = {
      UserId: user.UserId,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      roles: roleNames,
      system: decoded.system,
    };

    return res.status(200).json(response);
  } catch (error) {
    response.Message = "Invalid or expired token";
    return res.status(401).json(response);
  }
}
