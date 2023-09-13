import { CronJob } from "cron";
import { config } from "./config";

const cron = new CronJob(config.cronJobExpression, () => {
    // Reserved for cron job
    console.log("Executing cron job once every hour");
});

export { cron };
