import { useState } from 'react';
import './App.css';

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};
type CartItem = Product & { qty: number };

function App() {
  // Placeholder product and cart state
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Toy Car', price: 10, quantity: 5 },
    { id: 2, name: 'Doll', price: 15, quantity: 3 },
    { id: 3, name: 'Puzzle', price: 8, quantity: 7 },
  ]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add to cart handler
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // Remove from cart handler
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // WhatsApp checkout
  const sendToWhatsApp = () => {
    const phone = '+91 9030774484'; // Replace with your WhatsApp number
    const cartText = cart.map(item => `${item.name} x${item.qty}`).join('%0A');
    const url = `https://wa.me/${phone}?text=Order%20Details:%0A${cartText}`;
    window.open(url, '_blank');
  };

  // Excel upload handler (integrated with backend)
  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
        alert('Inventory updated!');
      } else {
        alert('Invalid Excel format.');
      }
    } catch (err) {
      alert('Error uploading file.');
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Toy Collection Sales</h1>
        <p>Contact: <a href="mailto:ulchalaanil@gmail.com">ulchalaanil@gmail.com</a> | Phone: +91 9030774484</p>
      </header>
      <section>
        <h2>Upload Inventory (Excel)</h2>
        <input type="file" accept=".xlsx,.xls" onChange={handleExcelUpload} />
      </section>
      <section>
        <h2>Available Toys</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - ${product.price} (Qty: {product.quantity})
              <button onClick={() => addToCart(product)} style={{ marginLeft: 8 }}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? <p>Cart is empty.</p> : (
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} x{item.qty}
                <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: 8 }}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        <button disabled={cart.length === 0} onClick={sendToWhatsApp} style={{ marginTop: 12 }}>
          Checkout via WhatsApp
        </button>
      </section>
    </div>
  );
}

export default App
