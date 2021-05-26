import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import moment from 'moment'

class MyAccountView {
  init(){
    console.log('MyAccountView.init')
    document.title = 'My Account'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <va-app-header title="Account" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">        
        ${Auth.currentUser && Auth.currentUser.avatar ? html`
          <sl-avatar style="--size: 200px; margin-bottom: 1em;" image=${(Auth.currentUser && Auth.currentUser.avatar) ? `${App.apiBase}/images/${Auth.currentUser.avatar}` : ''}></sl-avatar>
        `:html`
        <sl-avatar style="--size: 200px; margin-bottom: 1em;"></sl-avatar>
        `}
        <h2>${Auth.currentUser.firstName} ${Auth.currentUser.lastName}</h2>
        <p>${Auth.currentUser.email}</p>
        
        <p>Updated: ${moment(Auth.currentUser.updatedAt).format('MMMM Do YYYY, @ h:mm a')}</p>

        ${Auth.currentUser.bio ? html`
          <h3>Bio</h3>
            <p>${Auth.currentUser.bio}</p>
        ` : html`
          <h3>Bio</h3>
            <p>You have not added a bio yet</p>
        `}
        
        <sl-button @click=${()=> gotoRoute('/editProfile')}>Edit Profile</sl-button>
        ${Auth.currentUser.accessLevel == 2 ? html `
        <sl-button @click=${()=> gotoRoute('/myListing')}>My Listing</sl-button>
        ` : html ``} 
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new MyAccountView()