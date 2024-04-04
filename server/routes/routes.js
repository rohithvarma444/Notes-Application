const express= require("express")
const router = express.Router();
const handlers= require('../handlers/handler')

router.get("/", handlers.homepage);
router.get("/about",handlers.about);
module.exports = router;
