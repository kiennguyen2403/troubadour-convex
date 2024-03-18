import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab } from "@mui/material";
import ChannelLineChart from "./ChannelLineChart";
import ChannelAnalyticOverallCard from "./ChannelAnalyticOverallCard";
import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import millisecondsToDdMm from "@/utils/millisecondsToDdMm";

export default function ChannelAnalytics({ medias, userId }) {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const analytic = useQuery(api.analytic.getByUserId, { userId });

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

  const {
    totalViews,
    totalLikes,
    highestViews,
    highestLikes,
    mediaWithHighestViews,
    mediaWithHighestLikes,
  } = calculateMediaStats(medias);

  return (
    <Box sx={{ width: "100%", marginLeft: "-2rem", display: "flex" }}>
      <Tabs
        orientation="vertical"
        value={tab}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider", height: 300 }}
      >
        <Tab label="Overall" {...a11yProps(0)} />
        <Tab label="Views" {...a11yProps(1)} />
        <Tab label="Likes" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <div style={{ display: "flex", gap: "2rem" }}>
          <ChannelAnalyticOverallCard
            name="Total Views"
            topName={mediaWithHighestViews}
            value={totalViews}
            topValue={highestViews}
            topTitle="Top video"
            unit="Views"
          />
          <ChannelAnalyticOverallCard
            name="Total Likes"
            topName={mediaWithHighestLikes}
            value={totalLikes}
            topValue={highestLikes}
            topTitle="Top video"
            unit="Likes"
          />
        </div>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <ChannelLineChart
          data={analytic ? analytic.data.views.map(({ value }) => value) : []}
          labels={
            analytic ? analytic.data.views.map(({ dateTime }) => millisecondsToDdMm(dateTime)) : []
          }
          title="Total views by day"
        />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <ChannelLineChart
          data={analytic ? analytic.data.likes.map(({ value }) => value) : []}
          labels={
            analytic ? analytic.data.likes.map(({ dateTime }) => millisecondsToDdMm(dateTime)) : []
          }
          title="Total likes by day"
        />
      </TabPanel>
    </Box>
  );
}

function calculateMediaStats(medias) {
  if (!medias || medias.length === 0) {
    return {
      totalViews: 0,
      totalLikes: 0,
      highestViews: 0,
      highestLikes: 0,
      mediaWithHighestViews: "",
      mediaWithHighestLikes: "",
    };
  }

  return medias.reduce(
    (acc, media) => {
      // Calculate total views and total likes
      acc.totalViews += media.views;
      acc.totalLikes += media.likes;

      // Check for media with highest views
      if (!acc.mediaWithHighestViews || media.views > acc.mediaWithHighestViews.views) {
        acc.mediaWithHighestViews = media.name;
        acc.highestViews = media.views;
      }

      // Check for media with highest likes
      if (!acc.mediaWithHighestLikes || media.likes > acc.mediaWithHighestLikes.likes) {
        acc.mediaWithHighestLikes = media.name;
        acc.highestLikes = media.likes;
      }

      return acc;
    },
    {
      totalViews: 0,
      totalLikes: 0,
      highestViews: 0,
      highestLikes: 0,
      mediaWithHighestViews: "",
      mediaWithHighestLikes: "",
    }
  );
}
