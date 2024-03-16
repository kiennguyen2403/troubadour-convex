import { Card, CardContent, Typography, Divider } from "@mui/material";

export default function ChannelAnalyticOverallCard({ value, topTitle, name, topName, topValue, unit }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{marginBottom: "0.2rem"}}>
          {name}
        </Typography>
        <Typography variant="h6" component="div">
          {value} {unit}
        </Typography>
        <Divider sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />
        <Typography variant="h5" component="div" sx={{marginBottom: "0.2rem"}}>
          {topTitle}
        </Typography>
        <Typography variant="h6" component="div">
          {topName}
        </Typography>
        <Typography variant="h6" component="div">
          {topValue} {unit}
        </Typography>
      </CardContent>
    </Card>
  );
}
