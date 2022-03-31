import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import ListingAPI from './../../ListingAPI'
import Toast from '../../Toast'
// import listing from './listing'

class ExploreView {
  async init(){
    console.log('ExploreView.init')
    document.title = 'Explore'
    this.listings = null    
    this.render()    
    Utils.pageIntroAnim()
    await this.getListings() // get listings from backend, store in this.listings and log them to console
    //this.filterListings('level', 'Advanced')
  }

  /* this.listings = an array. Run the .filter function on this array.
  // the filter condition that must be met (true) = what follows the => 
    // (syntax - must match what is in database)
  filterListingsGenderMale(){
    const filteredListings = this.listings.filter(listing => listing.gender == 'Male' )
    // filteredListings = now gives a new (filtered) array
    console.log("filteredListings =")
    console.log(filteredListings)
  } */

  // FILTER LISTINGS method/function ***********************************
  async filterListings(field, match) {
    //validate
    if(!field || !match) return // exit function

    // resets this.listings to all listings (ie. clears filters that may have been applied)
    // don't want to run getListings() because it will reload the page
    this.listings = await ListingAPI.getListings()

    let filteredListings // set variable to store filtered listings (let not const because it will change)

    // filter based on gender
    if(field == 'gender') {
      filteredListings = this.listings.filter(listing => listing.gender == match)
    }

    // filter based on level
    if(field == 'level') {
      filteredListings = this.listings.filter(listing => listing.level == match)
    }

    // filter based on level
    if(field == 'classType') {
      filteredListings = this.listings.filter(listing => listing.classType == match)
    }

    // redefine this.listings
    this.listings = filteredListings
    this.render() // re-render page
  }


  // clear all filter buttons active state
  clearFilterBtns() {
    const filterBtns = document.querySelectorAll('.filter-btn') // will return an array
    //filterBtns.forEach(btn => btn.removeAttribute("type") )
    filterBtns.forEach(btn => btn.setAttribute("type", "default") )
  }


  // click handler for FILTER BUTTONS
  // pass in event object
  handleFilterBtn(e) {
    // console log event object and target (what was clicked)
    console.log("target button = ", e.target)

    // clear all filter buttons active state
    this.clearFilterBtns()

    // add new attribute (active state) to target button
    e.target.setAttribute("type", "primary")

    // get the match and field (from button) to filter listings with
    const field = e.target.getAttribute("data-field")
    const match = e.target.getAttribute("data-match")
    //console.log("field = ", field)
    //console.log("match = ", match)

    // filter listings
    this.filterListings(field, match)

  }

  // Clear filters button functionality
  clearFilters() {
    this.getListings() // reset haircuts to show all
    this.clearFilterBtns() // clear all filter buttons
  }

  // GET ALL LISTINGS method/function ***********************************
  // called when page is loaded (after this.render())

    /* set try{} and catch{} - can catch the error if anything goes wrong
    try = a promise (will take time) - use async/await 
    (won't move to next line of code until complete)
    */
  async getListings(){
    try{
      // use ListingAPI - getListings() method
      // will return a JSON object with all the listings
      // set this to the this.listings variable - where they will be stored
      this.listings = await ListingAPI.getListings()
      console.log(this.listings)
      // re-render page to render listings brought in by getListings()
      this.render()
    }catch(err){ 
      // if there is an error, show error message in a toast ('error' parameter = red toast)
      Toast.show(err, 'error')
    }
  } // end getListings() ************************************************


  /* JS syntax notes: 
    - For if/else statement:
      ${this.listings == null ? html`` : html``}
    - Can’t use forEach in JS literals (lit html):
      use .map to loop through each object (listing)
  */
  render(){
    const template = html`
    <style>
      .filter-menu {
        margin-bottom: 1em;
      }
      h5 {
        color: var(--brand-color);
        font-size: 1em;
      }
    </style>
      <va-app-header title="Explore" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      
      <!-- page-content div start -->
      <div class="page-content">     
        
        <div id="clear-filters">
              <sl-button size="medium" @click=${this.clearFilters.bind(this)} pill>Clear filters</sl-button>
        </div> 
        <h1>Explore yoga</h1>  
        
        <!-- Filter menu -->
        <!-- Button groups from Shoelace library group related filter buttons -->
        <h5>Filter by:</h5>
        <div class="filter-menu">
          <div>
            <strong>Gender</strong>
            <sl-button-group>
              <sl-button class="filter-btn" size="small" data-field="gender" data-match="Male" @click=${this.handleFilterBtn.bind(this)}>Male</sl-button>
              <sl-button class="filter-btn" size="small" data-field="gender" data-match="Female" @click=${this.handleFilterBtn.bind(this)}>Female</sl-button>
            </sl-button-group>
          </div>
          <div>
            <strong>Level</strong>
            <sl-button-group>
              <sl-button class="filter-btn" size="small" data-field="level" data-match="Beginner" @click=${this.handleFilterBtn.bind(this)}>Beginner</sl-button>
              <sl-button class="filter-btn" size="small" data-field="level" data-match="Intermediate" @click=${this.handleFilterBtn.bind(this)}>Intermediate</sl-button>
              <sl-button class="filter-btn" size="small" data-field="level" data-match="Advanced" @click=${this.handleFilterBtn.bind(this)}>Advanced</sl-button>
            </sl-button-group>
          </div>
          <div>
            <strong>Class Type</strong>
            <sl-button-group>
              <sl-button class="filter-btn" size="small" data-field="classType" data-match="Studio" @click=${this.handleFilterBtn.bind(this)}>Studio</sl-button>
              <sl-button class="filter-btn" size="small" data-field="classType" data-match="Private" @click=${this.handleFilterBtn.bind(this)}>Private</sl-button>
              <sl-button class="filter-btn" size="small" data-field="classType" data-match="Outdoor" @click=${this.handleFilterBtn.bind(this)}>Outdoor</sl-button>
            </sl-button-group>
          </div>

        </div>
        
        
        <div class="listings-grid">
          <!-- check if this.listings = empty/null --> 
          ${this.listings == null ? html` 
            <!-- If it's empty use this html: (show loading animation) -->
            <sl-spinner></sl-spinner>
          ` : html` 
            <!-- else (must = not null, = populated with listings) use this html: -->
            <!-- loop through each JSON array object (listing) and spit out the following html for each -->
            ${this.listings.map(listing => html `
              <!-- custom component va-listing-card -->
              <!-- note: when passing in an JSON object as an attriubte: need to stringify it -->
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
        
      </div> <!-- page-content div end -->     
    `
    render(template, App.rootEl)
  }
}


export default new ExploreView()