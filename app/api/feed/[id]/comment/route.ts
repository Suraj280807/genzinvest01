import { NextResponse } from "next/server";
import { memoryDb, Comment } from "@/lib/memoryDb";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { text, userId, username, avatar } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Comment text is required" }, { status: 400 });
    }

    const postIndex = memoryDb.posts.findIndex((p) => p.id === id);

    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const newComment: Comment = {
      id: `comment_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      userId: userId || "guest_uid",
      username: username || "Guest Trader",
      avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      text,
      createdAt: new Date().toISOString()
    };

    memoryDb.posts[postIndex].comments.push(newComment);

    return NextResponse.json({ 
      message: "Comment added successfully", 
      comment: newComment 
    }, { status: 201 });

  } catch (error) {
    console.error("Comment Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
