import {text } from "./htmlpage.js"

const matchingData = text.match("var pdpTrackingData = (\"{.*}\")")
const productData = JSON.parse((matchingData["0"].match("(\"{.*}\")")["0"]).substring(1, productData.length-1))

console.log(productData); // 👉️ test

// console.log(productData)