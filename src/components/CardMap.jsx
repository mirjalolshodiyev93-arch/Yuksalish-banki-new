import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const locations = [
  { id: 1, name: "Agrobank Markaz", type: "Filial", lat: 41.2936485, lng: 69.2195442 },
  { id: 2, name: "Yunusobod Filial", type: "Filial", lat: 41.345, lng: 69.265 },
  { id: 3, name: "Chilonzor Bankomat", type: "Bankomat", lat: 41.289, lng: 69.200 },
  { id: 4, name: "Mirzo Ulug'bek Filial", type: "Filial", lat: 41.333, lng: 69.290 },
  { id: 5, name: "Sergeli Bankomat", type: "Bankomat", lat: 41.260, lng: 69.230 },
  { id: 6, name: "Mirobod Filial", type: "Filial", lat: 41.312, lng: 69.260 },
  { id: 7, name: "Yashnobod Bankomat", type: "Bankomat", lat: 41.320, lng: 69.210 },
];

function MapMover({ position }) {
  const map = useMap();
  if (position) {
    map.setView(position, 14, { animate: true });
  }
  return null;
}

const CardMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div className="flex flex-col md:flex-row max-w-[1400px] mx-auto gap-4 p-6 mt-[100px]">
      {/* Kartochkalar */}
      <div className="flex flex-col gap-4 md:w-1/3">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="p-4 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedLocation([loc.lat, loc.lng])}
          >
            <h3 className="text-lg font-bold">{loc.name}</h3>
            <p className="text-gray-600">{loc.type}</p>
          </div>
        ))}
      </div>

      {/* Xarita */}
      <div className="md:w-2/3 h-[80vh] rounded-xl overflow-hidden shadow-md">
        <MapContainer
          center={[41.2936485, 69.2195442]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {locations.map((loc) => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}

          {selectedLocation && <MapMover position={selectedLocation} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default CardMap;