const cheerio = require("cheerio");
import { NextRequest, NextResponse } from 'next/server'
import { Element } from 'cheerio';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body: { queryURL: string; page: number } = await req.json();
    // The default sort is by popularity
    // Use the URL parameter "per_page" to get 100 instead of the default 30 books
    const scrapeURL =body.queryURL.split("&")[0] + `?page=${body.page}&per_page=100`;
    try {
      const response = await fetch(`${scrapeURL}`, {
        method: "GET",
        headers: new Headers({
          "User-Agent":
            process.env.NEXT_PUBLIC_USER_AGENT ||
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        }),
      });

      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const title = $("div.mainContentFloat > h1").text();
      /*       
      const author = $("div.leftContainer > div > a.authorName").text();
      const authorURL = $("div.leftContainer > div > a.authorName").attr(
        "href"
      );
      const authorIMG = $("div.leftContainer > a > img").attr("src"); 
      */
      const desc = $("div.leftContainer > div:nth-child(2)").text();
      const books = $("tbody > tr")
        .map((i:number, el: Element)=> {
          const $el = $(el);
          const cover = $el.find("td > a > img.bookCover").attr("src");
          const title = $el.find("td > a > span").text();
          const bookURL = String($el.find("td > a").attr("href"));
          const author = $el
            .find("td > span[itemprop = 'author'] > div > a > span")
            .text();
          const authorURL = String($el
            .find("td > span[itemprop = 'author'] > div > a")
            .attr("href"));
          const rating = $el
            .find("td > div > span.greyText.smallText.uitext > span")
            .text();
          const id = i + 1;
          return {
            id: id,
            cover: cover,
            title: title,
            bookURL: bookURL,
            author: author,
            authorURL: authorURL,
            rating: rating,
          };
        })
        .toArray();
      const previousPage = $(
        "div.leftContainer > div[style='float: right'] > div > a.previous_page"
      ).attr("href");
      const nextPage = $(
        "div.leftContainer > div[style='float: right'] > div > a.next_page"
      ).attr("href");
      const lastScraped = new Date().toISOString();

      const respData = {
        status: "Received",
        source: "https://github.com/PARAGDADHICH/",
        scrapeURL: scrapeURL,
        title: title,
        desc: desc,
        books: books,
        previousPage: previousPage,
        nextPage: nextPage,
        lastScraped: lastScraped,
      }
      return NextResponse.json(
        {message: "ok", respData},
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1800',
          }
        }
      )

    } catch (error) {
      console.error("An error has occurred with the scraper.");
      return NextResponse.json(
        {
          status: "Error - Invalid Query",
          scrapeURL: scrapeURL,
        },
        {
          status: 404
        }
      )
      
    }
  
};
