import { useMapEvents } from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";

interface MapClickHandlerProps {
    onMapClick: (lat: number, lng: number) => void;
}

export function MapClickHandler({ onMapClick }: MapClickHandlerProps) {
    useMapEvents({
        click(e: LeafletMouseEvent) {
            onMapClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}
