import { cronJobs } from "convex/server";
import { internal, api } from "./_generated/api";

const crons = cronJobs();

crons.daily(
  "Update analytics",
  {
    hourUTC: 6, // (9:30am Pacific/10:30am Daylight Savings Pacific)
    minuteUTC: 59,
  },
  api.analytic.postOrUpdate
);

export default crons;
