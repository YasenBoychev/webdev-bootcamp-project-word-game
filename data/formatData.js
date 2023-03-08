const fs = require('fs');
const os = require('os');

// Word lists (one word per line)
const wordsList = "dictionary.txt"; // The words to include
const excludeWords = null; // List of words to filter out of wordsList. Set to null to ignore

try {
  // Returns a string with the contents
  let data = fs.readFileSync(wordsList, "utf8");

  // Remove the README part (Specific to wordsList)
  data = data.slice((data.indexOf("START") + 5), data.length);

  // Split the string at new line characters into an array of words
  data = data.split(/\r?\n/);
  console.log("Length of raw data: ", data.length);

  // Read the list of words to exclude
  let exclude = [];
  if (excludeWords !== null) {
    try {
      // Returns a string with the contents
      exclude = fs.readFileSync(excludeWords, "utf8");

      // Split the string at new line characters into an array of words
      exclude = exclude.split(/\r?\n/);
      exclude = exclude.map(word => word.toUpperCase());
      console.log("Length of 'exclude' list: ", exclude.length);
    } catch (error) {
      console.log(error);
    }
  }

  // Organise the data -- save the data to an object where the key is the word ID
  let normalisedData = {};
  let nextID = 1;
  let excludedLength = 0;
  for (let word of data) {

    // Clean the data
    // -- Remove words that are less than 3 and more than 16 characters long
    if (word.length >= 3 && word.length <= 16) {

      if (exclude.includes(word.toUpperCase())) {
        excludedLength++;
        continue;
      }
      // Add the word
      normalisedData[nextID] = word.toUpperCase();
      nextID++;
    }
  }
  console.log("Length of cleaned data: ", (nextID - 1));
  console.log("Number of excluded words: ", excludedLength);

  // Save the word data to a JSON file
  console.log("SAVING WORDS...");
  try {
    fs.writeFileSync("words.json", JSON.stringify(normalisedData));
  } catch (err) {
    console.error(err);
  }

  // Save the data to a text file one word per line
  let filteredData = Object.values(normalisedData).join(os.EOL);
  try {
    fs.writeFileSync("filteredData.txt", filteredData);
  } catch (err) {
    console.error(err);
  }

  console.log("FINISHED");
} catch (err) {
  console.error(err);
}