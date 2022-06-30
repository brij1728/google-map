import { InfoWindow, Marker } from "@react-google-maps/api";

import { Box } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import React from "react";

export type IProps = {
  position: {
    lat: number;
    lng: number;
  };
  onLoad?: () => void;
  onUnmount?: () => void;
  name: string;
  address: string;
};

export const ClusterMarker: React.FC<IProps> = ({
  position,
  name,
  address,
}: IProps) => {
  const infoWindow = () => {
    return (
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
    );
  };
  const onClick = () => {
    infoWindow();
  };
  return (
    <>
      <Marker position={position} onClick={onClick}>
        <LocationOnOutlinedIcon color="primary" fontSize="large" />
      </Marker>
      {/* <InfoWindow position={{ lat: position.lat, lng: position.lng }}>
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
      </InfoWindow> */}
    </>
  );
};
