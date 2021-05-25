/* 
index.js file: 
  imports our major component (app.js),
  any other custom components, and
  stylesheets. And runs the app (App.init).
*/

import App from './App.js' // bring in the App object exported in the App.js file

// components (custom web components) ------------
// these components are now accessible in any page view
import './components/va-app-header' // top menu and slide out menu (main)
import './components/va-listing-card' // creates card for each listing result on Explore view

// styles ----------------------------------------
// (master file brings in all styles for the app)
import './scss/master.scss'

// app.init --------------------------------------
  /* 
  Where the app is actually 'fired' from:
    Running the .init method on the App object
    sets up the whole app, router, inserts the pages, etc 
  */
 // Waits for DOM content to be loaded before manipulating it.
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})