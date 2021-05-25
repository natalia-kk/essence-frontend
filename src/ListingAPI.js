// Listing API.js file - responsible for communicating with our BACKEND API (routes/listing.js)
  // communicates with the Listing collection
  // any page view that needs to communicate with the Listing collection in DB will refer to methods in this API file
  // e.g. Explore page - fetches all listings / search specific listings from DB
    /* 
    Methods:
    - get Listings
    */

import App from './App'
import Auth from './Auth'
import Toast from './Toast'


class ListingAPI {

  // GET ALL LISTINGS ----------------------------------------------
  async getListings(){
    
    // go to the /listing route (backend API)
    // fetch the json data
    const response = await fetch(`${App.apiBase}/listing`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting listings')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  } 

  
  // GET SINGLE LISTING  ----------------------------------------------
  async getListing(id){
    
    // go to the /listing route (backend API)
    // fetch the json data
    const response = await fetch(`${App.apiBase}/listing/${id}`, {
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting listing')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

  // CREATE NEW LISTING  ----------------------------------------------
    /* send fetch request - POST method
    - also sending JSON web token (otherwise we’ll get authorization error)
    - and sending form data, which is passed in as a parameter */
  async newListing(formData) {
  
    const response = await fetch(`${App.apiBase}/listing`, {
      method: 'POST',
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
      body: formData
    })

    // if response not ok
    if(!response.ok){ 
      let message = 'Problem adding your listing'
      if(response.status == 400){
        const err = await response.json()
        message = err.message
      }      
      // throw error (exit this function)      
      throw new Error('Problem creating your listing')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }

}


export default new ListingAPI()