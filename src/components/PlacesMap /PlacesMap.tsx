import { GoogleMap, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

import { Box } from "@mui/material";
import { ClusterMarker } from "../ClusterMarker";
import { GOOGLE_MAPS_API_KEY } from "./constants";
import { PLACES_DATA } from "./__fixtures__/places.fixtures";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const placesData: {
  location_id: string;
  lat: number;
  lng: number;
  name: string;
  address: string;
}[] = PLACES_DATA.map((p) => ({
  location_id: p.location_id,
  lat: parseFloat(p.latitude),
  lng: parseFloat(p.longitude),
  name: p.name,
  address: p.address,
})).filter(
  ({ lat, lng }) => !isNaN(lat) && !isNaN(lng) && isFinite(lat) && isFinite(lng)
);

const calculateAverage = (nums: number[]) =>
  nums.reduce((sum, n) => sum + n, 0) / nums.length;
const limitToDigits = (n: number, digits: number) =>
  parseFloat(n.toFixed(digits));
const center = {
  lat: limitToDigits(calculateAverage(placesData.map((p) => p.lat)), 3),
  lng: limitToDigits(calculateAverage(placesData.map((p) => p.lng)), 3),
};

const bounds = placesData.reduce(
  (current, p) => {
    if (p.lng < current.west) {
      current.west = p.lng;
    } else if (p.lng > current.east) {
      current.east = p.lng;
    }

    if (p.lat < current.south) {
      current.south = p.lat;
    } else if (p.lat > current.north) {
      current.north = p.lat;
    }

    return current;
  },
  {
    east: placesData[0].lng,
    west: placesData[0].lng,
    north: placesData[0].lat,
    south: placesData[0].lat,
  }
);

console.log(placesData, center, bounds);

export const PlacesMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [_map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback((map: google.maps.Map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={1}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {placesData.map((p) => {
        return (
          <ClusterMarker
            key={p.location_id}
            position={{ lat: p.lat, lng: p.lng }}
            name={p.name}
            address={p.address}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
};
