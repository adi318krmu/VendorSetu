// Global variables
let currentUser = null;
let currentUserType = null;
let suppliers = [];
let orders = [];
let products = [];
let navigationHistory = ['home'];
let isLoading = false;

// Sample data for demonstration
const sampleSuppliers = [
    {
        id: 1,
        name: "Fresh Foods Supplier",
        email: "contact@freshfoods.com",
        phone: "+1 234 567 8900",
        rating: 4.8,
        products: [
            { name: "Fresh Tomatoes", price: "₹2.50/kg", category: "Vegetables" },
            { name: "Organic Carrots", price: "₹1.80/kg", category: "Vegetables" },
            { name: "Sweet Corn", price: "₹3.20/kg", category: "Vegetables" },
            { name: "Fresh Spinach", price: "₹4.50/kg", category: "Vegetables" }
        ]
    },
    {
        id: 2,
        name: "Dairy Delights",
        email: "info@dairydelights.com",
        phone: "+1 234 567 8901",
        rating: 4.6,
        products: [
            { name: "Fresh Milk", price: "₹1.20/liter", category: "Dairy" },
            { name: "Cheddar Cheese", price: "₹8.50/kg", category: "Dairy" },
            { name: "Greek Yogurt", price: "₹3.80/kg", category: "Dairy" },
            { name: "Butter", price: "₹4.20/kg", category: "Dairy" }
        ]
    },
    {
        id: 3,
        name: "Fruit Paradise",
        email: "hello@fruitparadise.com",
        phone: "+1 234 567 8902",
        rating: 4.9,
        products: [
            { name: "Fresh Apples", price: "₹3.50/kg", category: "Fruits" },
            { name: "Bananas", price: "₹2.80/kg", category: "Fruits" },
            { name: "Oranges", price: "₹4.20/kg", category: "Fruits" },
            { name: "Strawberries", price: "₹6.50/kg", category: "Fruits" }
        ]
    },
    {
        id: 4,
        name: "Meat Masters",
        email: "sales@meatmasters.com",
        phone: "+1 234 567 8903",
        rating: 4.7,
        products: [
            { name: "Chicken Breast", price: "₹12.50/kg", category: "Meat" },
            { name: "Beef Steak", price: "₹25.80/kg", category: "Meat" },
            { name: "Pork Chops", price: "₹18.20/kg", category: "Meat" },
            { name: "Ground Beef", price: "₹15.50/kg", category: "Meat" }
        ]
    }
];

const sampleOrders = [
    {
        id: "ORD001",
        vendor: "John's Restaurant",
        items: ["Fresh Tomatoes", "Organic Carrots", "Fresh Milk"],
        total: "₹45.20",
        status: "pending",
        date: "2024-01-15"
    },
    {
        id: "ORD002",
        vendor: "Cafe Central",
        items: ["Chicken Breast", "Fresh Spinach", "Greek Yogurt"],
        total: "₹78.50",
        status: "confirmed",
        date: "2024-01-14"
    },
    {
        id: "ORD003",
        vendor: "Pizza Palace",
        items: ["Cheddar Cheese", "Fresh Tomatoes", "Ground Beef"],
        total: "₹92.30",
        status: "completed",
        date: "2024-01-13"
    }
];

const sampleProducts = [
    {
        id: 1,
        name: "Fresh Tomatoes",
        category: "Vegetables",
        price: "₹2.50/kg",
        description: "Fresh, ripe tomatoes from local farms"
    },
    {
        id: 2,
        name: "Organic Carrots",
        category: "Vegetables",
        price: "₹1.80/kg",
        description: "Organic carrots rich in vitamins"
    },
    {
        id: 3,
        name: "Fresh Milk",
        category: "Dairy",
        price: "₹1.20/liter",
        description: "Fresh dairy milk from local farms"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', async function() {
    initializeApp();
    setupEventListeners();
    await loadSampleData();
    setupBrowserNavigation();
});

