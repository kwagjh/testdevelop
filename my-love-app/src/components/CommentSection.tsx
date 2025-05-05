'use client';

import { useState } from 'react';

export default function CommentSection() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);

  const handleSubmit = () => {
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-4 mt-10">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">댓글을 남겨보세요 💬</h2>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-pink-400"
          placeholder="댓글을 입력하세요..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          작성
        </button>
      </div>

      <ul className="space-y-2">
        {comments.map((cmt, idx) => (
          <li key={idx} className="bg-pink-50 p-3 rounded shadow-sm">
            {cmt}
          </li>
        ))}
      </ul>
    </div>
  );
}
