"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");
const urlParams = new URLSearchParams(window.location.search);




// Simulate pressing the Enter key
  
const inputValue = urlParams.get('inputValue');
address.value = inputValue;


// Add a submit event listener to the form
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }
  
  // Get the filled out value from the 'uv-address' input
  const inputAddressValue = address.value;

  // Create the search URL using the filled out value and search engine
  const url = search(inputAddressValue, searchEngine.value);

  // Redirect to the URL
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});
setTimeout(function() {
  form.submit()
}, 2000);

