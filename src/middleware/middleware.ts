import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Lấy token từ cookie
  const token = req.cookies.get("token")?.value;

  // Nếu không có token, chuyển hướng về trang đăng nhập
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Nếu có token, cho phép tiếp tục
  return NextResponse.next();
}
