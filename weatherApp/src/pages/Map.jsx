import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    height: "400px",
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Map = () => {
  const classes = useStyles();
  const position = [41.3851, 2.1734]; // Barcelona coordinates

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" gutterBottom>
        Barcelona Central HQ
      </Typography>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className={classes.mapContainer}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            Barcelona center. <br /> Plaça Urquinaona.
          </Popup>
        </Marker>
      </MapContainer>
    </Paper>
  );
};

export default Map;