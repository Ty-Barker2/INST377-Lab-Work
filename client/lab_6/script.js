/* eslint-disable max-len */

/*
  Hook this script to index.html
  by adding `<script src="script.js">` just before your closing `</body>` tag
*/

/*
  ## Utility Functions
    Under this comment place any utility functions you need - like an inclusive random number selector
    
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
function filterList(list,query) {   
  return list.filter((item) => {
    const lowerCaseName = item.name.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    return lowerCaseName.includes(lowerCaseQuery)
  })}
function getRandomIntinclusive(min,max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max-min+1) - min)
}

function injectHTML(list) {
  console.log('fired injectHTML');
  const target = document.querySelector('.restaurant_list');
  target.innerHTML = '';
  list.forEach((item) => {
    const str = `<li>${item.name}</li>`;
    target.innerHTML += str;
    
  });
  /*
  ## JS and HTML Injection
    There are a bunch of methods to inject text or HTML into a document using JS
    Mainly, they're considered "unsafe" because they can spoof a page pretty easily
    But they're useful for starting to understand how websites work
    the usual ones are element.innerText and element.innerHTML
    Here's an article on the differences if you want to know more:
    https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext

  ## What to do in this function
    - Accept a list of restaurant objects
    - using a .forEach method, inject a list element into your index.html for every element in the list
    - Display the name of that restaurant and what category of food it is
*/
}

function cutRestaurantList(list) {
  console.log('fired cut list');
  const range = [...Array(15).keys()];
  return newArray = range.map((item) =>{
    const index = getRandomIntinclusive(0, list.length - 1);
    return list[index]
  })

  /*
    ## Process Data Separately From Injecting It
      This function should accept your 1,000 records
      then select 15 random records
      and return an object containing only the restaurant's name, category, and geocoded location
      So we can inject them using the HTML injection function

      You can find the column names by carefully looking at your single returned record
      https://data.princegeorgescountymd.gov/Health/Food-Inspection/umjn-t2iz

    ## What to do in this function:

    - Create an array of 15 empty elements (there are a lot of fun ways to do this, and also very basic ways)
    - using a .map function on that range,
    - Make a list of 15 random restaurants from your list of 100 from your data request
    - Return only their name, category, and location
    - Return the new list of 15 restaurants so we can work on it separately in the HTML injector
  */
}

async function mainEvent() { // the async keyword means we can make API requests

  const form = document.querySelector('.main_form'); // This class name needs to be set on your form before you can listen for an event on it
  const filterButton = document.querySelector('#filter_button');
  const loadDataButton = document.querySelector('#data_load');
  const generateListButton = document.querySelector('#generate');

  const loadAnimation = document.querySelector("#data_load_animation");
  loadAnimation.style.display = "none";

  let currentList = [];

  loadDataButton.addEventListener('click', async (submitEvent) => { // async has to be declared on every function that needs to "await" something
        console.log('loading data'); // this is substituting for a "breakpoint"
        loadAnimation.style.display = 'inline-block';

    // Basic GET request - this replaces the form Action
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
    currentList = await results.json();
    loadAnimation.style.display = "none";
    console.table(currentList); 

    
  /*
  // As a next step, log the first entry from your returned array of data.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
  console.log(`replace me with the first entry`);

  // Now write a log using string interpolation - log out the name and category of your first returned entry (index [0]) to the browser console
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
  console.log(`replace me with the name and category of the first entry`);

  // This IF statement ensures we can't do anything if we don't have information yet
  if (arrayFromJson?.length > 0) { // the question mark in this means "if this is set at all"
    submit.style.display = 'block'; // let's turn the submit button back on by setting it to display as a block when we have data available

    // And here's an eventListener! It's listening for a "submit" button specifically being clicked
    // this is a synchronous event event, because we already did our async request above, and waited for it to resolve
    form.addEventListener('submit', (submitEvent) => {
      // Using .preventDefault, stop the page from refreshing when a submit event happens
      // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault

      // This constant will contain the value of your 15-restaurant collection when it processes
      const restaurantList = processRestaurants(arrayFromJson);

      // And this function call will perform the "side effect" of injecting the HTML list for you
      injectHTML(restaurantList);
    });*/
  });

  filterButton.addEventListener('click', (event) =>{
    console.log('clicked');
    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);
    console.log(formProps) 
    const newList = filterList(currentList, formProps.resto);
    console.log(newList);
    injectHTML(newList);

  })

  generateListButton.addEventListener('click', (event) =>{
    console.log('Generate')
    const restaurantList = cutRestaurantList(currentList);
    injectHTML(restaurantList)
  })
}

/*
  This last line actually runs first!
  It's calling the 'mainEvent' function at line 57
  It runs first because the listener is set to when your HTML content has loaded
*/
document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests
