import { InfoWindow, Marker } from "@react-google-maps/api";

import { Box } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export type IProps = {
  position: {
    lat: number;
    lng: number;
  };
  onLoad?: () => void;
  onUnmount?: () => void;
  name: string;
  address: string;
  id: string | null;
  activeMarker: string | null;
  setActiveMarker: (marker: any) => void | null;
};

export const ClusterMarker = ({
  position,
  name,
  address,
  id,
  activeMarker,
  setActiveMarker,
}: IProps) => {
  const handleActiveMarker = (marker: any) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  return (
    <>
      <Marker position={position} onClick={() => handleActiveMarker(id)}>
        <LocationOnOutlinedIcon color="primary" fontSize="large" />
      </Marker>
      {activeMarker === id ? (
        <InfoWindow
          position={{ lat: position.lat, lng: position.lng }}
          onCloseClick={() => setActiveMarker(null)}
        >
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
