import mongoose, { Schema, Document, Model } from "mongoose";

export type BookStatus = "WANT_TO_READ" | "READING" | "COMPLETED";

export interface IBook extends Document {
  title: string;
  author: string;
  tags: string[];
  status: BookStatus;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema<IBook> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["WANT_TO_READ", "READING", "COMPLETED"],
      default: "WANT_TO_READ",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in Next.js
const Book: Model<IBook> =
  mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);

export default Book;