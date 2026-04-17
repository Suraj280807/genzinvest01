import { NextResponse } from "next/server";
import { memoryDb } from "@/lib/memoryDb";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const userId = body.userId || "guest_uid"; // from auth normally

    const postIndex = memoryDb.posts.findIndex((p) => p.id === id);

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const post = memoryDb.posts[postIndex];
    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      // Unlike
      post.likes = post.likes.filter((uid) => uid !== userId);
    } else {
      // Like
      post.likes.push(userId);
    }

    return NextResponse.json({ 
      message: hasLiked ? "Unliked" : "Liked", 
      likesCount: post.likes.length,
      likes: post.likes
    }, { status: 200 });

  } catch (error) {
    console.error("Like Post Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
