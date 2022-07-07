import { InfoWindow, Marker } from "@react-google-maps/api";

import { Box } from "@mui/material";
import restaurantSvgIcon from "../../assets/images/restaurant_icon.svg";

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
      <Marker
        position={position}
        onClick={() => handleActiveMarker(id)}
        icon={{
          url: restaurantSvgIcon,
        }}
      />
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
