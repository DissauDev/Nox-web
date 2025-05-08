import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Page {
  id: number;
  title: string;
  author: string;
  date: string;
}

const mockPages: Page[] = Array.from({ length: 22 }, (_, i) => ({
  id: i + 1,
  title: `Page ${i + 1}`,
  author: "DeveloperDissau",
  date: new Date(2023, i % 12, (i % 28) + 1, 10, 0, 0).toISOString(),
}));

const ITEMS_PER_PAGE = 5;

export default function PagesList() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const filteredPages = useMemo(() => {
    const filtered = mockPages.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [search, sortOrder]);

  const paginatedPages = filteredPages.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredPages.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6  text-white min-h-screen">
      <div className="flex justify-end items-center mb-4 gap-2">
        <div className="relative w-1/2">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          Sort: {sortOrder === "asc" ? "Oldest" : "Newest"}
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3 text-right">Published by</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPages.map((page) => (
              <tr
                key={page.id}
                className="border-b border-gray-800 hover:bg-gray-800 group"
              >
                <td className="p-3">
                  <div className="text-blue-400 font-medium cursor-pointer">
                    {page.title}
                  </div>
                  <div className="hidden group-hover:flex gap-4 mt-1 text-sm text-blue-300">
                    <button className="hover:underline">Edit</button>
                    <button
                      className="hover:underline"
                      onClick={() => navigate(`/dashboard/pages/editor`)}
                    >
                      Quick Edit
                    </button>
                    <button className="hover:underline text-red-400">
                      Trash
                    </button>
                    <button className="hover:underline">View</button>
                  </div>
                </td>
                <td className="p-3 text-right text-gray-400 whitespace-nowrap">
                  <div>{page.author}</div>
                  <div className="text-xs">
                    {format(new Date(page.date), "yyyy/MM/dd · h:mm a")}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              n === page
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
