import "./App.css";
import { Box } from "@mui/material";
import { PlacesMap } from "./components";

function App() {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <PlacesMap />
    </Box>
  );
}

export default App;
