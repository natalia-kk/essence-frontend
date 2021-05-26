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
    <style>
      .profile-heading {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      .profile-heading > h1 {
        color: var(--brand-color);
        padding-right: 0.25em;
      }
      .account-box {
        max-width: 500px;
        margin-right: auto;
        margin-left: auto;
      }
    </style>

      <va-app-header title="Account" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign"> <!-- start page content div -->
      
      <div class="account-box">
        <div class="profile-heading">   
          <h1>My Profile</h1>  
          <sl-icon-button name="pencil" label="Edit" style="font-size: 1.5rem;" @click=${()=> gotoRoute('/editProfile')}>Edit Profile</sl-icon-button>
        </div>  
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
        ` : html` `}
      
        ${Auth.currentUser.accessLevel == 2 ? html `
        <sl-button type="primary" pill style="width: 150px;" @click=${()=> gotoRoute('/newListing')}>Create a Listing</sl-button>
        ` : html ``} 

        </div>

      </div> <!-- end page content div -->     
    `
    render(template, App.rootEl)
  }
}


export default new MyAccountView()