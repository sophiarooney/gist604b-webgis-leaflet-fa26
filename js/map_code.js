// Loads OSM data and displays cities, roads, and county boundaries using Leaflet

// ============================================
// Step 1: Initialize the map
// ============================================

// Create a Leaflet map in the "map" div
// setView([lat, lon], zoom)
const map = L.map('map').setView([43.933611, -120.558333], 15);


// ============================================
// Step 2: Add a basemap
// ============================================

// Tile layer provides the visual background
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


// ============================================
// Step 3: Add/Customize controls
// ============================================

// Move zoom buttons (default = topleft)
map.zoomControl.setPosition('topright');

// Add a scale bar
L.control.scale().addTo(map);