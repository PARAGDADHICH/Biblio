const cheerio = require("cheerio");
import { NextRequest, NextResponse } from 'next/server'
import { Element } from 'cheerio';

export const POST = async (req: NextRequest, res: NextResponse)=> {
    const body = await req.json();
    const scrapeURL =body.queryURL.split("?")[0];
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
      const image = $(
        "div[itemtype = 'http://schema.org/Person'] > div > a > img"
      ).attr("src");
      const name = $("h1.authorName > span").text();
      const website = $("div.dataItem > a[itemprop = 'url']").text();
      const genre = $("div.dataItem > a[href*= '/genres/']")
        .map((i:number, el: Element) => $(el).text())
        .get();
      const influences = $("div.dataItem > span a[href*= '/author/']")
        .map((i:number, el: Element) => {
          const $el = $(el);
          const author = $el.text();
          const url = $el.attr("href");
          const id = i + 1;
          return {
            id: id,
            author: author,
            url: url,
          };
        })
        .toArray();
      const birthDate = $(
        "div.rightContainer > div[itemprop = 'birthDate']"
      ).text();
      const deathDate = $(
        "div.rightContainer > div[itemprop = 'deathDate']"
      ).text();
      const desc = $(".aboutAuthorInfo > span").html();
      const books = $("table.stacked> tbody > tr")
        .map((i:number, el: Element) => {
          const $el = $(el);
          const cover = $el.find("td > a > img").attr("src");
          const title = $el.find("td:nth-child(2) > a > span").text();
          const url = $el.find("td:nth-child(2) > a").attr("href");
          const rating = $el
            .find("td:nth-child(2) > div > span > span")
            .text()
            .replace("—", "From")
            .replace(",", "");
          const publishDate = $el.find("td:nth-child(2) > div > span").text();
          const id = i + 1;
          return {
            id: id,
            cover: cover,
            title: title,
            url: url,
            rating: rating,
            publishDate: publishDate,
          };
        })
        .toArray();

      const series = $(
        ".bigBoxBody > div > div[itemtype = 'http://schema.org/BookSeries']"
      )
        .map((i:number, el: Element) => {
          const $el = $(el);
          const cover = $el.find("div.seriesCovers > a > img").attr("src");
          const title = $el
            .find("div.seriesDesc > span[itemprop = 'name'] > a")
            .text();
          const seriesURL = $el
            .find("div.seriesDesc > span[itemprop = 'name'] > a")
            .attr("href");
          const author = $el
            .find("div.seriesDesc > span[itemprop = 'author'] > div > a > span")
            .html();
          const authorURL = $el
            .find("div.seriesDesc > span[itemprop = 'author'] > div > a")
            .attr("href")
            .replaceAll("https://www.goodreads.com", "");
          const rating = $el
            .find("div.seriesDesc > span.greyText.smallText.uitext > span")
            .text();
          const id = i + 1;

          return {
            id: id,
            cover: cover,
            title: title,
            seriesURL: seriesURL,
            author: author,
            authorURL: authorURL,
            rating: rating,
          };
        })
        .toArray();

      const lastScraped = new Date().toISOString();


      const respData = {
        status: "Received",
        source: "https://github.com/PARAGDADHICH/",
        scrapeURL: scrapeURL,
        image: image,
        name: name,
        website: website,
        genre: genre,
        influences: influences,
        birthDate: birthDate,
        deathDate: deathDate,
        desc: desc,
        books: books,
        series: series,
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

