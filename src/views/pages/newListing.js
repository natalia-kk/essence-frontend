import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import ListingAPI from './../../ListingAPI'
import Toast from '../../Toast'

class newListingView {
  init(){
    document.title = 'New Listing'    
    this.render()    
    Utils.pageIntroAnim()
  }

  // Runs when form is submitted via sl-submit btn
  // e = the event object that gets submitted with this event
 async newListingSubmitHandler(e){
    // stops the page from reloading
    e.preventDefault() 
    // add loading animation to submit button with loading attribute
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    // grab the form data (from inside the event object), store in formData
    const formData = e.detail.formData
    
    // send form data to ListingAPI:
      /* call the newListing method from the ListingAPI
      - wrap in a try/catch (takes time to complete) + use async/await (promise) */
    try{
      await ListingAPI.newListing(formData)
      Toast.show('Listing added')
      submitBtn.removeAttribute('loading')
      // reset form
      // reset text + text area inputs - first create variable textInputs
      const textInputs = document.querySelectorAll('sl-input, sl-textarea')
      if(textInputs) textInputs.forEach(textInput => textInput.value = null)
      // reset radio inputs
      const radioInputs = document.querySelectorAll('sl-radio')
      if(radioInputs) radioInputs.forEach(radioInput => radioInput.removeAttribute('checked'))
      // reset file input (photo/image upload area)
      const fileInput = document.querySelector('input[type=file]')
      if(fileInput) fileInput.value = null
      
      }catch(err){ // if something goes wrong (with newListing) show method
      Toast.show(err, 'error')
      submitBtn.removeAttribute('loading')
    }
  }

  
  render(){
    // styled in _forms.scss
    const template = html`
      <va-app-header title="New Listing" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>Create Your Listing</h1>
        
        <!-- Create a new listing form (shoelace)-->
        <sl-form class="page-form" @sl-submit=${this.newListingSubmitHandler}>
          
          <!-- hidden field sets the user automatically to the current user -->
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          
          <div class="input-group"> 
            <label>Full name</label><br>
            <sl-input name="name" type="text" placeholder="Your full name" required></sl-input>
          </div>
         
          <div class="input-group">
            <label>My Certification</label><br>
            <sl-radio-group label=" My Certification" no-fieldset>
              <sl-radio name="certified" value="200">200hr</sl-radio>
              <sl-radio name="certified" value="300">300hr</sl-radio>
              <sl-radio name="certified" value="500">500hr</sl-radio>
            </sl-radio-group>
          </div>
          
          <div class="input-group">
            <label>My Location</label><br>              
            <sl-input name="location" type="text" placeholder="Enter your location" required>
            </sl-input>
          </div>
          
          <div class="input-group">
            <label>Class Type</label><br>
            <sl-radio-group label="Class Type" no-fieldset>
              <sl-radio name="classType" value="Studio">Studio</sl-radio>
              <sl-radio name="classType" value="Private">Private</sl-radio>
              <sl-radio name="classType" value="Outdoor">Outdoor</sl-radio>
            </sl-radio-group>
          </div>
          
          <div class="input-group">
            <label>Essence Statement</label><br>
            <sl-textarea name="essenceStatement" rows="3" placeholder="What do you want your Essence statement to be?"></sl-textarea>
          </div>
          
          <div class="input-group">
            <label>Image</label><br>
            <input type="file" name="image" />              
          </div>
          
          <div class="input-group">
            <label>Gender</label><br>
            <sl-radio-group label="Select gender" no-fieldset>
              <sl-radio name="gender" value="Male">Male</sl-radio>
              <sl-radio name="gender" value="Female">Female</sl-radio>
            </sl-radio-group>
          </div>
          
          <div class="input-group">
            <label>Level</label><br>
            <sl-radio-group label="Select length" no-fieldset>
              <sl-radio name="level" value="Beginner">Beginner</sl-radio>
              <sl-radio name="level" value="Intermediate">Intermediate</sl-radio>
              <sl-radio name="level" value="Advanced">Advanced</sl-radio>
            </sl-radio-group>
          </div>
          
          <sl-button type="primary" class="submit-btn" submit pill style="width: 250px">Create my Listing</sl-button>
        
        </sl-form> <!-- END create a new listing form -->

      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new newListingView()