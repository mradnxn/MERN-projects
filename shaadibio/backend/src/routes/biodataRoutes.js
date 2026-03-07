const express = require("express");
const router = express.Router();
const {createBiodata, getMyBiodatas, getBiodataById, updateBiodata} = require("../controllers/biodataController");
const {protect} = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

router.post("/",protect,upload.single("profilePhoto"),createBiodata);
router.get("/",protect,getMyBiodatas);
router.get("/:id",protect,getBiodataById);
router.put("/:id",protect,upload.single("profilePhoto"),updateBiodata);

module.exports = router;