function initializeApp() {
    // Show home page by default
    showHome();
}

function setupEventListeners() {
    // Form submissions
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    document.getElementById('add-product-form').addEventListener('submit', handleAddProduct);
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

function setupBrowserNavigation() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(event) {
        if (event.state && event.state.page) {
            navigateToPage(event.state.page, false);
        } else {
            showHome();
        }
    });
}

async function loadSampleData() {
    try {
        // Load suppliers from backend
        const suppliersData = await apiService.getSuppliers();
        suppliers = suppliersData.map(supplier => apiService.transformSupplierData(supplier));
        
        // Load products from backend
        const productsData = await apiService.getProducts();
        products = productsData.map(product => apiService.transformProductData(product));
        
        // Load orders from backend
        const ordersData = await apiService.getOrders();
        orders = ordersData.map(order => apiService.transformOrderData(order));
        
        // Populate supplier products
        suppliers.forEach(supplier => {
            supplier.products = products.filter(product => product.supplier === supplier.id);
        });
        
    } catch (error) {
        console.error('Failed to load data from backend:', error);
        // Fallback to sample data if backend is not available
        suppliers = [...sampleSuppliers];
        orders = [...sampleOrders];
        products = [...sampleProducts];
    }
}

// Enhanced navigation functions
function navigateToPage(pageName, addToHistory = true) {
    hideAllPages();
    
    switch(pageName) {
        case 'home':
            document.getElementById('home-page').classList.add('active');
            break;
        case 'user-type':
            document.getElementById('user-type-page').classList.add('active');
            break;
        case 'account-type':
            document.getElementById('account-type-page').classList.add('active');
            break;
        case 'login':
            document.getElementById('login-page').classList.add('active');
            break;
        case 'register':
            document.getElementById('register-page').classList.add('active');
            break;
        case 'vendor-dashboard':
            document.getElementById('vendor-dashboard').classList.add('active');
            loadVendorDashboard();
            break;
        case 'supplier-dashboard':
            document.getElementById('supplier-dashboard').classList.add('active');
            loadSupplierDashboard();
            break;
    }
    
    if (addToHistory) {
        navigationHistory.push(pageName);
        window.history.pushState({ page: pageName }, '', `#${pageName}`);
    }
    
    updateNavigation();
}

// Navigation functions
function showHome() {
    navigateToPage('home');
}

function showUserType() {
    navigateToPage('user-type');
}

function showAccountType() {
    navigateToPage('account-type');
}

function showLogin() {
    navigateToPage('login');
}

function showRegister() {
    navigateToPage('register');
    // Show/hide FSSAI field based on user type
    const fssaiGroup = document.getElementById('register-fssai-group');
    if (currentUserType === 'supplier') {
        fssaiGroup.style.display = '';
        document.getElementById('register-fssai').required = true;
    } else {
        fssaiGroup.style.display = 'none';
        document.getElementById('register-fssai').required = false;
    }
}

function showVendorDashboard() {
    navigateToPage('vendor-dashboard');
}

function showSupplierDashboard() {
    navigateToPage('supplier-dashboard');
}

function goBack() {
    if (navigationHistory.length > 1) {
        navigationHistory.pop(); // Remove current page
        const previousPage = navigationHistory[navigationHistory.length - 1];
        navigateToPage(previousPage, false);
    } else {
        showHome();
    }
}

function hideAllPages() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
}

function updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.display = currentUser ? 'none' : 'inline-block';
    });
}

// User type and account type selection
function selectUserType(type) {
    currentUserType = type;
    showAccountType();
}

function selectAccountType(type) {
    if (type === 'existing') {
        showLogin();
    } else {
        showRegister();
    }
}

