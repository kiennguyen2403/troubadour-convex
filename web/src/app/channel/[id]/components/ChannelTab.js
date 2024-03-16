import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import ChannelMedias from "./ChannelMedias";

export default function ChannelTab({ medias, playlists, fullName, imageUrl }) {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  // customize tabs
  const CustomTabPanel = (props) => {
    const { children, tab, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={tab !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {tab === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    tab: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
      sx: { textTransform: "none" },
    };
  }

  return (
    <Box sx={{ width: "100%", marginTop: "2rem" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Videos" {...a11yProps(0)} />
          <Tab label="Playlists" {...a11yProps(1)} />
          <Tab label="Analytics" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel tab={tab} index={0}>
        <ChannelMedias medias={medias} artist={fullName} imageUrl={imageUrl} type="video" />
      </CustomTabPanel>
      <CustomTabPanel tab={tab} index={1}>
        <ChannelMedias medias={playlists} artist={fullName} imageUrl={imageUrl} type="playlist" />
      </CustomTabPanel>
      <CustomTabPanel tab={tab} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
