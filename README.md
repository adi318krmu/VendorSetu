# VendorSetu - Vendor Supplier Marketplace

A modern web application that connects vendors (buyers) with trusted suppliers for quality food products. Built with vanilla HTML, CSS, and JavaScript.

## Features

### For Vendors (Buyers)
- Browse available suppliers and their products
- View product prices and categories
- Search for specific suppliers or products
- Place orders with suppliers
- Track order status

### For Suppliers (Sellers)
- View incoming orders from vendors
- Manage product catalog
- Add, edit, and delete products
- Update order status (pending, confirmed, completed)
- View supplier profile

## User Flow

1. **Home Page**: Welcome screen with "Get Started" button
2. **User Type Selection**: Choose between Vendor or Supplier
3. **Account Setup**: Choose between existing account (login) or new account (register)
4. **Authentication**: Login or register with email and password
5. **Dashboard**: Access role-specific dashboard

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software installation required

### Running the Application

1. **Navigate to the project directory**:
   ```bash
   cd my-app
   ```

2. **Open the application**:
   - Double-click on `public/index.html` to open in your browser
   - Or use a local server for better development experience

3. **Using a local server** (recommended):
   ```bash
   # Using Python (if installed)
   python -m http.server 8000
   
   # Using Node.js (if installed)
   npx http-server
   
   # Using PHP (if installed)
   php -S localhost:8000
   ```

4. **Access the application**:
   - Open your browser and go to `http://localhost:8000`
   - The application will load automatically

## Application Structure

```
my-app/
├── public/
│   ├── index.html          # Main HTML file
│   ├── styles.css          # CSS styling
│   ├── script.js           # JavaScript functionality
│   └── favicon.ico         # App icon
├── src/                    # React files (not used in this version)
├── package.json            # Project configuration
└── README.md              # This file
```

## Demo Data

The application includes sample data for demonstration:

### Sample Suppliers
- **Fresh Foods Supplier**: Vegetables (tomatoes, carrots, corn, spinach)
- **Dairy Delights**: Dairy products (milk, cheese, yogurt, butter)
- **Fruit Paradise**: Fruits (apples, bananas, oranges, strawberries)
- **Meat Masters**: Meat products (chicken, beef, pork)

### Sample Orders
- Various orders with different statuses (pending, confirmed, completed)
- Order details including vendor name, items, total, and date

## Features in Detail

### Vendor Dashboard
- **Supplier Cards**: Display supplier information with ratings
- **Product Lists**: Show all products from each supplier with prices
- **Search Functionality**: Filter suppliers and products by name
- **Order Placement**: Place orders with suppliers

### Supplier Dashboard
- **Orders Tab**: View and manage incoming orders
- **Products Tab**: Manage product catalog (add, edit, delete)
- **Profile Tab**: View supplier profile information
- **Order Management**: Update order status (confirm pending orders)

### Responsive Design
- Mobile-friendly interface
- Responsive grid layouts
- Touch-friendly buttons and interactions

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development Notes

This application is built using:
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No frameworks or libraries required
- **Font Awesome**: Icons for better UX
- **Google Fonts**: Inter font family for modern typography

## Future Enhancements

- Backend integration with Node.js/Express
- Database integration (MongoDB/PostgreSQL)
- Real-time notifications
- Payment processing
- Order tracking system
- Supplier verification system
- Review and rating system
- Advanced search and filtering
- Mobile app development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
