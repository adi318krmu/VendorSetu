// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// API Service Class
class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    // Generic request method
    async makeRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            console.log('Making API request to:', url);
            const response = await fetch(url, config);
            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            
            const data = await response.json();
            console.log('API Response:', data);
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Vendor APIs
    async createVendor(vendorData) {
        return this.makeRequest('/vendors', {
            method: 'POST',
            body: JSON.stringify(vendorData)
        });
    }

    async getVendors() {
        return this.makeRequest('/vendors');
    }

    async getVendorById(id) {
        return this.makeRequest(`/vendors/${id}`);
    }

    async updateVendor(id, vendorData) {
        return this.makeRequest(`/vendors/${id}`, {
            method: 'PUT',
            body: JSON.stringify(vendorData)
        });
    }

    async deleteVendor(id) {
        return this.makeRequest(`/vendors/${id}`, {
            method: 'DELETE'
        });
    }

    // Supplier APIs
    async createSupplier(supplierData) {
        return this.makeRequest('/suppliers', {
            method: 'POST',
            body: JSON.stringify(supplierData)
        });
    }

    async getSuppliers() {
        return this.makeRequest('/suppliers');
    }

    async getSupplierById(id) {
        return this.makeRequest(`/suppliers/${id}`);
    }

    async updateSupplier(id, supplierData) {
        return this.makeRequest(`/suppliers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(supplierData)
        });
    }

    async deleteSupplier(id) {
        return this.makeRequest(`/suppliers/${id}`, {
            method: 'DELETE'
        });
    }

    // Product APIs
    async createProduct(productData) {
        return this.makeRequest('/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    }

    async getProducts() {
        return this.makeRequest('/products');
    }

    async getProductsBySupplier(supplierId) {
        return this.makeRequest(`/products?supplier=${supplierId}`);
    }

    async getProductById(id) {
        return this.makeRequest(`/products/${id}`);
    }

    async updateProduct(id, productData) {
        return this.makeRequest(`/products/${id}`, {
            method: 'PUT',
            body: JSON.stringify(productData)
        });
    }

    async deleteProduct(id) {
        return this.makeRequest(`/products/${id}`, {
            method: 'DELETE'
        });
    }

    // Order APIs
    async createOrder(orderData) {
        return this.makeRequest('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    }

    async getOrders() {
        return this.makeRequest('/orders');
    }

    async getOrdersByVendor(vendorId) {
        return this.makeRequest(`/orders?vendor=${vendorId}`);
    }

    async getOrdersBySupplier(supplierId) {
        return this.makeRequest(`/orders?supplier=${supplierId}`);
    }

    async getOrderById(id) {
        return this.makeRequest(`/orders/${id}`);
    }

    async updateOrderStatus(id, status) {
        return this.makeRequest(`/orders/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    }

    async deleteOrder(id) {
        return this.makeRequest(`/orders/${id}`, {
            method: 'DELETE'
        });
    }

    // Review APIs
    async createReview(reviewData) {
        return this.makeRequest('/reviews', {
            method: 'POST',
            body: JSON.stringify(reviewData)
        });
    }

    async getReviews() {
        return this.makeRequest('/reviews');
    }

    async getReviewsBySupplier(supplierId) {
        return this.makeRequest(`/reviews?supplier=${supplierId}`);
    }

    async getReviewById(id) {
        return this.makeRequest(`/reviews/${id}`);
    }

    async updateReview(id, reviewData) {
        return this.makeRequest(`/reviews/${id}`, {
            method: 'PUT',
            body: JSON.stringify(reviewData)
        });
    }

    async deleteReview(id) {
        return this.makeRequest(`/reviews/${id}`, {
            method: 'DELETE'
        });
    }

    // Authentication helper
    async login(email, password, userType) {
        try {
            if (userType === 'vendor') {
                const vendors = await this.getVendors();
                const vendor = vendors.find(v => v.email === email && v.password === password);
                if (vendor) {
                    return { success: true, user: vendor, type: 'vendor' };
                }
            } else if (userType === 'supplier') {
                const suppliers = await this.getSuppliers();
                const supplier = suppliers.find(s => s.email === email && s.password === password);
                if (supplier) {
                    return { success: true, user: supplier, type: 'supplier' };
                }
            }
            return { success: false, message: 'Invalid credentials' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Login failed' };
        }
    }

    // Data transformation helpers
    transformSupplierData(supplier) {
        return {
            id: supplier._id,
            name: supplier.name,
            email: supplier.email,
            company: supplier.company,
            rating: 4.5, // Default rating, can be calculated from reviews
            products: [] // Will be populated separately
        };
    }

    transformProductData(product) {
        return {
            id: product._id,
            name: product.name,
            description: product.description,
            price: `$${product.price}`,
            category: 'General', // Can be added to product model
            supplier: product.supplier
        };
    }

    transformOrderData(order) {
        return {
            id: order._id,
            vendor: order.vendor,
            products: order.products,
            totalAmount: `$${order.totalAmount}`,
            status: order.status,
            createdAt: new Date(order.createdAt).toISOString().split('T')[0]
        };
    }
}

// Create global API instance
const apiService = new ApiService();

// Export for use in other files
window.apiService = apiService; 