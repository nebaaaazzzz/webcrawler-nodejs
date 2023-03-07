require("colors");
const { crawlCurrentPage } = require("./crawl");
function main() {
  if (process.argv.length < 3) {
    console.log("Please Provide argument".red.underline);
    process.exit(1);
  }
  console.log("crawler starting....".green);
  const baseUrl = process.argv[2];
  crawlCurrentPage(baseUrl);
}

main();
