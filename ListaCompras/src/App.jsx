import { useState } from "react";

function ListaCompras() {
  // Definir el estado para la lista de compras
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState("");

  // Función para agregar un nuevo producto a la lista
  const agregarProducto = () => {
    if (nuevoProducto.trim() !== "") {
      setProductos([...productos, nuevoProducto]);
      setNuevoProducto("");
    }
  };

  // Función para eliminar un producto de la lista
  const eliminarProducto = (indexAEliminar) => {
    // PISTA: Usa setProductos con el método .filter() para excluir el producto seleccionado.
    // COMPLETADO:
    const productosActualizados = productos.filter((_, index) => index !== indexAEliminar);
    setProductos(productosActualizados);
  };

 return (
    // Agrega una clase CSS al contenedor principal
    <div className="lista-compras-container">
      <h2>Lista de Compras</h2>
      <div className="input-group"> {/* Opcional: para agrupar input y botón */}
        <input
          type="text"
          value={nuevoProducto}
          onChange={(e) => setNuevoProducto(e.target.value)}
          placeholder="Añadir nuevo producto"
        />
        <button onClick={agregarProducto}>Agregar</button>
      </div>
      
      {productos.length > 0 ? (
        <ul>
          {productos.map((producto, index) => (
            <li key={index}>
              {producto}
              <button onClick={() => eliminarProducto(index)}>Eliminar</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Tu lista de compras está vacía. ¡Añade algunos productos!</p>
      )}
    </div>
  );
}

export default ListaCompras;