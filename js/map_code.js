// Loads OSM data and displays cities, roads, and county boundaries using Leaflet

// ============================================
// Step 1: Initialize the map
// ============================================

// Create a Leaflet map in the "map" div
// setView([lat, lon], zoom)
const map = L.map('map').setView([43.933611, -120.558333], 7);


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


// ============================================
// Step 4: Create layer groups
// ============================================

// Layer groups allow toggling layers on/off
const lineLayer = L.layerGroup().addTo(map);
const pointLayer = L.layerGroup().addTo(map);
const polygonLayer = L.layerGroup().addTo(map);

// UI control to toggle layers
L.control.layers(null, {
  'Cities': pointLayer,
  'Roads': lineLayer,
  'County Boundaries': polygonLayer
}).addTo(map);


// ============================================
// Step 5: Load point data (Cities)
// ============================================

fetch('data/oregon_cities.json')
  .then(res => res.json())
  .then(data => {L.geoJSON(data, {

      // Style points as circle markers
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: '#0077B6',
          color: '#03045E',
          weight: 1,
          fillOpacity: 0.9
        });
      },

      // Add popups
      onEachFeature: function(feature, layer) {
        const name = feature.properties.NAME || 'NAME';
        layer.bindPopup(`<strong>${name}</strong>`);
      }

    }).addTo(pointLayer);

  })
  .catch(err => console.error('Error loading cities:', err));


// ============================================
// Step 6: Load line data (Roads)
// ============================================

fetch('data/oregon_roads.json')
  .then(res => res.json())
  .then(data => {L.geoJSON(data, {

      // Style lines
      style: function(feature) {
        return {
          color: '#CC5500',
          weight: 3
        };
      },
    }).addTo(lineLayer);

  })
  .catch(err => console.error('Error loading roads:', err));


// ============================================
// Step 7: Load polygon data (County boundaries)
// ============================================

fetch('data/oregon_counties.json')
  .then(res => res.json())
  .then(data => {

    // Add polygon and immediately fit to its bounds
    map.fitBounds(
      L.geoJSON(data, {
        style: function() {
          return {
            color: '#7D7F7C',
            weight: 2,
            fill: false
          };
        }
      })
      .addTo(polygonLayer)
      .getBounds()
    );

  })
  .catch(err => console.error('Error loading boundary:', err));