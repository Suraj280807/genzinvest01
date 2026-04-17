import { NextResponse } from "next/server";
import { memoryDb, Post } from "@/lib/memoryDb";

export async function GET() {
  // Sort posts by descending created date (latest first)
  const sortedPosts = [...memoryDb.posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  return NextResponse.json({ posts: sortedPosts }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const { content, image, userId, username, avatar } = await req.json();

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const newPost: Post = {
      id: `post_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      userId: userId || "guest_uid",
      username: username || "Guest Trader",
      avatar: avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      content,
      image: image || "", // base64 or unsplash url
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    };

    memoryDb.posts.unshift(newPost); // Add to beginning (memory)

    return NextResponse.json({ message: "Post created successfully", post: newPost }, { status: 201 });
  } catch (error) {
    console.error("Create Post Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
