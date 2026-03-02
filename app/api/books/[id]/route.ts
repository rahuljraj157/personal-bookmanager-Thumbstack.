// import { NextRequest, NextResponse } from "next/server";
// import { verifyUser } from "@/lib/auth";
// import mongoose from "mongoose";
// import { connectDB } from "@/lib/db";
// import Book from "@/models/Books";



// export async function PUT(
//   req: NextRequest,
//   context: { params: { id: string } }
// ) {
//   try {
//     const { id } = await context.params;

//     console.log("params.id:", id);

//     const userId = await verifyUser();
//     console.log("userId:", userId);

//     if (!userId) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();

//     const body = await req.json();
//     const { title, author, status, tags } = body;

//     const updateData: any = {};
//     if (title) updateData.title = title;
//     if (author) updateData.author = author;
//     if (status) updateData.status = status;
//     if (tags) updateData.tags = tags;

//     const updatedBook = await Book.findOneAndUpdate(
//       {
//         _id: id,
//         userId: new mongoose.Types.ObjectId(userId),
//       },
//       updateData,
//       { new: true }
//     );

//     if (!updatedBook) {
//       return NextResponse.json(
//         { message: "Book not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(updatedBook);
//   } catch (error) {
//     console.error("PUT Error:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(
//   req: NextRequest,
//   context: { params: { id: string } }
// ) {
//   try {
//     const { id } = context.params;

//     const userId = await verifyUser();

//     if (!userId) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     await connectDB();

//     const deletedBook = await Book.findOneAndDelete({
//       _id: id,
//       userId: new mongoose.Types.ObjectId(userId),
//     });

//     if (!deletedBook) {
//       return NextResponse.json(
//         { message: "Book not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ message: "Deleted successfully" });
//   } catch (error) {
//     console.error("DELETE Error:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "@/lib/auth";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Book from "@/models/Books";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ unwrap params (required in Next 16)
    const { id } = await context.params;

    const userId = await verifyUser();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();
    const { title, author, status, tags } = body;

    const updateData: any = {};
    if (title) updateData.title = title;
    if (author) updateData.author = author;
    if (status) updateData.status = status;
    if (tags) updateData.tags = tags;

    const updatedBook = await Book.findOneAndUpdate(
      {
        _id: id,
        userId: new mongoose.Types.ObjectId(userId),
      },
      updateData,
      { returnDocument: "after" } // modern mongoose option
    );

    if (!updatedBook) {
      return NextResponse.json(
        { message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ unwrap params (required in Next 16)
    const { id } = await context.params;

    const userId = await verifyUser();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const deletedBook = await Book.findOneAndDelete({
      _id: id,
      userId: new mongoose.Types.ObjectId(userId),
    });

    if (!deletedBook) {
      return NextResponse.json(
        { message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}