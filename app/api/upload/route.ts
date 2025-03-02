import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import shortid from "shortid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

    const fileId = shortid.generate();
    const fileName = `${fileId}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ filename: fileName });
  } catch (error) {
    return NextResponse.json({ error: `File upload failed ${error}` }, { status: 500 });
  }
}
