const jsdom = require("jsdom");
const axios = require("axios");
const { JSDOM } = jsdom;
const crawlCurrentPage = async (currentURL) => {
  console.log(currentURL);
  try {
    const response = await axios.get(currentURL);
    if (response.headers["Cotent-Type"].includes("text/html")) {
      console.log(getURLsFromHtml(response.data, currentURL));
    }
    return;
  } catch (err) {
    console.log(err);
    console.log(`Error Occured : ${err.message}`);
  }
};
const getURLsFromHtml = function (htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody, {
    url: baseURL,
  });
  const aTags = dom.window.document.body.querySelectorAll("a");
  aTags.forEach((a) => {
    urls.push(a.href);
  });

  return urls;
};

const normalizeUrl = function (urlString) {
  const url = new URL(urlString);
  let urlHostName = url.hostname + url.pathname;
  if (urlHostName.length > 0 && urlHostName.slice(-1) == "/") {
    urlHostName = urlHostName.slice(0, urlHostName.length - 1);
  }
  return urlHostName;
};
module.exports = {
  normalizeUrl,
  getURLsFromHtml,
  crawlCurrentPage,
};
