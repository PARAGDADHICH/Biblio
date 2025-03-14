const cheerio = require("cheerio");
import { NextRequest, NextResponse } from "next/server";
import { Element } from "cheerio";
import { groq } from "next-sanity";
import { client } from "../../../../sanity/lib/client";

export const POST = async (req: any, res: any) => {
  const body = await req.json();
  const scrapeURL = body.queryURL.split("?")[0];
  if (body?.bookId) {
    try {
      const query = groq`*[_type == 'book' && id == $bookId] {
        data
      }`;
      // console.log(curLang);
      const res = await client.fetch(query, { bookId: body.bookId });

      if (res && res[0]?.data) {
        // console.log("Returning ")
        // console.log("Book data from api", JSON.parse(res[0]?.data));
        return NextResponse.json(JSON.parse(res[0]?.data));
      }
      // console.log("not returnig form sanity")
    } catch (e) {
      console.log("Error in fetching from sanity ",e);
    }
  }
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
    const cover = $(".ResponsiveImage").attr("src");
    const series = $("h3.Text__italic").text();
    const seriesURL = $("h3.Text__italic > a").attr("href");
    const workURL = $('meta[property="og:url"]').attr("content");
    const title = $('h1[data-testid="bookTitle"]').text();
    const author = $(".ContributorLinksList > span > a")
      .map((i: number, el: Element) => {
        const $el = $(el);
        const name = $el.find("span").text();
        const url = $el.attr("href").replace("https://www.goodreads.com", "");
        const id = i + 1;
        return {
          id: id,
          name: name,
          url: url,
        };
      })
      .toArray();
    const rating = $("div.RatingStatistics__rating").text().slice(0, 4);
    const ratingCount = $('[data-testid="ratingsCount"]')
      .text()
      .split("rating")[0];
    const reviewsCount = $('[data-testid="reviewsCount"]').text();
    const desc = $('[data-testid="description"]').text();
    const genres = $('[data-testid="genresList"] > ul > span > span')
      .map((i: number, el: Element) =>
        $(el).find("span").text().replace("Genres", "")
      )
      .get();
    const bookEdition = $('[data-testid="pagesFormat"]').text();
    const publishDate = $('[data-testid="publicationInfo"]').text();
    const related = $("div.DynamicCarousel__itemsArea > div > div")
      .map((i: number, el: Element) => {
        const $el = $(el);
        const title = $el
          .find('div > a > div:nth-child(2) > [data-testid="title"]')
          .html();
        const author = $el
          .find('div > a > div:nth-child(2) > [data-testid="author"]')
          .html();
        const src = $el
          .find("div > a > div:nth-child(1) > div > div > img")
          .attr("src");
        const url = $el
          .find("div > a")
          .attr("href")
          .replace("https://www.goodreads.com", "");
        const id = i + 1;
        return {
          id: id,
          src: src,
          title: title,
          author: author,
          url: url,
        };
      })
      .toArray();

    const rating5 = $(
      ".ReviewsSectionStatistics__histogram > div > div:nth-child(1) > div:nth-child(3)"
    )
      .text()
      .split("(")[0]
      .replace(" ", "");
    const rating4 = $(
      ".ReviewsSectionStatistics__histogram > div > div:nth-child(2) > div:nth-child(3)"
    )
      .text()
      .split("(")[0]
      .replace(" ", "");
    const rating3 = $(
      ".ReviewsSectionStatistics__histogram > div > div:nth-child(3) > div:nth-child(3)"
    )
      .text()
      .split("(")[0]
      .replace(" ", "");

    const rating2 = $(
      ".ReviewsSectionStatistics__histogram > div > div:nth-child(4) > div:nth-child(3)"
    )
      .text()
      .split("(")[0]
      .replace(" ", "");

    const rating1 = $(
      ".ReviewsSectionStatistics__histogram > div > div:nth-child(5) > div:nth-child(3)"
    )
      .text()
      .split("(")[0]
      .replace(" ", "");

    const reviewBreakdown = {
      rating5: rating5,
      rating4: rating4,
      rating3: rating3,
      rating2: rating2,
      rating1: rating1,
    };

    const reviews = $(".ReviewsList > div:nth-child(2) > div")
      .filter(Boolean)
      .map((i: number, el: Element) => {
        const $el = $(el);
        const image = $el
          .find("div > article > div > div > section > a > img")
          .attr("src");
        const author = $el
          .find(
            "div > article > div > div > section:nth-child(2) > span:nth-child(1) > div > a"
          )
          .text();
        const date = $el
          .find("div > article > section > section:nth-child(1) > span > a")
          .text();
        const stars = $el
          .find("div > article > section > section:nth-child(1) > div > span")
          .attr("aria-label");
        const text = $el
          .find(
            "div > article > section > section:nth-child(2) > section > div > div > span"
          )
          .html();
        const likes = $el
          .find(
            "div > article > section > footer > div > div:nth-child(1) > button > span"
          )
          .text();
        const id = i + 1;

        return {
          id: id,
          image: image,
          author: author,
          date: date,
          stars: stars,
          text: text,
          likes: likes,
        };
      })
      .toArray();

    const quotes = $(
      "div.BookDiscussions > div.BookDiscussions__list > a.DiscussionCard:nth-child(1) > div.DiscussionCard__middle > div.DiscussionCard__stats"
    ).text();
    const quotesURL = $(
      "div.BookDiscussions > div.BookDiscussions__list > a.DiscussionCard:nth-child(1)"
    ).attr("href");

    const questions = $(
      "div.BookDiscussions > div.BookDiscussions__list > a.DiscussionCard:nth-child(3) > div.DiscussionCard__middle > div.DiscussionCard__stats"
    ).text();
    const questionsURL = $(
      "div.BookDiscussions > div.BookDiscussions__list > a.DiscussionCard:nth-child(3)"
    ).attr("href");
    const lastScraped = new Date().toISOString();
    {
      title === "" ? (res.statusCode = 504) : (res.statusCode = 200);
    }

    /// saving to Sanity ////////////////////////////

    const respObj = {
      status: "Received",
      statusCode: res.statusCode,
      source: "https://github.com/PARAGDADHICH/",
      scrapeURL: scrapeURL,
      cover: cover,
      series: series,
      seriesURL: seriesURL,
      workURL: workURL,
      title: title,
      author: author,
      rating: rating,
      ratingCount: ratingCount,
      reviewsCount: reviewsCount,
      desc: desc,
      genres: genres,
      bookEdition: bookEdition,
      publishDate: publishDate,
      related: related,
      reviewBreakdown: reviewBreakdown,
      reviews: reviews,
      quotes: quotes,
      quotesURL: quotesURL,
      questions: questions,
      questionsURL: questionsURL,
      lastScraped: lastScraped,
    };

    if (body?.bookId) {
      // console.log("Insied saving data of book")
      try {
        const book = await client.fetch(
          '*[_type == "book" && id == $bookId][0]',
          {
            bookId: body.bookId,
          }
        );
        if (book) {
          const updatedBook = Object.assign({}, book, {
            data: JSON.stringify(respObj),
          });
          // console.log(updatedBook);
          const response = await client.createOrReplace(updatedBook);
          //   console.log("Operation completed:", response);
        } else {
          // Document does not exist, create a new document with the given ID and add the summary
          // console.log("New book")
          const newBook = {
            id: body?.bookId,
            _type: "book",
            summaries: [],
            audios: [],
            data: JSON.stringify(respObj),
          };
          const response = await client.create(newBook);
          //   console.log("Operation completed new book:", response);
        }
      } catch (e) {
        console.log("Error in saving data in sanity ", e);
      }
    }
    console.log("Returning scraped data")
    return NextResponse.json({
      status: "Received",
      statusCode: res.statusCode,
      source: "https://github.com/PARAGDADHICH/",
      scrapeURL: scrapeURL,
      cover: cover,
      series: series,
      seriesURL: seriesURL,
      workURL: workURL,
      title: title,
      author: author,
      rating: rating,
      ratingCount: ratingCount,
      reviewsCount: reviewsCount,
      desc: desc,
      genres: genres,
      bookEdition: bookEdition,
      publishDate: publishDate,
      related: related,
      reviewBreakdown: reviewBreakdown,
      reviews: reviews,
      quotes: quotes,
      quotesURL: quotesURL,
      questions: questions,
      questionsURL: questionsURL,
      lastScraped: lastScraped,
    });
  } catch (error) {
    console.error("An error has occurred with the scraper.", error);
    return NextResponse.json(
      {
        status: "Error - Invalid Query",
        scrapeURL: scrapeURL,
      },
      {
        status: 404,
      }
    );
  }
};
