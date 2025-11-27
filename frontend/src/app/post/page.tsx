// 投稿ページ（仮実装）

"use client";

import { useState } from "react";
import Header from "../components/Header";

export default function PostForm() {
  const [text, setText] = useState("");

  const handlePost = () => {
    if (!text) return;
    console.log("投稿:", text);
    setText("");
  };

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-md">
        {/* ヘッダー */}
        <div className="flex justify-between items-center mb-4">
          <button className="text-gray-500 hover:text-gray-700">
            キャンセル
          </button>
          <button
            className={`px-4 py-1 rounded-full font-bold ${
              text
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!text}
            onClick={handlePost}
          >
            投稿
          </button>
        </div>

        {/* 投稿入力 */}
        <textarea
          className="w-full border rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="いまどうしてる？"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />

        {/* 文字数 */}
        <div className="text-right text-sm text-gray-500 mt-1">
          {text.length}/280
        </div>

        {/* 添付画像ボタン（仮） */}
        <div className="flex mt-2 gap-2">
          <button className="text-gray-500 hover:text-gray-700">📷 画像</button>
          <button className="text-gray-500 hover:text-gray-700">🎥 動画</button>
        </div>
      </div>
    </>
  );
}
