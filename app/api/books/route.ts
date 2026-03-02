import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Book from "@/models/Books";
import { verifyUser } from "@/lib/auth";

export async function GET() {
  const userId = await verifyUser();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const books = await Book.find({ userId }).lean();

  return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
  const userId = await verifyUser();

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const body = await req.json();
  const { title, author, tags = [], status = "WANT_TO_READ" } = body;

  if (!title || !author) {
    return NextResponse.json(
      { message: "Title and Author are required" },
      { status: 400 }
    );
  }

  const newBook = await Book.create({
    title,
    author,
    tags,
    status,
    userId,
  });

  return NextResponse.json(newBook, { status: 201 });
}