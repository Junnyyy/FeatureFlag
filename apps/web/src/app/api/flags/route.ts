import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get("userId") || "demo-user-123";

  const flags = {
    showExtendedColumns: true,
  };

  if (userId) {
    const userIdNumber = parseInt(userId.replace(/\D/g, "")) || 0;
    const isEvenUser = userIdNumber % 2 === 0;

    flags.showExtendedColumns = isEvenUser;
  }

  return NextResponse.json(flags, {
    headers: {
      "Cache-Control": "public, max-age=60",
    },
  });
}
