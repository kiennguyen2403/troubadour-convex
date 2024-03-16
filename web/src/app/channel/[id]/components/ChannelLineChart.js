import { LineChart } from "@mui/x-charts/LineChart";

export default function ChannelLineChart({ data, labels, title }) {
  return (
    <LineChart
      width={1000}
      height={300}
      series={[{ data, label: title, area: true, showMark: false }]}
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
