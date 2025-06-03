import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { useGetCategoriesAvailableQuery } from "@/store/features/api/categoriesApi";

interface Props {
  categoryFilter: string;
  setCategoryFilter: (c: string) => void;
  setCurrentPage: (n: number) => void;
}

export const DropDownCategories = ({
  categoryFilter,
  setCategoryFilter,
  setCurrentPage,
}: Props) => {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useGetCategoriesAvailableQuery();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="border border-gray-600 text-gray-300 px-4 py-2 rounded-md flex items-center">
        {categoryFilter === "all" ? "Select a category" : categoryFilter}
        <ChevronDownIcon className="h-5 w-5 ml-2" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {isLoading && (
              <p className="text-gray-300 px-4 py-2">Cargando categorías…</p>
            )}
            {isError && (
              <p className="text-red-400 px-4 py-2">
                Error cargando categorías
              </p>
            )}
            {!isLoading &&
              !isError &&
              categories.map(({ id, name }) => (
                <Menu.Item key={id}>
                  {({ active }) => (
                    <button
                      onClick={() => {
                        setCategoryFilter(name);
                        setCurrentPage(1);
                      }}
                      className={`${
                        active ? "bg-gray-700 text-white" : "text-gray-300"
                      } block px-4 py-2 text-sm w-full text-left`}
                    >
                      {name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    setCategoryFilter("all");
                    setCurrentPage(1);
                  }}
                  className={`${
                    active ? "bg-gray-700 text-white" : "text-gray-300"
                  } block px-4 py-2 text-sm w-full text-left`}
                >
                  Todas las categorías
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
