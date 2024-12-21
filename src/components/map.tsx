"use client";

import dynamic from "next/dynamic"; // Pour désactiver le SSR sur certains composants
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { Navigation } from "lucide-react";
import { Map as LeafletMap } from "leaflet"; // Import du type LeafletMap

// Position du restaurant
const RESTAURANT_POSITION: [number, number] = [45.7769682, 4.981032];

// Chargement dynamique de react-leaflet et Leaflet
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

export default function CustomMap() {
  const [map, setMap] = useState<LeafletMap | null>(null); // Typage explicite de l'état

  // Corriger les icônes Leaflet
  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require("leaflet"); // Importer Leaflet uniquement côté client
      delete L.Icon.Default.prototype._getIconUrl; // Nettoyer d'abord les icônes par défaut
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/icons/marker-icon-2x.png",
        iconUrl: "/icons/marker-icon.png",
        shadowUrl: "/icons/marker-shadow.png",
      });
    }
  }, []);

  // Gérer la navigation
  const handleNavigation = () => {
    if (typeof window !== "undefined") {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT_POSITION[0]},${RESTAURANT_POSITION[1]}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Itinéraire</h2>
        <div className="text-gray-300 mb-4">
          <p>Notre adresse :</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${RESTAURANT_POSITION[0]},${RESTAURANT_POSITION[1]}`}
            className="text-[#C4B5A2] hover:text-white transition-colors text-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chemin du Pontet, 69150 Décines-Charpieu
          </a>
        </div>
      </div>

      <div className="relative">
        {/* Conteneur de la carte */}
        <div className="relative h-[400px] w-full rounded-xl overflow-hidden">
          <MapContainer
            center={RESTAURANT_POSITION}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            whenReady={() => setMap(map)} // Typage explicite avec as LeafletMap
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={RESTAURANT_POSITION}>
              <Popup>
                Au Tiki<br />
                Chemin du Pontet, 69150 Décines-Charpieu
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Bouton de navigation */}
        <button
          onClick={handleNavigation}
          className="w-full mt-4 bg-[#4CAF50] hover:bg-[#45a049] text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <Navigation className="w-6 h-6" />
          <span>Lancer la navigation</span>
        </button>
      </div>
    </div>
  );
}
