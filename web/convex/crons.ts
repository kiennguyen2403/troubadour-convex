import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();

// crons.hourly(
//   "Update analytics",
//   {
//     minuteUTC: 9,
//   },
//   api.analytic.postOrUpdate
// );

crons.daily(
  "Update analytics",
  {
    hourUTC: 7, // (6pm Australia)
    minuteUTC: 0,
  },
  api.analytic.postOrUpdate
);

export default crons;
