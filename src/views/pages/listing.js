import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils' 
import ListingAPI from './../../ListingAPI'


class listingView {
  init(){
    document.title = 'Essence Listing'  
    this.listing = null  // set empty container
    this.render()    
    Utils.pageIntroAnim()
    this.getListing()
  }


  /* viewListingHandler route: /listing?id=${this.id}
   need to grab this query string (URL) value/parameter (listing id)
   then use it to call DB and fetch that listing from DB */
  // use URLSearchParams - urlParams.get()
  async getListing() {
    // get id parameter from URL
    const urlParams = new URLSearchParams(location.search)
    const id = urlParams.get('id')
    console.log(id)
    // get the listing (API request) based on the id passed in
    // and fill the listing container (this.listing - set to null in init())
    this.listing = await ListingAPI.getListing(id)
    console.log(this.listing)
    this.render() // re-render page
  }
  

  // Contact button 'function' (actually a method because it's inside a class) - runs when contact button is clicked
  contactHandler() {
    // create sl-dialog (dynamically using JavaScript)
    const dialogEl = document.createElement('sl-dialog')
    
    // add class name
    dialogEl.className = 'contact-dialog'
   
    // sl-dialog content - using html function (lit-html library)
    const dialogContent = html `
    <h2>Test</h2>
    `
    // render dialog content inside dialog element (dialogEl)
    // render(render this content, inside this element)
    render(dialogContent, dialogEl)

    // append dialogEl to document.body
    document.body.append(dialogEl)

    // show sl-dialog (dialogs hidden by default)
    dialogEl.show()

    // on hide - delete dialogEl
    dialogEl.addEventListener('sl-after-hide', () => {
      dialogEl.remove()
    })
  }

  // called when add to favourties heart button/icon is clicked
  addFavHandler() {
   alert("added to favourites")
  }

  render(){
    const template = html`
    <!-- styles specific to this view here: -->
    <style>
      h3, h4 {
        color: var(--brand-color);
        margin-bottom: 0px;
        margin-top: 2em;
      }
      h4 {
        font-weight: 550;
      }
      .listing-btns {
        margin-top: 2em;
        justify-content: center;
      }
      .listing-image {
        max-width: 450px;
        min-width: 200px;
        height: auto;
      } 
    </style>
      <va-app-header title="Essence Listing" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content"> 
        <!-- f this.listing == empty ? do this : else do this -->
        ${this.listing == null ? html`
        <sl-spinner></sl-spinner>
        ` : html`
          <div class="flex-container">
            <section class="display-flex">
              <h1>${this.listing.teacherName}</h1>
              <h3>Based in ${this.listing.location}</h3>
              <p>${this.listing.certified}hr certified | ${this.listing.gender}</p>
              
              <h4>Class Type</h4>
              <p>${this.listing.classType}</p>
            
              <h4>Level</h4>
              <p>${this.listing.level}</p>

              <h4>Essence Statement</h4>
              <p>${this.listing.essenceStatement}</p>

              <!-- Contact button = show contact info in sl-dialog -->
              <!-- note: .bind(this) = binds .this to the class (listingView) rather than the button the event handler is being called from -->
              <div class="listing-btns">
                <sl-button class="btn-shadow" @click=${this.addFavHandler}>
                  <sl-icon slot="prefix" name="suit-heart-fill"></sl-icon>
                  Add to Favourites
                </sl-button>
                <sl-button class="btn-shadow" @click=${this.contactHandler.bind(this)}>Contact</sl-button>
              </div>
            </section>
            
            <section class="display-flex">
              <img class="listing-image" src="${App.apiBase}/images/${this.listing.image}">
            </section>
          </div>
        `}
        
    </div>      
    `
    render(template, App.rootEl)
  }

  /*
  render(){
    const template = html`
      <va-app-header title="Listing" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Essence Listing</h1>
        <p>Page content ...</p>

        <!-- Contact button = show contact info in sl-dialog -->
        <!-- note: .bind(this) = binds .this to the class (listingView) rather than the button the event handler is being called from -->
        <sl-button @click=${this.contactHandler.bind(this)}>Contact</sl-button>
        
      </div>      
    `
    render(template, App.rootEl)
  } */

}


export default new listingView()