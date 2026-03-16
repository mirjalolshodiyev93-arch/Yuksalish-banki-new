import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const locations = (t) => [
  { id: 1, name: t("filiali_va_bankomatlari.l1.name"), type: t("filiali_va_bankomatlari.l1.type"), lat: 41.2936485, lng: 69.2195442, status: t("filiali_va_bankomatlari.l1.status") },
  { id: 2, name: t("filiali_va_bankomatlari.l2.name"), type: t("filiali_va_bankomatlari.l2.type"), lat: 41.345, lng: 69.265, status: t("filiali_va_bankomatlari.l2.status") },
  { id: 3, name: t("filiali_va_bankomatlari.l3.name"), type: t("filiali_va_bankomatlari.l3.type"), lat: 41.289, lng: 69.200, status: t("filiali_va_bankomatlari.l3.status") },
  { id: 4, name: t("filiali_va_bankomatlari.l4.name"), type: t("filiali_va_bankomatlari.l4.type"), lat: 41.333, lng: 69.290, status: t("filiali_va_bankomatlari.l4.status") },
  { id: 5, name: t("filiali_va_bankomatlari.l5.name"), type: t("filiali_va_bankomatlari.l5.type"), lat: 41.260, lng: 69.230, status: t("filiali_va_bankomatlari.l5.status") },
];

function MapMover({ position }) {
  const map = useMap();

  React.useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
}

export default function CardMap() {
  const { t } = useTranslation();

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  const locs = locations(t);

  return (
    <div className="w-full pt-[150px] bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-600 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500 py-16 px-6 text-white min-h-screen">

      <div className="container mx-auto max-w-[1400px]">

  
       

        <div className="flex flex-col gap-8 lg:flex-row">

      
          <div className="w-full lg:w-1/3 flex flex-col gap-4 overflow-y-auto max-h-[700px] pr-2 custom-scrollbar">

            {locs.map((loc) => (

              <div
                key={loc.id}
                onClick={() => setSelectedLocation([loc.lat, loc.lng])}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer group

                ${
                  selectedLocation &&
                  selectedLocation[0] === loc.lat
                    ? "bg-white/20 border-white shadow-lg scale-[1.02]"
                    : "bg-white/10 border-white/20 dark:bg-slate-800/50 dark:border-slate-700 hover:bg-white/15 dark:hover:border-green-500/50"
                }`}
              >

                <div className="flex items-start justify-between">
                  <h3 className="text-lg italic font-bold transition-colors group-hover:text-green-200">
                    {loc.name}
                  </h3>

                  <span className="bg-white/20 dark:bg-slate-700 px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter">
                    {loc.type}
                  </span>
                </div>

                <p className="mt-2 text-sm text-white/70 dark:text-slate-400">
                  {loc.status}
                </p>

                <div className="flex items-center mt-3 text-xs font-bold transition-all text-white/50 group-hover:text-white">
                  MANZILGA QARASH ➤
                </div>
              </div>
            ))}
          </div>

    
      <div className="h-[80vh] md:h-[100vh] w-full relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">

            {loading && (
              <div className="absolute inset-0 z-[1000] flex items-center justify-center backdrop-blur-md bg-emerald-900/40 dark:bg-slate-900/60">

                <div className="flex flex-col items-center gap-4">

                  <div className="w-12 h-12 border-4 rounded-full border-white/30 border-t-white dark:border-slate-700 dark:border-t-green-500 animate-spin"></div>

                  <span className="text-sm font-medium tracking-widest uppercase animate-pulse">
                    Yuklanmoqda...
                  </span>

                </div>
              </div>
            )}

            <MapContainer
              center={[41.2936485, 69.2195442]}
              zoom={12}
              style={{ height: "100%", width: "100%" }}
              whenReady={() => setLoading(false)}
            >

              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap"
                className="map-tiles-filter"
              />

              {locs.map((loc) => (

                <Marker key={loc.id} position={[loc.lat, loc.lng]}>

                  <Popup className="custom-popup">

                    <div className="p-2 font-sans">

                      <strong className="text-emerald-700 dark:text-emerald-500">
                        {loc.name}
                      </strong>

                      <p className="mt-1 text-xs text-slate-500">
                        {loc.type}
                      </p>

                    </div>

                  </Popup>

                </Marker>

              ))}

              {selectedLocation && (
                <MapMover position={selectedLocation} />
              )}

            </MapContainer>

          </div>

        </div>
      </div>

      <style>{`

      .dark .map-tiles-filter{
        filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
      }

      .custom-popup .leaflet-popup-content-wrapper{
        background: rgba(255,255,255,0.95);
        border-radius:12px;
      }

      .dark .custom-popup .leaflet-popup-content-wrapper{
        background:#1e293b;
        color:white;
      }

      .custom-scrollbar::-webkit-scrollbar{
        width:4px;
      }

      .custom-scrollbar::-webkit-scrollbar-thumb{
        background:rgba(255,255,255,0.2);
        border-radius:10px;
      }

      `}</style>
    </div>
  );
}