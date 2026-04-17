// In-Memory Database for Fast Prototype
// Resets on server restart.

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  image: string; // URL
  likes: string[]; // array of userIds
  comments: Comment[];
  createdAt: string;
}

const currentDate = new Date().toISOString();
const yesterdayDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

export const memoryDb = {
  posts: [
    {
      id: "post_1",
      userId: "user_a",
      username: "WarrenBuffetFan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      content: "Just bought the dip on NIFTY50! Look at this chart pattern. Bullish flag forming right here. 🚀",
      // Unsplash fallback stock image
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
      likes: ["user_b", "user_c"],
      comments: [
        {
          id: "c1",
          userId: "user_b",
          username: "CryptoKing",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
          text: "Bro, respect the resistance. It might break down.",
          createdAt: currentDate,
        }
      ],
      createdAt: yesterdayDate,
    },
    {
      id: "post_2",
      userId: "user_x",
      username: "InvestGirl",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia",
      content: "Finally hit my emergency fund target! Started learning how to analyze small-caps today. Highly recommend sticking to your SIPs.",
      image: "",
      likes: ["user_a", "user_c", "user_b"],
      comments: [],
      createdAt: currentDate,
    }
  ] as Post[],
};
