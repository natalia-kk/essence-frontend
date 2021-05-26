import App from './../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'
import UserAPI from './../../UserAPI'
import Toast from '../../Toast'

class WelcomeView {
  init(){
    document.title = 'Welcome'    
    this.render()    
    Utils.pageIntroAnim()
    this.updateCurrentUser()
  }

  // run this function when page is rendered
  // responsible for setting newUser to false 
  async updateCurrentUser() {
    try{
      const updatedUser = await UserAPI.updateUser(Auth.currentUser._id, {newUser: false}, 'json')
      console.log('user updated')
      console.log(updatedUser)
    }catch(err){
      Toast.show(err, 'error')
    }
  } 

  render(){ 
    const template = html`
    <style>

    </style>
      <va-app-header title="Welcome" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content calign">
        <div class="flex-container">

        <section class="welcome-items">
            <img class="welcome-image" src="${App.apiBase}/images/welcome-mats.jpg">
          </section>
          
          <section class="welcome-items">
          <div class="content-left">
            <h1 class="brand-color">Welcome, ${Auth.currentUser.firstName}!</h1>
            <p class="spacing">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
              adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. 
            </p>
            <sl-button class="spacing" type="primary" @click=${() => gotoRoute('/explore')} pill style="width: 200px">Okay got it!</sl-button>
            </div>
          </section>
        

        </div> <!-- end flex-container div -->
      </div> <!-- end page-contend div -->    
    `
    render(template, App.rootEl)
  }
}


export default new WelcomeView()