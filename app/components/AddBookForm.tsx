
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBookForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [tagInput, setTagInput] = useState(""); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        author,
        tags: tagInput
          ? tagInput.split(",").map((tag) => tag.trim())
          : [],
        status: "WANT_TO_READ",
      }),
    });

    setTitle("");
    setAuthor("");
    setTagInput(""); 
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-lg border border-white/10 
                 p-6 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="font-semibold text-lg text-white">
        Add New Book
      </h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Book Title"
        className="w-full bg-white/20 text-white 
                   placeholder-gray-300
                   border border-white/20
                   rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        className="w-full bg-white/20 text-white 
                   placeholder-gray-300
                   border border-white/20
                   rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      
      <input
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        placeholder="Tags (comma separated e.g. JS, Self-help)"
        className="w-full bg-white/20 text-white 
                   placeholder-gray-300
                   border border-white/20
                   rounded-lg px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <button
        className="bg-indigo-600 hover:bg-indigo-700 
                   transition px-4 py-2 rounded-lg 
                   font-semibold text-white"
      >
        Add Book
      </button>
    </form>
  );
}