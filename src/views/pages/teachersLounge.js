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
        .lounge-image {
          max-width: 100%;
          height: auto;
          animation: fadeIn ease 5s;
        } 
        .page-content {
          margin-top: -3em;
          padding-top: 0;
        }
        .lounge-link {
          text-decoration: none;
        }
        
      </style>

      <va-app-header title="Teacher's Lounge" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content"> 
        
        <div class="flex-container">
           <section class="display-flex">
            <img class="lounge-image" src="${App.apiBase}/images/teachers-lounge.jpg" width="400">
          </section> 

          <section class="display-flex" class="lounge-content-left">
            <h1>Teacher's Lounge</h1>
            <h2 class="anim-in">Namaste, ${Auth.currentUser.firstName}</h2>
            <h3><a href="/myAccount" @click=${anchorRoute} class="lounge-link">Go to my Account <sl-icon class="icon" name="arrow-right-circle-fill"></sl-icon></a></h3>
            
            <div>
              <h3><a href="/myAccount" @click=${anchorRoute} class="lounge-link">View my Listing <sl-icon class="icon" name="arrow-right-circle-fill"></sl-icon></a></h3>
              <p>Haven't made a listing yet?</p>
              <sl-button @click=${() => gotoRoute('/newListing')} style="width: 70%;" pill>Create a Listing</sl-button>
            </div>
          </section>  
          
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new TeachersLoungeView()