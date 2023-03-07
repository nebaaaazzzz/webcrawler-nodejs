const jsdom = require("jsdom");
const axios = require("axios");
const { JSDOM } = jsdom;
const crawlCurrentPage = async (baseUrl, currentURL, pages) => {
  const baseURLObj = new URL(baseUrl);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname != currentURLObj.hostname) {
    return pages;
  }
  const normalizedUrl = normalizeUrl(currentURL);
  if (pages[normalizedUrl] > 0) {
    pages[normalizedUrl]++;
    return pages;
  }
  pages[normalizedUrl] = 1;
  console.log("actively crawling : ".green, currentURL);
  try {
    const response = await axios.get(currentURL);
    if (!response.headers["content-type"].includes("text/html")) {
      return;
    }
    const nextUrls = getURLsFromHtml(response.data, baseUrl);
    for (const nextUrl of nextUrls) {
      pages = await crawlCurrentPage(baseUrl, nextUrl, pages);
    }
  } catch (err) {
    console.log(`Error Occured : ${err.message}`);
  }

  return pages;
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
  try {
    const url = new URL(urlString);
    let urlHostName = url.hostname + url.pathname;
    if (urlHostName.length > 0 && urlHostName.slice(-1) == "/") {
      urlHostName = urlHostName.slice(0, urlHostName.length - 1);
    }
    return urlHostName;
  } catch (err) {
    console.log("----", err);
  }
};
module.exports = {
  normalizeUrl,
  getURLsFromHtml,
  crawlCurrentPage,
};
