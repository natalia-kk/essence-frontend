import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class TeachersLoungeView {
  init(){
    console.log('TeachersLoungeView.init')
    document.title = "Teacher's Lounge"    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      <style>
        
        .icon, .display-flex > h2 {
          color: var(--brand-color); 
        }
        .lounge-content-left > h2, h3, div {
          margin-top: 3em;
        }
        .display-flex > h1 {
          font-size: 2em;
        }
        .lounge-image {
          max-width: 400px;
          height: auto;
        } 
        .page-content {
          margin-top: -3em;
          padding-top: 0;
        }
        
      </style>

      <va-app-header title="Teacher's Lounge" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content"> 
        
        <div class="flex-container">
          <section class="display-flex" class="lounge-content-left">
            <h1>Teacher's Lounge</h1>
            <h2 class="anim-in">Namaste, ${Auth.currentUser.firstName}</h2>
            <h3><a href="/myAccount" @click=${anchorRoute}>Go to my Account <sl-icon class="icon" name="arrow-right-circle-fill"></sl-icon></a></h3>
            
            <div>
              <h3><a href="/myAccount" @click=${anchorRoute}>View my Listing <sl-icon class="icon" name="arrow-right-circle-fill"></sl-icon></a></h3>
              <p>Haven't made a listing yet?</p>
              <sl-button type="primary" @click=${() => gotoRoute('/newListing')} style="width: 70%;" pill>Create a Listing</sl-button>
            </div>
          </section>  

          <section class="display-flex">
            <img class="lounge-image" src="${App.apiBase}/images/teachers-lounge.jpg">
          </section>
          
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new TeachersLoungeView()