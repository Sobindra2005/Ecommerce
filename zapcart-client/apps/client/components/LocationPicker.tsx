"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@repo/ui/ui/button";
import { Input } from "@repo/ui/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@repo/ui/ui/dialog";
import { MdMyLocation, MdSearch } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "sonner";
import { MapClickHandler } from "./MapClickHandler";
import { MainContainer } from "./wrapper";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
);
const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
);
const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
);

interface LocationData {
    lat: number;
    lng: number;
    address: string;
    city: string;
    zip: string;
}

interface LocationPickerProps {
    open: boolean;
    onClose: () => void;
    onLocationSelect: (location: LocationData) => void;
}

interface SearchResult {
    place_id: number;
    lat: string;
    lon: string;
    display_name: string;
    address: {
        road?: string;
        city?: string;
        town?: string;
        village?: string;
        postcode?: string;
        state?: string;
        country?: string;
    };
}

// Component to handle smooth map animations
function MapAnimator({ position }: { position: [number, number] }) {
    const { useMap } = require("react-leaflet");
    const map = useMap();

    useEffect(() => {
        if (map && position) {
            // Smooth animation to new position
            map.flyTo(position, 13, {
                duration: 1.5, // 1.5 seconds animation
                easeLinearity: 0.25
            });
        }
    }, [map, position]);

    return null;
}

