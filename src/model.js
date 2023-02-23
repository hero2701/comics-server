const { default: axios } = require("axios");
const { JSDOM } = require("jsdom");

const WEB_URL = "https://goctruyentranhvui.com";

const WEB_API = "https://goctruyentranhvui.com/api";

const instance = axios.create({
  baseURL: WEB_API,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Referer: "https://goctruyentranhvui.com",
  },
});

class Model {
  static async listComicsRecent(page) {
    const URL = `/comic/search/recent?p=${page}`;
    const { data } = await instance.get(URL);
    return data;
  }

  static async listComicsNew(page) {
    const URL = `/comic/search/new?p=${page}`;
    const { data } = await instance.get(URL);
    return data;
  }

  static async listComicsView(page) {
    const URL = `/comic/search/view?p=${page}`;
    const { data } = await instance.get(URL);
    return data;
  }

  static async listCategory() {
    const URL = `/category`;
    const { data } = await instance.get(URL);
    return data;
  }

  static async listComics(p, value) {
    const URL = `/comic/search/category?p=${p}&value=${value}`;
    const { data } = await instance.get(URL);
    return data;
  }

  static async listChapComic(id) {
    const URL = `/comic/${id}/chapter`;
    const { data } = await instance.get(URL);
    return data;
  }

  static async infoComic(cid,slug) {
    const { data } = await axios.get(`${WEB_URL}/truyen/${slug}`);
    const { window } = new JSDOM(data);
    const { document } = window;
    const parent = document.querySelector(".comic-detail-section")
    const name = parent.querySelector(".title h1").textContent.trim();
    const otherName = parent.querySelector(".other h2").textContent.trim();
    const auth = parent.querySelector(".author").textContent.trim();
    const status = parent.querySelector(".status").textContent.trim();
    const latest = parent.querySelector(".latest").textContent.trim();
    const evaluate = parent.querySelector(".evaluate div").textContent.trim();
    const description  = parent.querySelector(".description div").textContent.trim();
    const img = parent.querySelector(".photo img").getAttribute("src");
    // const slug = urlToSlug(url);
    const chap =await this.listChapComic(cid)
    return { name, otherName, auth, status, latest,evaluate, description, img, chap};
  }

  static async infoChapterComic(slug,chapter) {
    const { data } = await axios.get(`${WEB_URL}/truyen/${slug}/${chapter}`);
    const { window } = new JSDOM(data);
    const { document } = window;
    const items = document.querySelectorAll(".view-section .viewer")
    const item = [...items].map(item => {
        const img = item.querySelector("img").getAttribute("src")
        return {img}
    }) 
    return {image : item , length : item.length}
  }

}

module.exports = Model;
