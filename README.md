# Sri Lanka Fuel Price Tracker 🇱🇰 ⛽

A modern, SEO-optimized web application for tracking fuel prices in Sri Lanka. Built with **Bulma CSS**, **Vue.js 3**, and **Chart.js** for an exceptional user experience.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## 🌟 Features

- ✅ **Real-time Fuel Prices** - Track current prices for all major fuel types
- 📊 **Interactive Price Charts** - Visualize 30-day price history with Chart.js
- 📱 **Mobile-Friendly** - Fully responsive design that works on all devices
- 🎨 **Modern UI** - Beautiful gradient designs with smooth animations
- 🔍 **SEO Optimized** - Comprehensive meta tags, structured data, and Open Graph support
- 💾 **JSON Data Storage** - Separate JSON files for each fuel type
- 📈 **Price Statistics** - View highest, lowest, and average prices
- 🚀 **Fast & Lightweight** - No build process required, runs directly in the browser

## 🛢️ Fuel Types Tracked

1. **Petrol 92 Octane** - Unleaded Petrol
2. **Petrol 95 Octane** - Premium Petrol
3. **Auto Diesel** - Standard Diesel
4. **Super Diesel** - Premium Diesel
5. **Kerosene** - Household Fuel

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fuelprice.git
cd fuelprice
```

2. Open `index.html` in your browser or use a local server:

**Using Python:**
```bash
python3 -m http.server 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser

## 📁 Project Structure

```
fuelprice/
├── index.html          # Main HTML file with SEO meta tags
├── styles.css          # Custom CSS with modern design system
├── app.js              # Vue.js application logic
├── data/               # JSON data files
│   ├── petrol92.json   # Petrol 92 Octane data
│   ├── petrol95.json   # Petrol 95 Octane data
│   ├── autodiesel.json # Auto Diesel data
│   ├── superdiesel.json# Super Diesel data
│   └── kerosene.json   # Kerosene data
├── robots.txt          # SEO robots file
├── sitemap.xml         # SEO sitemap
└── README.md           # This file
```

## 📊 Data Format

Each fuel type has its own JSON file in the `data/` directory with the following structure:

```json
{
  "id": "petrol92",
  "name": "Petrol 92 Octane",
  "type": "Unleaded Petrol",
  "icon": "fa-gas-pump",
  "iconClass": "icon-petrol-92",
  "history": [
    { "date": "2026-01-15", "price": 395.00 },
    { "date": "2026-01-14", "price": 400.00 }
  ]
}
```

**Note:** The `currentPrice`, `change`, `changePercent`, and `lastUpdated` fields are **automatically calculated** from the history array:
- `currentPrice` = last entry in history array
- `change` = difference between last two entries
- `changePercent` = percentage change between last two entries
- `lastUpdated` = date of last entry in history array

This ensures data consistency and eliminates redundancy.

## 🔄 Updating Prices

To update fuel prices, simply add a new entry to the `history` array in the corresponding JSON file:

1. Open the JSON file (e.g., `data/petrol92.json`)
2. Add a new entry to the `history` array with the current date and new price
3. Save the file
4. The application will automatically calculate all derived values

Example:
```json
{
  "id": "petrol92",
  "name": "Petrol 92 Octane",
  "type": "Unleaded Petrol",
  "icon": "fa-gas-pump",
  "iconClass": "icon-petrol-92",
  "history": [
    { "date": "2026-01-14", "price": 400.00 },
    { "date": "2026-01-15", "price": 395.00 },
    { "date": "2026-01-16", "price": 398.00 }
  ]
}
```

**Using the Admin Panel:**
1. Open `admin.html` in your browser
2. Enter the new price for each fuel type
3. Click "Update" - the price will be added to history automatically
4. Download the updated JSON file
5. Replace the file in the `data/` directory

## 🎨 Customization

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #3273dc;
    --gradient-start: #667eea;
    --gradient-end: #764ba2;
}
```

### Fuel Type Icons

Update the `icon` and `iconClass` in the JSON files to change fuel type icons.

## 🔍 SEO Features

- ✅ Comprehensive meta tags (title, description, keywords)
- ✅ Open Graph tags for social media sharing
- ✅ Twitter Card support
- ✅ Structured data (JSON-LD) for search engines
- ✅ Semantic HTML5 markup
- ✅ Mobile-friendly viewport settings
- ✅ Canonical URLs
- ✅ robots.txt and sitemap.xml

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Bulma CSS framework
- **JavaScript (ES6+)** - Modern JavaScript features
- **Vue.js 3** - Progressive JavaScript framework
- **Chart.js 4** - Beautiful, responsive charts
- **Font Awesome 6** - Icon library
- **Google Fonts (Inter)** - Typography

## 📈 Performance

- No build process required
- Minimal dependencies (all loaded from CDN)
- Optimized images and assets
- Lazy loading for better performance
- Smooth animations with CSS transitions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Your Name - [@yourhandle](https://twitter.com/yourhandle)

## 🙏 Acknowledgments

- Bulma CSS Framework
- Vue.js Team
- Chart.js Team
- Font Awesome
- Google Fonts

## 📞 Support

For support, email support@yourwebsite.com or open an issue in the repository.

---

Made with ❤️ for Sri Lanka
