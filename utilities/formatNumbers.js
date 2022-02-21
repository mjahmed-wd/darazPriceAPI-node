function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Convert a number to a string with commas taking into account decimal point
function numberWithoutCommasDecimal(x) {
    return +x.toString().replace(",","");
}

module.exports ={ numberWithCommas, numberWithoutCommasDecimal}