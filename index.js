import {text } from "./htmlpage.js"

const matchingData = text.match("var pdpTrackingData = (\"{.*}\")")

console.log(typeof matchingData["0"])