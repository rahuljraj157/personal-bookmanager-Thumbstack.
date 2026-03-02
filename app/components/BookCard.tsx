"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Book = {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: string;
};

export default function BookCard({ book }: { book: Book }) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(book.title);
  const [editedAuthor, setEditedAuthor] = useState(book.author);
  const [editedTags, setEditedTags] = useState(
    book.tags?.join(", ") || ""
  );

  const updateStatus = async (status: string) => {
    await fetch(`/api/books/${book._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    router.refresh();
  };

  const deleteBook = async () => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    const res = await fetch(`/api/books/${book._id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  };

  const saveEdit = async () => {
    await fetch(`/api/books/${book._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editedTitle,
        author: editedAuthor,
        tags: editedTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      }),
    });

    setIsEditing(false);
    router.refresh();
  };

  return (
    <div
      className="bg-white/10 backdrop-blur-lg border border-white/10 
                 p-6 rounded-2xl shadow-lg
                 flex flex-col md:flex-row
                 md:justify-between md:items-start
                 gap-4"
    >
     
      <div className="flex-1 min-w-0 space-y-2">

        {isEditing ? (
          <>
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full bg-white/20 text-white px-3 py-2 rounded-lg"
            />

            <input
              value={editedAuthor}
              onChange={(e) => setEditedAuthor(e.target.value)}
              className="w-full bg-white/20 text-white px-3 py-2 rounded-lg"
            />

            <input
              value={editedTags}
              onChange={(e) => setEditedTags(e.target.value)}
              placeholder="Tags (comma separated)"
              className="w-full bg-white/20 text-white px-3 py-2 rounded-lg"
            />

            <div className="flex flex-wrap gap-3 mt-2">
              <button
                onClick={saveEdit}
                className="bg-green-600 px-3 py-1 rounded-lg text-white"
              >
                Save
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 px-3 py-1 rounded-lg text-white"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="font-semibold text-white text-lg truncate">
              {book.title}
            </h3>

            <p className="text-gray-300 truncate">
              {book.author}
            </p>

            {book.tags?.length > 0 && (
              <div className="flex gap-2 flex-wrap mt-2">
                {book.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-indigo-600/30 text-indigo-300 
                               px-2 py-1 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>

    
      {!isEditing && (
        <div className="flex flex-wrap gap-3 items-center md:ml-4">

          <select
            value={book.status}
            onChange={(e) => updateStatus(e.target.value)}
            className="bg-white/20 text-white px-3 py-2 rounded-lg"
          >
            <option value="WANT_TO_READ" className="text-black">
              📖 Want to Read
            </option>
            <option value="READING" className="text-black">
              📘 Reading
            </option>
            <option value="COMPLETED" className="text-black">
              ✅ Completed
            </option>
          </select>

          <button
            onClick={() => setIsEditing(true)}
            className="text-yellow-400 hover:text-yellow-500 transition"
          >
            Edit
          </button>

          <button
            onClick={deleteBook}
            className="text-red-400 hover:text-red-500 transition"
          >
            Delete
          </button>

        </div>
      )}
    </div>
  );
}