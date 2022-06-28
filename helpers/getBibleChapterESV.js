import { ESV_API_KEY } from "./esv-credentials";
import { sup, sub } from "subsup";
import { BIBLE } from "../data/bible";

export async function getBibleChapterESV(book, chapter) {
  // The API treats single-chapter books differently.
  let theChapter = hasOnlyOneChapter(book) ? "" : chapter;

  let response = await fetch(
    `https://api.esv.org/v3/passage/text/?q=${book}+${theChapter}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: ESV_API_KEY,
      },
    }
  );

  let data = await response.json();
  let lines = data.passages[0].split("\n");
  lines = lines.splice(2);
  let passage = lines.join("\n");
  passage = passage
    .split(" ")
    .map((word) => (word.match(/[[0-9]*]/) ? sup(word) : word))
    .join(" ");
  return passage;
}

// The ESV API handles single-chapter books differently for its required API
// query string. You have to omit the chapter argument in the request, otherwise
// it will only give you the first verse of chapter 1.
function hasOnlyOneChapter(book) {
  return BIBLE.filter((item) => item.book === book)[0].numChapters === 1;
}
