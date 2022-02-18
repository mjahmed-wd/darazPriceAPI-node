function removeEmptyParams(query) {
    return query.replace(/[^=&]+=(?:&|$)/g, "");
  }
  
  const testQuery = "f=1&search=&state_id=2&hji=99&foo=&bar=12";
  console.info(removeEmptyParams(testQuery));