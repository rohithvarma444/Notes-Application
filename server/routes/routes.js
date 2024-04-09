const express= require("express")
const router = express.Router();
const handlers= require('../handlers/handler')

router.get("/", handlers.homepage);
module.exports = router;
