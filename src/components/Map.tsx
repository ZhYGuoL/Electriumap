'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

interface Outlet {
  id: string;
  latitude: number;
  longitude: number;
  userName: string;
}

interface MapProps {
  outlets: Outlet[];
  onAddOutlet?: (lat: number, lng: number) => void;
}

const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function MapEvents({ onAddOutlet }: { onAddOutlet?: (lat: number, lng: number) => void }) {
  const [user] = useAuthState(auth);
  
  useMapEvents({
    click: (e) => {
      if (onAddOutlet && user) {
        onAddOutlet(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  
  return null;
}

function ZoomToLocation({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  
  map.setView([lat, lng], 15);
  
  return null;
}

export default function Map({ outlets, onAddOutlet }: MapProps) {
  const [position, setPosition] = useState<[number, number]>([51.505, -0.09]);
  const [zoomLocation, setZoomLocation] = useState<[number, number] | null>(null);

  const handleLocationFound = (lat: number, lng: number) => {
    setZoomLocation([lat, lng]);
  };

  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEvents onAddOutlet={onAddOutlet} />
        {zoomLocation && <ZoomToLocation lat={zoomLocation[0]} lng={zoomLocation[1]} />}
        {outlets.map((outlet) => (
          <Marker
            key={outlet.id}
            position={[outlet.latitude, outlet.longitude]}
            icon={customIcon}
          >
            <Popup>
              Added by: {outlet.userName}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 