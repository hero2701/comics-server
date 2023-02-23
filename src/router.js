const express = require("express")
const router = express.Router()
const controller = require("./controller")

router.get("/cors/:proxyUrl*", controller.corsAnywhere);

router.get("/recent-comic", controller.listComicsRecent)
router.get("/new-comic", controller.listComicsNew)
router.get("/view-comic", controller.listComicsView)
router.get("/category", controller.listCategory)
router.get("/filter-comics", controller.listComics)

router.get("/info-comic/:cid/:slug", controller.infoComic)
router.get("/info-chapter-comic/:slug/:chapter", controller.infoChapterComic)
router.get("/test", controller.test)

module.exports = router