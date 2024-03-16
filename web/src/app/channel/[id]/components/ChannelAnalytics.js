import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab } from "@mui/material";
import ChannelLineChart from "./ChannelLineChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = ["Page A", "Page B", "Page C", "Page D", "Page E", "Page F", "Page G"];

export default function ChannelAnalytics({ medias }) {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  // customize tabs
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
      sx: { textTransform: "none" },
    };
  }

  return (
    <Box sx={{ width: "100%", marginLeft: "-2rem", display: "flex" }}>
      <Tabs
        orientation="vertical"
        value={tab}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Overall" {...a11yProps(0)} />
        <Tab label="Views" {...a11yProps(1)} />
        <Tab label="Likes" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={tab} index={0}></TabPanel>
      <TabPanel value={tab} index={1}>
        <ChannelLineChart data={uData} labels={xLabels} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <ChannelLineChart data={uData} labels={xLabels} />
      </TabPanel>
    </Box>
  );
}
