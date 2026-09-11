"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

// Confirmed by the client via a Google Maps Plus Code (4X8V+PF Gonnet), decoded
// with the open-location-code library — reverse-geocodes to Camino Centenario,
// Manuel B. Gonnet, La Plata, matching the studio's address.
const STUDIO_COORDS: [number, number] = [-34.8831875, -58.0063125];
const ZOOM = 16;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${STUDIO_COORDS[0]},${STUDIO_COORDS[1]}`;

export default function LocationMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || mapRef.current) return;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !container || mapRef.current) return;

      const map = L.map(container, {
        center: STUDIO_COORDS,
        zoom: ZOOM,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      // Standard OSM tiles (no API key/account needed) with a CSS filter
      // applied to just the tile pane (see .map-dark in globals.css) to get
      // a dark look that matches the site without a paid/keyed dark provider.
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        className: "",
        html: `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:#c8a96e;border:2px solid #0a0a0a;box-shadow:0 0 0 5px rgba(200,169,110,0.25),0 1px 4px rgba(0,0,0,0.6);"></span>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
        popupAnchor: [0, -8],
      });

      L.marker(STUDIO_COORDS, { icon, alt: "Estudio B+G Arquitectura" })
        .addTo(map)
        .bindPopup(
          `<strong>Estudio B+G Arquitectura</strong><br/>
           Cno. Centenario 2744 e/ 504 y 505<br/>
           Gonnet, La Plata, Buenos Aires<br/>
           <a href="${DIRECTIONS_URL}" target="_blank" rel="noopener noreferrer">Cómo llegar →</a>`
        )
        .openPopup();

      // Re-enable scroll-to-zoom only once the user commits to interacting
      // with the map, so an ordinary page scroll doesn't get trapped by it.
      map.once("focus", () => map.scrollWheelZoom.enable());
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="map-dark h-[420px] md:h-[520px] w-full border border-[var(--border)]"
      role="application"
      aria-label="Mapa de ubicación de Estudio B+G Arquitectura"
      tabIndex={0}
    />
  );
}
