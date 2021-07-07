const CronJob = require("cron").CronJob;
const EmailCron = require("../models/email-crons") 

const jobs = [];

function functionResolveUsers(type) {
    if(type == "WELCOME USER") {
        return ["welcome users"]
    } else if(type === "REGISTER USER") {
        return ["Register users"]
    } else if(type === "FORGOT USER") {
        return ["Forgot users"]
    }
}


const initializeCronJobs = async () => {
   const crons = await  EmailCron.find({}).populate("emailTemplate");
   crons.forEach(
       (cron) => {
           console.log("Schedulling jon for :"+cron.emailTemplate.type+ "for" + cron.cronPeriod);
           const job  = new CronJob(cron.cronPeriod, ()=> {
               const users =  functionResolveUsers(cron.emailTemplate.type);
               console.log("Sending mail to", users);
           });
           jobs.push(job);
           job.start();
       }
   )
   console.log(jobs[0].stop);

}

module.exports = initializeCronJobs