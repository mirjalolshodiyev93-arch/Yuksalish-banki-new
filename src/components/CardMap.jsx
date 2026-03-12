import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const locations = (t) => [
  {
    id: 1,
    name: t("filiali_va_bankomatlari.l1.name"),
    type: t("filiali_va_bankomatlari.l1.type"),
    lat: 41.2936485,
    lng: 69.2195442,
    status: t("filiali_va_bankomatlari.l1.status")
  },
  {
    id: 2,
    name: t("filiali_va_bankomatlari.l2.name"),
    type: t("filiali_va_bankomatlari.l2.type"),
    lat: 41.345,
    lng: 69.265,
    status: t("filiali_va_bankomatlari.l2.status")
  },
  {
    id: 3,
    name: t("filiali_va_bankomatlari.l3.name"),
    type: t("filiali_va_bankomatlari.l3.type"),
    lat: 41.289,
    lng: 69.200,
    status: t("filiali_va_bankomatlari.l3.status")
  },
  {
    id: 4,
    name: t("filiali_va_bankomatlari.l4.name"),
    type: t("filiali_va_bankomatlari.l4.type"),
    lat: 41.333,
    lng: 69.290,
    status: t("filiali_va_bankomatlari.l4.status")
  },
  {
    id: 5,
    name: t("filiali_va_bankomatlari.l5.name"),
    type: t("filiali_va_bankomatlari.l5.type"),
    lat: 41.260,
    lng: 69.230,
    status: t("filiali_va_bankomatlari.l5.status")
  },
  {
    id: 6,
    name: t("filiali_va_bankomatlari.l6.name"),
    type: t("filiali_va_bankomatlari.l6.type"),
    lat: 41.312,
    lng: 69.260,
    status: t("filiali_va_bankomatlari.l6.status")
  },
  {
    id: 7,
    name: t("filiali_va_bankomatlari.l7.name"),
    type: t("filiali_va_bankomatlari.l7.type"),
    lat: 41.320,
    lng: 69.210,
    status: t("filiali_va_bankomatlari.l7.status")
  },
];


function MapMover({ position }) {
  const map = useMap();
  if (position) {
    map.setView(position, 14, { animate: true });
  }
  return null;
}

const CardMap = () => {
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locs = locations(t); 

  return (
    <div className="flex flex-col md:flex-row max-w-[1400px] mx-auto gap-4 p-6 mt-[100px]">
   
      <div className="flex flex-col gap-4 md:w-1/3">
        {locs.map((loc) => (
          <div
            key={loc.id}
            className="p-4 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedLocation([loc.lat, loc.lng])}
          >
            <h3 className="text-lg font-bold">{loc.name}</h3>
            <p className="text-gray-600">{loc.type} - {loc.status}</p>
          </div>
        ))}
      </div>


      <div className="h-[100vh] w-full relative z-0">
        <MapContainer
          center={[41.2936485, 69.2195442]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {locs.map((loc) => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
              <Popup>
                <strong>{loc.name}</strong>
                <br />
                {loc.type} - {loc.status}
              </Popup>
            </Marker>
          ))}

          {selectedLocation && <MapMover position={selectedLocation} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default CardMap;