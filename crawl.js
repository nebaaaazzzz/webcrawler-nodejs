const jsdom = require("jsdom");
const { JSDOM } = jsdom;
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
};
