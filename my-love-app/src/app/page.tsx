"use client";

import { useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState<{ title: string; content: string }[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = () => {
    if (!title || !content) return;
    setPosts([...posts, { title, content }]);
    setTitle("");
    setContent("");
  };

  return (
    <main className="min-h-screen bg-pink-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-extrabold text-center text-pink-700 mb-8 drop-shadow-sm">
          💌 우리의 추억 노트
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">✏️ 글 작성</h2>
          <input
            className="w-full border border-gray-300 rounded px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border border-gray-300 rounded px-4 py-2 mb-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={addPost}
            className="bg-pink-500 text-white font-semibold px-6 py-2 rounded hover:bg-pink-600 transition"
          >
            글 올리기
          </button>
        </div>

        <div className="space-y-6">
          {posts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white border border-pink-200 shadow-sm rounded-lg p-5"
            >
              <h3 className="text-lg font-bold text-pink-700">{post.title}</h3>
              <p className="mt-2 text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
