import {text } from "./htmlpage.js"

const matchingData = text.match("var pdpTrackingData = (\"{.*}\")")
const productData = (matchingData["0"].match("(\"{.*}\")")["0"])



const replaced = JSON.parse(productData.substring(1, productData.length-1));
console.log(replaced); // 👉️ test

// console.log(productData)