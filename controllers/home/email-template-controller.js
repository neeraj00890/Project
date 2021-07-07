const express = require("express");
const router = express.Router();
const EmailTemplate = require("../../models/email-template")
const EmailCron = require("../../models/email-crons")
const {ResponseEntity} = require("../../dtos/response-entiry")


router.post("/create", async (req, res, next) => {
    await EmailTemplate.create(req.body)
    const response = ResponseEntity.getInstance("Template Created Successfully", req.body)
    res.status(201).send(response);
})

router.post("/cron-create", async (req, res, next) => {
    console.log(req.body);
    await EmailCron.create(req.body)
    const response = ResponseEntity.getInstance("Cron Created Successfully", req.body)
    res.status(201).send(response);
})

router.get("/email-templates", async (req, res, next) => {
    const emailTemplates = await EmailTemplate.find({})
    const response = ResponseEntity.getInstance("Email Templates...", emailTemplates)
    res.status(200).send(response);
})



module.exports = router;