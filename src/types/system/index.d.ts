export interface Option {
    id: string; // Identificador único
    name: string; // Nombre del sabor o topping
    image: string; // Ruta de la imagen
    type: 'flavor' | 'topping'; // Categoría (sabor o topping)
  }
  