import type React from "react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

// Definición de la interfaz para un producto.
export interface Product {
  id?: number; // opcional en caso de nuevo producto
  name: string;
  image: string;
  vendor: string;
  price: string;
  status: "Available" | "Disabled";
  categories: string[];
  type: "Seasonal" | "Regular" | "Limited";
  tags: string[];
  date: string;
}

// Definición de las props del formulario.
interface AddProductsFormProps {
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product;
}

export default function AddProductsForm({
  onClose,
  onSave,
  product,
}: AddProductsFormProps) {
  // Definir los estados iniciales en función de si se está editando o agregando un nuevo producto.
  const [name, setName] = useState(product ? product.name : "");
  const [image, setImage] = useState(product ? product.image : "");
  const [vendor, setVendor] = useState(product ? product.vendor : "");
  const [price, setPrice] = useState(product ? product.price : "");
  const [status, setStatus] = useState<"Available" | "Disabled">(
    product ? product.status : "Available"
  );
  // Manejo de categorías y etiquetas como cadenas separadas por comas, para facilitar su edición.
  const [categories, setCategories] = useState(
    product ? product.categories.join(", ") : ""
  );
  const [type, setType] = useState<"Seasonal" | "Regular" | "Limited">(
    product ? product.type : "Regular"
  );
  const [tags, setTags] = useState(product ? product.tags.join(", ") : "");
  const [date, setDate] = useState(
    product ? product.date : new Date().toISOString().slice(0, 10)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Crear el objeto producto con los valores del formulario.
    const newProduct: Product = {
      id: product?.id, // Si se está editando, se conserva el id; en un alta se asignará posteriormente.
      name,
      image,
      vendor,
      price,
      status,
      // Se convierten los valores separados por coma a arreglo, eliminando espacios vacíos.
      categories: categories
        .split(",")
        .map((cat) => cat.trim())
        .filter((cat) => cat),
      type,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      date,
    };
    // Se llama a la función onSave para procesar (agregar o actualizar) el producto.
    onSave(newProduct);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-[#0c0014] border border-purple-800 rounded-3xl p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {product ? "Editar producto" : "Agregar nuevo producto"}
          </h2>
          <IoMdClose size={18} onClick={onClose} className="cursor-pointer" />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Campo para el nombre */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre del producto"
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white"
            />
          </div>

          {/* Campo para la URL de la imagen */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm mb-1">
              URL de la imagen
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/placeholder.svg"
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white"
            />
          </div>

          {/* Campo para el vendor */}
          <div className="mb-4">
            <label htmlFor="vendor" className="block text-sm mb-1">
              Vendor
            </label>
            <input
              type="text"
              id="vendor"
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              placeholder="Nombre del vendor"
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white"
            />
          </div>

          {/* Campo para el precio */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm mb-1">
              Precio
            </label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$0.00"
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white"
            />
          </div>

          {/* Campo para el estado */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm mb-1">
              Estado
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "Available" | "Disabled")
              }
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white appearance-none"
            >
              <option value="Available">Available</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>

          {/* Campo para categorías */}
          <div className="mb-4">
            <label htmlFor="categories" className="block text-sm mb-1">
              Categorías (separadas por comas)
            </label>
            <input
              type="text"
              id="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              placeholder="Desserts, Cookiees"
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white"
            />
          </div>

          {/* Campo para el tipo */}
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm mb-1">
              Tipo
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) =>
                setType(e.target.value as "Seasonal" | "Regular" | "Limited")
              }
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white appearance-none"
            >
              <option value="Seasonal">Seasonal</option>
              <option value="Regular">Regular</option>
              <option value="Limited">Limited</option>
            </select>
          </div>

          {/* Campo para las etiquetas */}
          <div className="mb-4">
            <label htmlFor="tags" className="block text-sm mb-1">
              Etiquetas (separadas por comas)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2"
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white"
            />
          </div>

          {/* Campo para la fecha */}
          <div className="mb-6">
            <label htmlFor="date" className="block text-sm mb-1">
              Fecha
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent border border-gray-700 rounded-md p-2 text-white"
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md transition duration-200"
          >
            {product ? "Actualizar Producto" : "Crear Producto"}
          </button>
        </form>
      </div>
    </div>
  );
}
