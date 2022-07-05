import { InfoWindow, Marker } from "@react-google-maps/api";

import { Box } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useState } from "react";

export type IProps = {
  position: {
    lat: number;
    lng: number;
  };
  onLoad?: () => void;
  onUnmount?: () => void;
  name: string;
  address: string;
  id: string;
};

export const ClusterMarker = ({ position, name, address, id }: IProps) => {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  return (
    <>
      <Marker position={position} onMouseOver={() => handleActiveMarker(id)}>
        <LocationOnOutlinedIcon color="primary" fontSize="large" />
      </Marker>
      {activeMarker === id ? (
        <InfoWindow position={{ lat: position.lat, lng: position.lng }}>
          <Box
            sx={{
              width: "fit-content",
              maxWidth: "200px",
              height: "fit-content",
              maxHeight: "200px",
            }}
          >
            <h6>{name}</h6>
            <p>{address}</p>
          </Box>
        </InfoWindow>
      ) : null}
    </>
  );
};
