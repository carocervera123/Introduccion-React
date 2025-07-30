import React, { useReducer, useRef, useCallback, useEffect, useState } from 'react';

const initialState = { products: [] };

function reducer(state, action) {
    switch (action.type) {
        case "add":
            return {
                products: [
                    ...state.products,
                    {
                        id: Date.now(), 
                        name: action.name,
                        quantity: 1,
                    },
                ],
            };
        case "increment":
            return {
                products: state.products.map((p) =>
                    p.id === action.id ? { ...p, quantity: p.quantity + 1 } : p
                ),
            };
        case "decrement":
            return {
                products: state.products.map((p) =>
                    p.id === action.id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
                ),
            };
        case "remove":
            return {
                products: state.products.filter((p) => p.id !== action.id),
            };
        case "clear":
            return initialState; 
        case "load_inventory":
            return {
                products: action.payload, 
            };
        default:
            return state;
    }
}

function CounterGame() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const inputRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState(""); 

    useEffect(() => {
        console.log("Cargando inventario desde localStorage...");
        const storedProducts = localStorage.getItem("inventoryProducts");
        if (storedProducts) {
            dispatch({ type: "load_inventory", payload: JSON.parse(storedProducts) });
        }
    }, []); 

    useEffect(() => {
        console.log("Guardando cambios en localStorage...");
        localStorage.setItem("inventoryProducts", JSON.stringify(state.products));
    }, [state.products]); 

    const handleAddProduct = () => {
        const productName = inputRef.current.value.trim();
        if (productName !== "") {
            dispatch({ type: "add", name: productName });
            inputRef.current.value = ""; 
            inputRef.current.focus(); 
        }
    };

    const handleIncrement = useCallback((id) => {
        dispatch({ type: "increment", id });
    }, []); 

    const handleDecrement = useCallback((id) => {
        dispatch({ type: "decrement", id });
    }, []); 

    const handleRemove = useCallback((id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
            dispatch({ type: "remove", id });
        }
    }, []); 

    const handleClearInventory = useCallback(() => {
        if (window.confirm("¿Estás seguro de que quieres vaciar todo el inventario?")) {
            dispatch({ type: "clear" });
        }
    }, []); 

    const filteredProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="inventory-manager-container">
            <h1>Gestor de Inventario 🛒</h1>

            <div className="add-product-section card">
                <h2>Añadir Producto</h2>
                <div className="input-group">
                    <input
                        ref={inputRef} 
                        type="text"
                        placeholder="Nombre del producto"
                        className="input-field"
                        onKeyDown={(e) => { 
                            if (e.key === 'Enter') handleAddProduct();
                        }}
                    />
                    <button onClick={handleAddProduct} className="btn primary">
                        Agregar Producto
                    </button>
                </div>
            </div>

            {}
            <div className="search-section card">
                <h2>Buscar Producto</h2>
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    className="input-field"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {}
            <div className="product-list-section card">
                <h2>Productos en Inventario ({filteredProducts.length})</h2>
                {filteredProducts.length === 0 ? (
                    <p className="empty-message">
                        {searchTerm ? "No se encontraron productos con esa búsqueda." : "El inventario está vacío."}
                    </p>
                ) : (
                    <ul>
                        {filteredProducts.map((product) => (
                            <li key={product.id} className="product-item">
                                <span className="product-name">{product.name}</span>
                                <span className="product-quantity">Cantidad: {product.quantity}</span>
                                <div className="product-actions">
                                    <button onClick={() => handleIncrement(product.id)} className="btn small-btn success-btn">
                                        +
                                    </button>
                                    <button onClick={() => handleDecrement(product.id)} className="btn small-btn warning-btn">
                                        -
                                    </button>
                                    <button onClick={() => handleRemove(product.id)} className="btn small-btn danger-btn">
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {}
            <div className="clear-inventory-section">
                <button onClick={handleClearInventory} className="btn clear-btn">
                    Vaciar Inventario
                </button>
            </div>
        </div>
    );
}

export default CounterGame;