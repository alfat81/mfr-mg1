import { NextResponse } from "next/server";

// Force static export for GitHub Pages (no server runtime available)
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}