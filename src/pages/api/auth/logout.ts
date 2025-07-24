import type { NextApiRequest, NextApiResponse } from "next";
import { IApiResponse } from "@/types/response";
import cookie from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let response: IApiResponse<null> = {
    IsSuccess: false,
    Message: "",
    Data: null,
  };

  if (req.method !== "POST") {
    response.Message = "Method not allowed";
    return res.status(405).json(response);
  }

  // Xóa cookie token bằng cách set maxAge = 0
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    })
  );

  response.IsSuccess = true;
  response.Message = "Logout successful";
  return res.status(200).json(response);
}
