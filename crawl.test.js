const { test, expect } = require("@jest/globals");
const { normalizeUrl, getURLsFromHtml } = require("./crawl");

test("normalze url strip protcol", () => {
  const actual = normalizeUrl("https://facebook.com/path");
  const expected = "facebook.com/path";
  expect(actual).toEqual(expected);
});
test("normalize url tralling /", () => {
  const actual = normalizeUrl("https://facebook.com/path/");
  const expected = "facebook.com/path";
  expect(actual).toEqual(expected);
});
test("normalize url to lower case", () => {
  const actual = normalizeUrl("https://FACEBOOK.com/path/");
  const expected = "facebook.com/path";
  expect(actual).toEqual(expected);
});
test("get urls absolute", () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/">
                    Boot.dev blog
                </a>
            </body>
        </html>
    `;
  const expected = ["https://blog.boot.dev/"];
  const actual = getURLsFromHtml(inputHTMLBody, "https://blog.boot.dev");
  expect(actual).toEqual(expected);
});
test("get urls relative", () => {
  const inputHTMLBody = `
        <html>
            <body>
                <a href="/path">
                    Boot.dev blog
                </a>
            </body>
        </html>
    `;
  const expected = ["https://blog.boot.dev/path"];
  const actual = getURLsFromHtml(inputHTMLBody, "https://blog.boot.dev");
  expect(actual).toEqual(expected);
});
