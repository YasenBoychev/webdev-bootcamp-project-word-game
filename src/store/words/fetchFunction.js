// This function is used in wordsSlice.js to fetch the public/data/words.json file

export default function fetchFunction(resource) {
  return async () => {
    let data;
    try {
      const response = await fetch(resource);
      data = await response.json();
      if (response.ok) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data);
    }
  }
}