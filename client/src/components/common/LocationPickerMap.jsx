import { useState, useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for missing default marker icons in bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Sub-component to pan map programmatically
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);
  return null;
}

// Sub-component to capture clicks on the map
function MapClickHandler({ onSelectLocation }) {
  useMapEvents({
    click(e) {
      onSelectLocation(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

const LocationPickerMap = ({ latitude, longitude, onLocationChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);

  // Fallback center if coordinates aren't selected yet (e.g., city center)
  const currentCenter = useMemo(() => {
    if (typeof latitude === "number" && typeof longitude === "number") {
      return [latitude, longitude];
    }
    return [28.6139, 77.209]; // Default coordinates (e.g. New Delhi)
  }, [latitude, longitude]);

  // Reverse geocode lat/lng into a readable place name
  const fetchAddress = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      );
      const data = await res.json();
      return (
        data.display_name?.split(",").slice(0, 2).join(",") || "Selected Stop"
      );
    } catch {
      return "";
    }
  };

  const handleManualSelect = async (lat, lng) => {
    const suggestedName = await fetchAddress(lat, lng);
    onLocationChange({
      latitude: parseFloat(lat.toFixed(6)),
      longitude: parseFloat(lng.toFixed(6)),
      stopName: suggestedName,
    });
  };

  // Search places via Nominatim Search API
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      setSearching(true);
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery,
        )}&limit=1`,
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const item = data[0];
        const lat = parseFloat(item.lat);
        const lon = parseFloat(item.lon);

        onLocationChange({
          latitude: parseFloat(lat.toFixed(6)),
          longitude: parseFloat(lon.toFixed(6)),
          stopName: item.display_name.split(",").slice(0, 2).join(","),
        });
      }
    } finally {
      setSearching(false);
    }
  };

  const eventHandlers = useMemo(
    () => ({
      dragend(e) {
        const marker = e.target;
        const position = marker.getLatLng();
        handleManualSelect(position.lat, position.lng);
      },
    }),
    [],
  );

  return (
    <div className="space-y-2">
      {/* Search Bar */}
      <div className="flex gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search landmark, street, or area..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          disabled={searching}
          onClick={handleSearch}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Interactive Map */}
      <div className="h-[380px] w-full overflow-hidden rounded-lg border border-gray-300">
        <MapContainer
          center={currentCenter}
          zoom={14}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController center={currentCenter} />
          <MapClickHandler onSelectLocation={handleManualSelect} />

          {typeof latitude === "number" && typeof longitude === "number" && (
            <Marker
              position={[latitude, longitude]}
              draggable={true}
              eventHandlers={eventHandlers}
            >
              <Popup>Drag pin or click map to reposition.</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <p className="text-xs text-gray-500">
        Tip: Click anywhere on the map or drag the marker to adjust coordinates.
      </p>
    </div>
  );
};

export default LocationPickerMap;
