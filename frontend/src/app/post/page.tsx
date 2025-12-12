"use client";

import { useRouter } from "next/navigation";
import Header from "../components/Header";
import PostForm from "../components/PostForm";

export default function PostPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col h-screen">
      <Header />
      <PostForm onClose={() => router.back()} />
    </main>
  );
}
