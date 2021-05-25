// CUSTOM WEB COMPONENT

import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from './../Router' // required for navigating to any page in the SPA - brought in as dependency in case it's needed
import Auth from './../Auth' // in case need to access current user
import App from './../App' // in case need to access anything in the app
import UserAPI from './../UserAPI'
import Toast from './../Toast'


// DEFINE THE CUSTOM ELEMENT --------------------------
// window object -> customElements -> method called 'define'
    /* define = takes 2 parameters: 
        1- name of the custom html tag (va-listing-card) 
        2- the class we want to connect it to (class is created here) 
         - extending LitElement - required because class is created after (not using an already made class) */

customElements.define('va-listing-card', class Listing extends LitElement {
  constructor(){
    super()    
  }

 // DEFINE PROPERTIES (custom tag attributes)
 // attributes are set inside the tag in each view it is used
  static get properties(){
    return {
      id: {
        type: String
      },
      user: {
        type: Object
      },
      image: {
        type: String 
      },
      level: {
          type: String
      },
      location: {
        type: String,
      }, 
      certified: {
        type: String
      }, 
      essenceStatement: {
        type: String
      }, 
      gender: {
        type: String
      },
      classType: {
        type: String
      }   
    } 
  }

  // firstUpdated function
  firstUpdated() {
    super.firstUpdated()
  }

  // called when the See More button is clicked
  viewListingHandler() {
    gotoRoute(`/listing?id=${this.id}`)
  } 

  // called when add to favourties heart button/icon is clicked
  // linked to UserAPI (backend) to add the listing to User model for current user.
  async addFavHandler(){    
    try {
      await UserAPI.addFavListing(this.id)
      Toast.show('Listing added to favourites')
    }catch(err){
      Toast.show(err, 'error')
    }
  }
  
  // RENDER THE ELEMENT - html and css
  // shadow root
  render() {    
    return html`
    <style>
        .listing-card-image {
            max-width: 400px;
            height: auto;
        }
    </style>

    <sl-card>
        <img class="listing-card-image" slot="image" src="${App.apiBase}/images/${this.image}">
        <h2 class="author">${this.user.firstName} ${this.user.lastName} </h2>
        <h3>${this.location}</h3>
        <h4>${this.classType} | ${this.level}</h4>
        <p>${this.certified}hr certified | ${this.gender}</p>

        <sl-button @click=${this.viewListingHandler.bind(this)}>See More</sl-button>
        <sl-icon-button name="suit-heart-fill" label="Add to Favourites" @click=${this.addFavHandler.bind(this)}></sl-icon-button>
    </sl-card>
   
    `
  } // end render()
  
})