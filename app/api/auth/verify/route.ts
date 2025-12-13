// Tệp: api/auth/verify/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// Route GET xử lý liên kết xác minh
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.redirect(new URL("/verification-failed", request.url));
    }

    try {
        // 1. Xác thực và giải mã token
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
        const userId = decoded.id;

        // 2. Cập nhật trạng thái người dùng
        await prisma.user.update({
            where: { id: userId },
            data: {
                isVerified: true,
            },
        });

        // 3. Chuyển hướng thành công (bạn có thể tạo trang /verification-success)
        return NextResponse.redirect(new URL("/", request.url));
        
    } catch (error) {
        console.error("Verification error:", error);
        // Token không hợp lệ hoặc hết hạn
        return NextResponse.redirect(new URL("/", request.url));
    }
}