export function LocationPicker({ open, onClose, onLocationSelect }: LocationPickerProps) {
    const [position, setPosition] = useState<[number, number]>([40.7128, -74.0060]); // Default to NYC
    const [markerPosition, setMarkerPosition] = useState<[number, number]>([40.7128, -74.0060]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searching, setSearching] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<LocationData | null>(null);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Get user's current location on mount
    useEffect(() => {
        if (open && navigator.geolocation) {
            setLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const newPos: [number, number] = [position.coords.latitude, position.coords.longitude];
                    setPosition(newPos);
                    setMarkerPosition(newPos);
                    reverseGeocode(newPos[0], newPos[1]);
                    setLoadingLocation(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    toast.error("Could not get your location", {
                        description: "Using default location instead"
                    });
                    setLoadingLocation(false);
                }
            );
        }
    }, [open]);

    // Debounced search effect - triggers search as user types
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }

        const delayDebounce = setTimeout(() => {
            handleAutoSearch();
        }, 500); // 500ms delay

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    // Auto search function (called by debounce)
    const handleAutoSearch = async () => {
        if (!searchQuery.trim()) return;

        setSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1`
            );
            const data: SearchResult[] = await response.json();

            if (data && data.length > 0) {
                setSearchResults(data);
                setShowResults(true);
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
            setShowResults(false);
        } finally {
            setSearching(false);
        }
    };

    // Reverse geocode to get address from coordinates
    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();

            const locationData: LocationData = {
                lat,
                lng,
                address: data.address?.road || data.display_name.split(",")[0] || "",
                city: data.address?.city || data.address?.town || data.address?.village || "",
                zip: data.address?.postcode || "",
            };

            setSelectedAddress(locationData);
        } catch (error) {
            console.error("Reverse geocoding error:", error);
            toast.error("Could not fetch address details");
        }
    };

    // Search for location
    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setSearching(true);
        setShowResults(false);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1`
            );
            const data: SearchResult[] = await response.json();

            if (data && data.length > 0) {
                setSearchResults(data);
                setShowResults(true);
                toast.success(`Found ${data.length} location${data.length > 1 ? 's' : ''}`);
            } else {
                setSearchResults([]);
                toast.error("Location not found", {
                    description: "Please try a different search term"
                });
            }
        } catch (error) {
            console.error("Search error:", error);
            toast.error("Search failed", {
                description: "Please try again"
            });
        } finally {
            setSearching(false);
        }
    };

    // Select a search result
    const handleSelectResult = (result: SearchResult) => {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        const newPos: [number, number] = [lat, lng];

        setPosition(newPos);
        setMarkerPosition(newPos);

        const locationData: LocationData = {
            lat,
            lng,
            address: result.address?.road || result.display_name.split(",")[0] || "",
            city: result.address?.city || result.address?.town || result.address?.village || "",
            zip: result.address?.postcode || "",
        };

        setSelectedAddress(locationData);
        setShowResults(false);
        toast.success("Location selected from search!");
    };

    // Use current location
    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation not supported");
            return;
        }

        setLoadingLocation(true);
        setShowResults(false);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const newPos: [number, number] = [position.coords.latitude, position.coords.longitude];
                setPosition(newPos);
                setMarkerPosition(newPos);
                reverseGeocode(newPos[0], newPos[1]);
                setLoadingLocation(false);
                toast.success("Location updated!");
            },
            (error) => {
                console.error("Error getting location:", error);
                toast.error("Could not get your location");
                setLoadingLocation(false);
            }
        );
    };

    // Confirm location selection
    const handleConfirm = () => {
        if (selectedAddress) {
            onLocationSelect(selectedAddress);
            onClose();
            toast.success("Location selected!");
        }
    };

    const handleMapClick = (lat: number, lng: number) => {
        const newPos: [number, number] = [lat, lng];
        setMarkerPosition(newPos);
        setShowResults(false);
        reverseGeocode(lat, lng);
    };

    return (
        <MainContainer>
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500" />
                            Select Your Location
                        </DialogTitle>
                        <DialogDescription>
                            Click on the map, search for a location, or use your current location
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                    <Input
                                        placeholder="Search for a location..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => {
                                            // Delay to allow click on results
                                            setTimeout(() => setIsFocused(false), 200);
                                        }}
                                        className="pl-10"
                                    />
                                </div>
                                <Button
                                    onClick={handleSearch}
                                    disabled={searching || !searchQuery.trim()}
                                    variant="outline"
                                >
                                    {searching ? "Searching..." : "Search"}
                                </Button>
                                <Button
                                    onClick={handleUseCurrentLocation}
                                    disabled={loadingLocation}
                                    variant="outline"
                                    size="icon"
                                    title="Use current location"
                                >
                                    <MdMyLocation size={20} />
                                </Button>
                            </div>

                            {/* Search Results - Positioned absolutely over the map */}
                            {showResults && searchResults.length > 0 && isFocused && (
                                <div className="absolute top-full mt-2 left-0 right-0 z-50 border rounded-lg p-2 space-y-1 max-h-80 overflow-y-auto bg-white shadow-lg">
                                    <p className="text-xs text-muted-foreground px-2 py-1 font-semibold">
                                        {searching ? "Searching..." : `${searchResults.length} location${searchResults.length > 1 ? 's' : ''} found`}
                                    </p>
                                    {searchResults.map((result) => (
                                        <button
                                            key={result.place_id}
                                            onClick={() => handleSelectResult(result)}
                                            className="w-full text-left p-3 hover:bg-gray-50 rounded-md transition-colors border border-transparent hover:border-gray-200"
                                        >
                                            <div className="flex items-start gap-2">
                                                <FaMapMarkerAlt className="text-red-500 mt-1 shrink-0" size={14} />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {result.address?.road || result.display_name.split(",")[0]}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {result.display_name}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Map Container */}
                        <div className="h-100 rounded-lg overflow-hidden border relative">
                            {typeof window !== "undefined" && (
                                <MapContainer
                                    center={position}
                                    zoom={13}
                                    style={{ height: "100%", width: "100%" }}
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker position={markerPosition} />
                                    <MapClickHandler onMapClick={handleMapClick} />
                                    <MapAnimator position={position} />
                                </MapContainer>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 justify-end">
                            <Button variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleConfirm}
                                disabled={!selectedAddress}
                                className="bg-black text-white hover:bg-gray-800"
                            >
                                Confirm Location
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </MainContainer>
    );
}
