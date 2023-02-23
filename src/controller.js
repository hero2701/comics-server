const model = require('./model')
const corsAnywhere = require("cors-anywhere");
const Model = require('./model');

let proxy = corsAnywhere.createServer({
    originWhitelist: [],
    requireHeaders: [],
    removeHeaders: [],
    setHeaders: {
      referer: "https://goctruyentranhvui.com/",
    },
  });
class Controller {
    static async listComicsRecent(req, res,next){
        const param = req.query.p || 1
        try {
            const list = await Model.listComicsRecent(req.query.p)
            res.json(list)
        } catch (error) {
            next(error)
        }
    }

    static async listComicsNew(req, res,next){
        const param = req.query.p || 1
        try {
            const list = await Model.listComicsNew(req.query.p)
            res.json(list)
        } catch (error) {
            next(error)
        }
    }

    static async listComicsView(req, res,next){
        const param = req.query.p || 1
        try {
            const list = await Model.listComicsView(req.query.p)
            res.json(list)
        } catch (error) {
            next(error)
        }
    }


    static async listCategory(req, res,next){
        try {
            const list = await Model.listCategory()
            res.json(list)
        } catch (error) {
            next(error)
        }
    }

    static async listComics(req, res,next){
        const p = req.query.p || 0
        const value = req.query.value
        try {
            const list = await Model.listComics(p, value)
            res.json(list)
        } catch (error) {
            next(error)
        }
    }

    static async infoComic(req, res,next){
        const {cid,slug} = req.params
        try {
            const list = await Model.infoComic(cid,slug)
            res.json(list)
        } catch (error) {
            next(error)
        }
    }

    static async infoChapterComic(req, res,next){
        const {slug,chapter} = req.params
        try {
            const list = await Model.infoChapterComic(slug,chapter)
            res.json(list)
        } catch (error) {
            next(error)
        }
    }

    static async test(req, res,next) {
        try{        
            res.json({success:true,data:"hi"})
        } catch(err){
            next(err)
        }
    }
    static async corsAnywhere(req, res) {
        req.url = req.url.replace("/cors/", "/");
        proxy.emit("request", req, res);
    }

}

module.exports =  Controller