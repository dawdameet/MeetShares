import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");

  if (!file) return NextResponse.json({ error: "File not specified" }, { status: 400 });

  const filePath = path.join(process.cwd(), "public/uploads", file);

  try {
    const fileBuffer = await fs.readFile(filePath);

    // Delete the file after sending it
    await fs.unlink(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${file}"`,
        "Content-Type": "application/octet-stream",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "File not found or already deleted" }, { status: 404 });
  }
}