// Authentication functions
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simple validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    try {
        isLoading = true;
        const result = await apiService.login(email, password, currentUserType || 'vendor');
        
        if (result.success) {
            currentUser = result.user;
            currentUser.type = result.type;
            
            if (currentUser.type === 'vendor') {
                showVendorDashboard();
            } else {
                showSupplierDashboard();
            }
        } else {
            alert(result.message || 'Login failed. Please check your credentials.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    } finally {
        isLoading = false;
    }
}

async function handleRegister(event) {
    event.preventDefault();
    if (!currentUserType) currentUserType = 'vendor'; // <-- Add this line
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const phone = document.getElementById('register-phone').value;
    
    // Validation
    if (!name || !email || !password || !confirmPassword || !phone) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    try {
        isLoading = true;
        console.log('Starting registration for:', currentUserType);
        
        if (currentUserType === 'vendor') {
            const vendorData = { name, email, password };
            console.log('Creating vendor with data:', vendorData);
            const newVendor = await apiService.createVendor(vendorData);
            currentUser = newVendor;
            currentUser.type = 'vendor';
            showVendorDashboard();
        } else {
            const supplierData = { name, email, password, company: name, fssai: document.getElementById('register-fssai').value };
            console.log('Creating supplier with data:', supplierData);
            const newSupplier = await apiService.createSupplier(supplierData);
            currentUser = newSupplier;
            currentUser.type = 'supplier';
            showSupplierDashboard();
        }
        
        alert('Registration successful!');
    } catch (error) {
        console.error('Registration error:', error);
        let errorMessage = 'Registration failed. ';
        
        if (error.message.includes('duplicate key')) {
            errorMessage += 'Email already exists.';
        } else if (error.message.includes('validation failed')) {
            errorMessage += 'Please check your input data.';
        } else if (error.message.includes('ECONNREFUSED')) {
            errorMessage += 'Backend server is not running. Please start the backend server.';
        } else {
            errorMessage += error.message;
        }
        
        alert(errorMessage);
    } finally {
        isLoading = false;
    }
}

// Vendor Dashboard functions
function loadVendorDashboard() {
    displaySuppliers();
}

function displaySuppliers() {
    const suppliersGrid = document.getElementById('suppliers-grid');
    suppliersGrid.innerHTML = '';
    
    suppliers.forEach(supplier => {
        const supplierCard = createSupplierCard(supplier);
        suppliersGrid.appendChild(supplierCard);
    });
}

function createSupplierCard(supplier) {
    const card = document.createElement('div');
    card.className = 'supplier-card';
    card.innerHTML = `
        <div class="supplier-header">
            <div class="supplier-avatar">
                ${supplier.name.charAt(0)}
            </div>
            <div class="supplier-info">
                <h3>${supplier.name}</h3>
                <p>${supplier.email}</p>
                <p>FSSAI: ${supplier.fssai ? supplier.fssai : 'N/A'}</p>
                <p>Rating: ${supplier.rating}/5.0</p>
            </div>
        </div>
        <div class="products-list">
            <h4>Available Products:</h4>
            ${supplier.products.map(product => `
                <div class="product-item">
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">${product.price}</span>
                </div>
            `).join('')}
        </div>
        <button class="btn btn-primary" onclick="placeOrder(${supplier.id})">Place Order</button>
    `;
    return card;
}

function searchSuppliers() {
    const searchTerm = document.getElementById('search-suppliers').value.toLowerCase();
    const filteredSuppliers = suppliers.filter(supplier => 
        supplier.name.toLowerCase().includes(searchTerm) ||
        supplier.products.some(product => 
            product.name.toLowerCase().includes(searchTerm)
        )
    );
    
    const suppliersGrid = document.getElementById('suppliers-grid');
    suppliersGrid.innerHTML = '';
    
    filteredSuppliers.forEach(supplier => {
        const supplierCard = createSupplierCard(supplier);
        suppliersGrid.appendChild(supplierCard);
    });
}

async function placeOrder(supplierId) {
    const supplier = suppliers.find(s => s.id === supplierId);
    if (supplier) {
        try {
            // Create a sample order with the supplier's products
            const orderData = {
                vendor: currentUser._id,
                products: supplier.products.map(p => p.id),
                totalAmount: supplier.products.reduce((sum, p) => sum + parseFloat(p.price.replace('₹', '')), 0)
            };
            
            const newOrder = await apiService.createOrder(orderData);
            alert(`Order placed with ${supplier.name}! Order ID: ${newOrder._id}`);
            
            // Refresh orders list if on supplier dashboard
            if (currentUser.type === 'supplier') {
                displayOrders();
            }
        } catch (error) {
            console.error('Order placement error:', error);
            alert('Failed to place order. Please try again.');
        }
    }
}

// Supplier Dashboard functions
function loadSupplierDashboard() {
    displayOrders();
    displayProducts();
}

function displayOrders() {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';
    
    orders.forEach(order => {
        const orderCard = createOrderCard(order);
        ordersList.appendChild(orderCard);
    });
}

function createOrderCard(order) {
    const card = document.createElement('div');
    card.className = 'order-card';
    
    card.innerHTML = `
        <div class="order-header">
            <span class="order-id">${order.id}</span>
            <span class="order-status ${order.status}">${order.status.toUpperCase()}</span>
        </div>
        <div class="order-details">
            <p><strong>Vendor:</strong> ${order.vendor}</p>
            <p><strong>Items:</strong> ${order.items.join(', ')}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>Date:</strong> ${order.date}</p>
        </div>
        <div class="order-actions">
            ${order.status === 'pending' ? `
                <button class="btn btn-primary" onclick="updateOrderStatus('${order.id}', 'confirmed')">Confirm Order</button>
            ` : ''}
        </div>
    `;
    
    return card;
}

function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <h4>${product.name}</h4>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p>${product.description}</p>
        <div class="product-actions">
            <button class="btn btn-secondary" onclick="editProduct(${product.id})">Edit</button>
            <button class="btn btn-secondary" onclick="deleteProduct(${product.id})">Delete</button>
        </div>
    `;
    
    return card;
}

// Tab management
function showTab(tabName) {
    // Hide all tab panes
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab pane
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Modal functions
function showAddProduct() {
    document.getElementById('add-product-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('add-product-modal').style.display = 'none';
}

async function handleAddProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = document.getElementById('product-price').value;
    const unit = document.getElementById('product-unit').value;
    const description = document.getElementById('product-description').value;
    
    if (!name || !category || !price || !unit) {
        alert('Please fill in all required fields');
        return;
    }
    
    try {
        const productData = {
            name: name,
            description: description,
            price: parseFloat(price),
            supplier: currentUser._id
        };
        
        const newProduct = await apiService.createProduct(productData);
        const transformedProduct = apiService.transformProductData(newProduct);
        
        products.push(transformedProduct);
        displayProducts();
        closeModal();
        
        // Reset form
        document.getElementById('add-product-form').reset();
        
        alert('Product added successfully!');
    } catch (error) {
        console.error('Product creation error:', error);
        alert('Failed to add product. Please try again.');
    }
}

async function updateOrderStatus(orderId, status) {
    try {
        await apiService.updateOrderStatus(orderId, status);
        
        // Update local orders array
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
        }
        
        displayOrders();
        alert(`Order status updated to ${status}`);
    } catch (error) {
        console.error('Order status update error:', error);
        alert('Failed to update order status. Please try again.');
    }
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Edit functionality for ${product.name} would be implemented here.`);
    }
}

async function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        try {
            await apiService.deleteProduct(productId);
            products = products.filter(p => p.id !== productId);
            displayProducts();
            alert('Product deleted successfully!');
        } catch (error) {
            console.error('Product deletion error:', error);
            alert('Failed to delete product. Please try again.');
        }
    }
}

// Utility functions
function showAbout() {
    hideAllPages();
    document.getElementById('about-page').classList.add('active');
    updateNavigation();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('add-product-modal');
    if (event.target === modal) {
        closeModal();
    }
} 
window.showAbout = showAbout; 