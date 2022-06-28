import { NLT_API_KEY } from "./nlt-credentials";
import { sup, sub } from "subsup";
import { parse } from "himalaya";

export async function getBibleChapterNLT(book, chapter) {
  let response = await fetch(
    `https://api.nlt.to/api/passages?ref=${book}.${chapter}&version=NLT&key=${NLT_API_KEY}`
  );
  let html = await response.text();
  html = html.replace(" <!DOCTYPE html>", "");
  const json = parse(html)[0].children[3];
  let textArr = [];
  extractNltTextObjects(json, textArr, "", "");
  let passage = extractNltText(textArr);
  return passage;
}

function extractNltTextObjects(
  obj,
  textArr,
  parentElement,
  grandParentElement
) {
  if (obj.type === "text") {
    textArr.push({ attributes: grandParentElement, text: obj.content });
  }
  if (obj.children) {
    for (let i = 0; i < obj.children.length; i++) {
      let theGrandParent = parentElement;
      let theParentClass = obj.children[i].attributes;

      extractNltTextObjects(
        obj.children[i],
        textArr,
        theParentClass,
        theGrandParent
      );
    }
  }
}

function extractNltText(arr) {
  return arr
    .map((item) => {
      let cssClass = "";
      if (item.attributes) {
        cssClass = item.attributes.filter((attr) => attr.key === "class");
        cssClass = cssClass.length > 0 ? cssClass[0].value : "";
      }
      // console.log({ cssClass, text: item.text });
      // console.log({ attr: item.attributes, text: item.text });

      if (item.attributes === "") return "";
      if (item.text === "\n") return item.text;
      if (item.attributes.length === 0) return "";

      if (cssClass === "subhead") return item.text + "\n";
      if (cssClass === "vn") return sup(item.text);
      if (cssClass === "bk_ch_vs_header") return "";
      if (cssClass === "cw") return "";
      if (cssClass === "chapter-number") return "";
      if (cssClass === "cw_ch") return "";
      if (cssClass === "a-tn") return "";
      if (cssClass === "tn") return "";
      if (cssClass === "tn-ref") return " ";
      let correctedText = item.text.replace(/&nbsp;/g, " ");
      return correctedText;
    })
    .join("")
    .slice(2);
}
