# IP Tracker

A modern web application to discover the location and network details of any IPv4 or IPv6 address. Enter any IP address or detect your own, and instantly view its geographical location, ISP, organization, and more—visualized on an interactive map.

## Features

- **Track Any IP Address:** Enter any IPv4 or IPv6 address to get detailed information.
- **Detect My IP:** Instantly detect your current public IP address and view its details.
- **Location Lookup:** Get city, region, country, and coordinates for any IP.
- **Network Details:** View ISP, organization, and network infrastructure info.
- **Interactive Map:** Visualize the IP's location on a map with detailed popups.
- **Responsive UI:** Clean, modern, and mobile-friendly interface.

## Demo

![IP Tracker Screenshot](https://i.imgur.com/bHGio1R.png)
![IP Tracker Screenshot](https://i.imgur.com/1t1Slxa.png)
## Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rafiframadhana/ip-tracker
   cd ip-tracker
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the App

- **Development mode:**
  ```bash
  npm run dev
  ```
  The app will be available at `http://localhost:5173` (or as indicated in your terminal).

- **Production build:**
  ```bash
  npm run build
  npm run preview
  ```

### Linting

- **Run ESLint:**
  ```bash
  npm run lint
  ```

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (build tool)
- [Tailwind CSS](https://tailwindcss.com/) (styling)
- [Leaflet](https://leafletjs.com/) & [react-leaflet](https://react-leaflet.js.org/) (maps)
- [lucide-react](https://lucide.dev/) (icons)

## Project Structure

```
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # React components (UI, Map, etc.)
│   ├── services/         # API and utility functions
│   ├── types/            # TypeScript type definitions
│   └── App.tsx           # Main application file
├── package.json          # Project metadata and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── ...
```

## Credits

Developed by Rafif Ramadhana  
[Portfolio](https://rafiframadhana.site/) | [GitHub](https://github.com/rafiframadhana)

## License

This project is licensed under the MIT License.
