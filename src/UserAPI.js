// UserAPI.js file - responsible for communicating with our BACKEND API (routes/user.js)
  // communicates with the User collection
  // any page view that needs to communicate with the User collection in DB will refer to methods in this API file
    /* 
    Methods:
    - Update user
    - Get user
    */

import App from './App'
import Auth from './Auth'
import Toast from './Toast'

class UserAPI {
// (fetch API used to 'fetch' the backend of our service (database) )

  // UPDATE USER -------------------------------------------
  // Wk8a Pastebin start*********
  async updateUser(userId, userData, dataType = 'form'){
    // validate
    if(!userId || !userData) return
    
    let responseHeader
    
    // Fetch 1 - FORM DATA
    if(dataType == 'form'){
      // fetch response header normal (form data)
      responseHeader = {
        method: "PUT",        
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`},
        body: userData
      }
      
    // Fetch 2 - JSON DATA
    }else if(dataType == 'json'){
      responseHeader = {
        method: "PUT",        
        headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type" : "application/json"},
        body: JSON.stringify(userData)
      }
    }

    // make fetch request to backend
    const response = await fetch(`${App.apiBase}/user/${userId}`, responseHeader)

    // if response not ok
    if(!response.ok){
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem updating user')
    }

    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  } // Wk8a Pastebin end ********


  // GET USER ---------------------------------------------
  async getUser(userId){
    // validate
    if(!userId) return
    
    // fetch the json data
    const response = await fetch(`${App.apiBase}/user/${userId}`, {
      // access token sent in request/authorisation header
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`}
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem getting user')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data
  }


  // ADD TO FAVOURITES --------------------------------------------------
  // pass in id of the listing to be added to favourites
  async addFavListing(listingId){
    // validate
    if(!listingId) return

    // send fetch request to backend 
    const response = await fetch(`${App.apiBase}/user/favouriteListing`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${localStorage.accessToken}`, "Content-Type": 'application/json'},
      body: JSON.stringify({listingId: listingId})
    })

    // if response not ok
    if(!response.ok){ 
      // console log error
      const err = await response.json()
      if(err) console.log(err)
      // throw error (exit this function)      
      throw new Error('Problem adding listing to favourites')
    }
    
    // convert response payload into json - store as data
    const data = await response.json()
    
    // return data
    return data

  }

}


export default new UserAPI()