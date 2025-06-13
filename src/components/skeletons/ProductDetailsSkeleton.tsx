import React from "react";

export default function ProductDetailsSkeleton() {
  return (
    <div className="flex justify-center mb-20 p-4 animate-pulse">
      <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-8 mt-10">
        {/* Imagen placeholder */}
        <div className="w-full lg:w-5/12 flex justify-center py-4">
          <div className="w-72 h-72 md:w-auto md:h-96 bg-gray-700 rounded" />
        </div>

        {/* Detalles y formulario placeholder */}
        <div className="w-full lg:w-7/12 px-4 space-y-6">
          {/* Back button */}
          <div className="h-6 bg-gray-700 w-32 rounded" />

          {/* Título */}
          <div className="h-10 bg-gray-700 w-1/2 rounded" />

          {/* Descripción */}
          <div className="h-4 bg-gray-700 w-full rounded" />
          <div className="h-4 bg-gray-700 w-5/6 rounded" />

          {/* Precio */}
          <div className="h-4 bg-gray-700 w-1/4 rounded" />

          {/* Cantidad + botón */}
          <div className="space-y-2">
            <div className="flex flex-row justify-between">
              <div>
                <div className="h-4 mt-7 bg-gray-700 w-32 rounded" />
                <div className="h-4  mb-7 mt-2 bg-gray-700 w-32 rounded" />
              </div>
              <div className="flex flex-row items-center">
                <div className="h-12 w-12 bg-gray-700 rounded-full" />
                <div className="h-10 w-28 mx-2 bg-gray-700 rounded" />
                <div className="h-12 w-12 bg-gray-700 rounded-full" />
              </div>
            </div>

            <div className="h-12 bg-gray-700 w-full rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
