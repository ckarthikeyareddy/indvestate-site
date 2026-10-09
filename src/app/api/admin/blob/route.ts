// Vercel Blob client-upload handshake (behind proxy.ts): the browser asks for
// a token here, uploads straight to Blob, and this route is told when the
// upload completes. Only MP4s and poster images under reels/, 80 MB max.
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse, type NextRequest } from "next/server";

const MAX_BYTES = 80 * 1024 * 1024;

export async function POST(req: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  const body = (await req.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith("reels/")) throw new Error("bad-path");
        return {
          allowedContentTypes: ["video/mp4", "image/jpeg", "image/png", "image/webp"],
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // The record is written by POST /api/admin/reels once both files are up.
      },
    });
    return NextResponse.json(json);
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message }, { status: 400 });
  }
}
