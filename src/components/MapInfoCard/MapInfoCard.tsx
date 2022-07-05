import { Box } from "@mui/material";
import { InfoWindow } from "@react-google-maps/api";

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

export const MapInfoCard = ({ position, name, address }: IProps) => {
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
