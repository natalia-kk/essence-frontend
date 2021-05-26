import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'

class MyListingView {
  init(){
    console.log('MyListingView.init')
    document.title = 'My Listing'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="My Listing" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">        
        <h1>My Listing</h1>
        <label>Haven't made a listing yet?</label>
        <sl-button type="primary" @click=${() => gotoRoute('/newListing')} style="width: 200px;" pill>Create a Listing</sl-button>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new MyListingView()