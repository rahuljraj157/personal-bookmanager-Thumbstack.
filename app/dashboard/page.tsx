
import { redirect } from "next/navigation";
import { verifyUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Book from "@/models/Books";
import AddBookForm from "../components/AddBookForm";
import BookList from "../components/BookList";
import LogoutButton from "../components/LogoutButton";

export default async function DashboardPage() {
  const userId = await verifyUser();

  if (!userId) {
    redirect("/login");
  }

  await connectDB();

  const books = await Book.find({ userId }).lean();
  const serializedBooks = JSON.parse(JSON.stringify(books));

  const total = serializedBooks.length;
  const reading = serializedBooks.filter(
    (b: any) => b.status === "READING"
  ).length;
  const completed = serializedBooks.filter(
    (b: any) => b.status === "COMPLETED"
  ).length;
  const wantToRead = serializedBooks.filter(
    (b: any) => b.status === "WANT_TO_READ"
  ).length;

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-8 text-white">
    
    <div className="max-w-6xl mx-auto space-y-12">

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Your Reading Dashboard
        </h1>

        <LogoutButton />
      </div>

   
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Books" value={total} />
        <StatCard title="Want to Read" value={wantToRead} />
        <StatCard title="Reading" value={reading} />
        <StatCard title="Completed" value={completed} />
      </div>

     
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/10 space-y-8">
        <AddBookForm />
        <BookList books={serializedBooks} />
      </div>

    </div>
  </div>
);
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg">
      <p className="text-sm text-gray-300">{title}</p>
      <h2 className="text-3xl font-bold mt-2 text-white">{value}</h2>
    </div>
  );
}