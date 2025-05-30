import type { NextApiResponse } from "next";
import type { IApiResponse } from "@/types/response";

export function sendSuccess<T>(
  res: NextApiResponse<IApiResponse<T>>,
  data: T,
  message = "Thành công"
) {
  res.status(200).json({
    IsSuccess: true,
    Message: message,
    Data: data,
  });
}

export function sendError<T>(
  res: NextApiResponse<IApiResponse<T>>,
  message = "Đã có lỗi xảy ra",
  data: T
) {
  res.status(500).json({
    IsSuccess: false,
    Message: message,
    Data: data,
  });
}
