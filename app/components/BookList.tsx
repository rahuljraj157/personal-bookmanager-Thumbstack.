
"use client";

import { useState } from "react";
import BookCard from "./BookCard";
import StatusFilter from "./StatusFilter";

type Book = {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: string;
};

export default function BookList({ books }: { books: Book[] }) {
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");


  const allTags: string[] = [
    "ALL",
    ...Array.from(
      new Set<string>(
        books.flatMap((book) =>
          Array.isArray(book.tags) ? book.tags : []
        )
      )
    ),
  ];

 
  const filteredBooks = books.filter((book) => {
    const statusMatch =
      filter === "ALL" || book.status === filter;

    const tagMatch =
      selectedTag === "ALL" ||
      book.tags?.includes(selectedTag);

    return statusMatch && tagMatch;
  });

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="text-5xl">📚</div>
        <h3 className="text-xl font-semibold text-white">
          Your shelf is empty
        </h3>
        <p className="text-gray-400">
          Start by adding your first book and begin your reading journey.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      
      <StatusFilter selected={filter} onChange={setFilter} />

      <div className="flex gap-2 flex-wrap">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-lg text-sm ${
              selectedTag === tag
                ? "bg-indigo-600 text-white"
                : "bg-white/20 text-gray-300"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

  
      <div className="space-y-4">
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>

    </div>
  );
}