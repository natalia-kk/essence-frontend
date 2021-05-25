import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import Toast from './../../Toast'
import UserAPI from './../../UserAPI'

class FavouritesView {
  init(){
    document.title = 'Favourites'  
    this.favListings = null  
    this.render()    
    Utils.pageIntroAnim()
    this.getFavListings()
  }


  // use the UserAPI to get the current user + their favourite listings (stored in their user document in DB)
  async getFavListings(){
    try {
      const currentUser = await UserAPI.getUser(Auth.currentUser._id)
      this.favListings = currentUser.favouriteListings // = an array of user's favourite listings
      console.log(this.favListings)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="Favourites" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>My Favourites</h1>
        
        <div class="listings-grid">
          ${this.favListings == null ? html`
            <sl-spinner></sl-spinner>
          ` : html`
            ${this.favListings.map(listing => html`
              <va-listing-card class="listing-card"
                id="${listing._id}"
                user="${JSON.stringify(listing.user)}"
                image="${listing.image}"
                location="${listing.location}"
                level="${listing.level}"
                certified="${listing.certified}"
                essenceStatement="${listing.essenceStatement}"
                classType="${listing.classType}"
                gender="${listing.gender}"
              >        
              </va-listing-card>

            `)}
          `}
        </div>
        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new FavouritesView()