// src/components/PagesList.tsx
import React, { useState, useMemo } from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetPagesQuery } from "@/store/features/api/pageApi";
import { DataError } from "@/components/atoms/DataError";
import { EmptyData } from "@/components/atoms/EmptyData";

const ITEMS_PER_PAGE = 5;

export default function PagesList() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const apiSort = useMemo<"oldest" | "newest">(
    () => (sortOrder === "asc" ? "oldest" : "newest"),
    [sortOrder]
  );

  const {
    data: apiResponse,
    isLoading,
    isError,
    isSuccess,
  } = useGetPagesQuery({
    search: search || undefined,
    sort: apiSort,
    page,
    limit: ITEMS_PER_PAGE,
  });

  // 4) Si hubo error, lo mostramos
  if (isError) {
    return <DataError title={"Error to show pages"} darkTheme={true} />;
  }

  if (isSuccess && apiResponse.data.length === 0) {
    return <EmptyData darkTheme={true} title="No pages to show" />;
  }

  // 5) Extraemos data y meta de la respuesta
  const pages = apiResponse?.data; // Array<Page>
  const totalItems = apiResponse?.meta.total; // Total de registros
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <div className="p-6 text-white">
      {/* === FILTRO Y ORDEN === */}
      <div className="flex justify-end items-center mb-4 gap-2">
        <div className="relative w-1/2">
          <span className="absolute inset-y-0 left-3 flex items-center">
            <Search className="h-5 w-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search pages..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // Reiniciamos a página 1 cada vez que cambia el search
            }}
            className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-grape-800"
          />
        </div>
        <button
          onClick={() => {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
            setPage(1); // Reiniciamos a página 1 al cambiar el orden
          }}
          className="px-4 py-2 bg-grape-900 font-ArialRegular hover:bg-grape-800 rounded-lg"
        >
          Sort: {sortOrder === "asc" ? "Oldest" : "Newest"}
        </button>
      </div>

      {/* === TABLA DE RESULTADOS === */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3 text-right">Published by</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-800 animate-pulse"
                  >
                    <td className="p-3">
                      <div className="h-4 bg-gray-700 rounded w-1/3 mb-2" />
                      <div className="h-3 bg-gray-600 rounded w-1/4" />
                    </td>
                    <td className="p-3 text-right whitespace-nowrap">
                      <div className="h-4 bg-gray-700 rounded w-1/4 mb-2 mx-auto" />
                      <div className="h-3 bg-gray-600 rounded w-1/5 mx-auto" />
                    </td>
                  </tr>
                ))
              : pages.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-gray-800 hover:bg-gray-800 group"
                  >
                    <td className="p-3">
                      <div className="text-grape-700 font-medium cursor-pointer">
                        {p.title}
                      </div>
                      <div className="hidden group-hover:flex gap-4 mt-1 text-sm text-grape-300">
                        <button
                          className="hover:underline"
                          onClick={() => navigate(`/${p.slug}`)}
                        >
                          View
                        </button>
                        <button
                          className="hover:underline"
                          onClick={() =>
                            navigate(`/dashboard/pages/editor/${p.slug}`)
                          }
                        >
                          Quick Edit
                        </button>
                        <button className="hover:underline text-red-400">
                          Trash
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-right text-gray-400 whitespace-nowrap">
                      <div>{p.author}</div>
                      <div className="text-xs">
                        {format(new Date(p.createdAt), "yyyy/MM/dd · h:mm a")}
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* === PAGER === */}
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
