# try-or-default

Try to execute a function, or return default value if it fails (exception was rised).
This helper package can be used in an enviroment that exceptions are tolerable.
Where you just want a fallback value to go on and dont really care about handling occured exception.

Work well with Node.js. I didn't try in browser yet.

## Installation

Install using npm

    npm install tryordefault

## Example of usage

### To wrap something that may break, just fallback to default value on failed

```javascript
  const {tryOrDefault} = require('tryordefault');
  
  // in this example, this function which will surely throw an exception
  function functionThatMayFail() {
    return JSON.parse("{]"); 
  }
  
  // basic usage
  let parsedObject = tryOrDefault(
    functionThatMyFail,     // function that has potential exception
    {}                      // default value to be returned when exception occurs
  ));
```

### To define constant

```javascript
  const {tryOrDefault} = require('tryordefault');
  
  //
  // Instead of this ...
  //
  let parsedObject = {};
  try {
    parsedObject = JSON.parse(somethingThatMayBeNotValidJSONString);  
  } catch (e) {}
  
  //
  // Now you can define a const like this
  //
  const parsedObject = tryOrDefault(
    () => JSON.parse(somethingThatMayBeNotValidJSONString),     // function that has potential exception
    {}                                                          // default value to be returned when exception occurs
  ));
```

### To add default value to async function

```javascript
  // use tryOrDefaultAsync function, if you work inside async context or to deal with async function.
  const {tryOrDefaultAsync} = require('tryordefault');
  const puppeteer           = require('puppeteer');
  
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Let's navigate to IMdb,
    // and try to fetch some information about "Justice League" (did u watch it? :3)
    await page.goto('https://www.imdb.com/title/tt0974015/');   
    
    // Try to get the movie title
    // For some reason, if h1 is not there, blank will be returned
    const title = await tryOrDefaultAsync(
        async () => await page.$eval("h1[itemprop='name']", h1 => h1.innerText),
        ""
    );
    
    // Try to get the release year
    // some title on imdb doesn't have #titleYear, so it's be better to fallback to blank string
    // You may also want to take advantage of the function, to define constant
    const year = await tryOrDefaultAsync(
        async () => await page.$eval("#titleYear", yearEl => yearEl.innerText),
        ""
    );
    
    console.log({
      title: title,
      year:  year
    })

    await browser.close();
  })();
```
