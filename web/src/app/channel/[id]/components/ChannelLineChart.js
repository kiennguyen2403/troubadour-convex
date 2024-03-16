import { LineChart } from "@mui/x-charts/LineChart";

export default function ChannelLineChart({ data, labels }) {
  return (
    <LineChart
      width={1000}
      height={300}
      series={[{ data, label: "uv", area: true, showMark: false }]}
      xAxis={[{ scaleType: "point", data: labels }]}
      sx={{
        ".MuiLineElement-root": {
          display: "none",
        },
        marginLeft: "2rem",
      }}
    />
  );
}
