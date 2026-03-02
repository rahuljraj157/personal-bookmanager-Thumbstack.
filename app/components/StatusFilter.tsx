"use client";

export default function StatusFilter({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) {
  const filters = [
    { label: "All", value: "ALL" },
    { label: "Want to Read", value: "WANT_TO_READ" },
    { label: "Reading", value: "READING" },
    { label: "Completed", value: "COMPLETED" },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          className={`px-4 py-2 rounded-lg transition ${
            selected === filter.value
              ? "bg-indigo-600 text-white"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}