# Sri Lanka Fuel Price Tracker 🇱🇰 ⛽

A modern, application for tracking fuel prices in Sri Lanka. Built with **Bulma CSS**, **Vue.js 3**, and **Chart.js** for an exceptional user experience.

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

Your Name - [@yourhandle](https://twitter.com/xmadusanka)

## 🙏 Acknowledgments

- Bulma CSS Framework
- Vue.js Team
- Chart.js Team
- Font Awesome
- Google Fonts

## 📞 Support

For support, email madusanka@duck.com or open an issue in the repository.

---

Made with ❤️ for Sri Lanka
