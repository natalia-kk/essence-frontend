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
      <div class="page-content calign">        

      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new MyListingView()