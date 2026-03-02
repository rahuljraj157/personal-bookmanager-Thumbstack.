"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">

      
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
        >
          Your Personal <span className="text-blue-600">Book Manager</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-lg text-gray-600 mb-10"
        >
          Log your books. Track your reading journey. Rediscover your favorite authors.
          Simple, elegant, and built just for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="flex gap-4"
        >
          <Link
            href="/register"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 rounded-xl border border-gray-300 font-medium hover:bg-gray-200 transition"
          >
            Login
          </Link>
        </motion.div>
      </section>

    
      <section className="grid md:grid-cols-3 gap-8 px-8 pb-24 max-w-6xl mx-auto">

        {[
          {
            title: "Organize Effortlessly",
            desc: "Add books with tags and track their reading status with clarity.",
          },
          {
            title: "Insightful Dashboard",
            desc: "See your reading progress at a glance — no noise, just clarity.",
          },
          {
            title: "Built For Readers",
            desc: "A calm space designed to help you reflect and grow as a reader.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {feature.desc}
            </p>
          </motion.div>
        ))}

      </section>

    
      <footer className="text-center py-8 text-gray-500 text-sm">
        Built with care. Designed for clarity.
      </footer>

    </main>
  );
}