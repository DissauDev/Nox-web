import { useAppSelector, useAppDispatch } from "@/store/hooks";

// ajusta la ruta si tu slice se llama diferente
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { selectWishlistItems } from "@/store/whishlistSelector";
import { removeFromWishlist } from "@/store/features/slices/whishlistSlice";
import { EmptyData } from "@/components/atoms/EmptyData";

export const WhisList = () => {
  const items = useAppSelector(selectWishlistItems);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRemove = (id: string) => {
    dispatch(removeFromWishlist(id));
  };

  const handleView = (id: string, categorie: string) => {
    navigate(`/products/${categorie}/${id}`);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-500">
        <EmptyData title={" Your wishlist is empty."} darkTheme={false} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6  text-sapphire-950">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Product
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">Price</th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Stock Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                {/* PRODUCT */}
                <td className="px-4 py-4 flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={item.imageLeft?.url}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                  <span className="font-medium">{item.name}</span>
                </td>

                {/* PRICE */}
                <td className="px-4 py-4 text-sm text-gray-700">
                  {item.sellPrice && item.sellPrice > item.price ? (
                    <>
                      <span className="line-through text-gray-400 mr-2">
                        ${item.price.toFixed(2)}
                      </span>
                      <span>${item.sellPrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span>${item.price.toFixed(2)}</span>
                  )}
                </td>

                {/* STOCK STATUS */}
                <td className="px-4 py-4 text-sm font-medium">
                  {item.status === "AVAILABLE" ? (
                    <span className="text-green-600">In Stock</span>
                  ) : (
                    <span className="text-red-600">Out of stock</span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-4 space-x-2">
                  {item.status === "AVAILABLE" && (
                    <>
                      <button
                        onClick={() => handleView(item.id, item.category)}
                        className="px-4 py-2 bg-gray-100 text-gray-800 text-xs rounded hover:bg-gray-200 transition"
                      >
                        View
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
