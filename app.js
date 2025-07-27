import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';

// Dummy data for suppliers
const suppliers = [
  {
    id: 1,
    name: 'Sharma Traders',
    category: 'Vegetables',
    rating: 4.5,
    distance: '2km',
    priceRange: '₹₹',
  },
  {
    id: 2,
    name: 'Fresh Oil Depot',
    category: 'Cooking Oil',
    rating: 4.2,
    distance: '3.5km',
    priceRange: '₹',
  },
  {
    id: 3,
    name: 'Organic Grains',
    category: 'Flour & Pulses',
    rating: 4.8,
    distance: '1.8km',
    priceRange: '₹₹₹',
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600">VendorSetu</h1>
        <p className="text-gray-700">Connecting Street Vendors to Trusted Suppliers</p>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Vendor Login</h2>
          <p className="text-gray-600 mb-4">Find verified suppliers and place orders</p>
          <Link to="/vendor">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl w-full">Login as Vendor</button>
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-2">Supplier Login</h2>
          <p className="text-gray-600 mb-4">Manage your product listings and receive orders</p>
          <Link to="/supplier">
            <button className="bg-green-600 text-white px-4 py-2 rounded-xl w-full">Login as Supplier</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

function VendorDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, Vendor!</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-xl font-semibold text-blue-700">{supplier.name}</h3>
            <p className="text-gray-600">Category: {supplier.category}</p>
            <p className="text-gray-600">Rating: ⭐ {supplier.rating}</p>
            <p className="text-gray-600">Distance: {supplier.distance}</p>
            <p className="text-gray-600">Price: {supplier.priceRange}</p>
            <button className="mt-3 bg-blue-500 text-white px-4 py-1 rounded-md">View Products</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupplierDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome, Supplier!</h2>
      <p className="text-gray-600 mb-4">Upload and manage your product listings.</p>
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Product Name</label>
            <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. Sunflower Oil" />
          </div>
          <div>
            <label className="block text-gray-700">Category</label>
            <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. Cooking Oil" />
          </div>
          <div>
            <label className="block text-gray-700">Price</label>
            <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g. ₹120 per litre" />
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/supplier" element={<SupplierDashboard />} />
      </Routes>
    </Router>
  );
}
