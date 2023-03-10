require("colors");
const { crawlCurrentPage } = require("./crawl");
async function main() {
  if (process.argv.length < 3) {
    console.log("Please Provide argument".red.underline);
    process.exit(1);
  }
  console.log("crawler starting....".green);
  // const baseUrl = process.argv[2];
  const baseUrl = "https://google.com";
  const pages = await crawlCurrentPage(baseUrl, baseUrl, {});
  console.log(pages);
}

main();
