export interface Reply {
  id: string;
  username: string;
  body: string;
  likes: string[]; // Array of UserIDs
  likeCount: number;
}

export interface Post {
  id: string;
  username: string;
  location: string;
  imageUrl: string;
  body: string;
  likes: string[]; // Array of UserIDs
  likeCount: number;
  replies: Reply[];
}
