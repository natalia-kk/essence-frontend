import App from './../../App'
import Auth from './../../Auth'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Utils from './../../Utils'

class SignUpView{
   
  init(){      
    console.log('SignUpView.init')  
    document.title = 'Sign In'    
    this.render()
    Utils.pageIntroAnim()
  }

  signUpSubmitHandler(e){
    e.preventDefault()    
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    const formData = e.detail.formData
    
    // sign up using Auth
    Auth.signUp(formData, () => {
      submitBtn.removeAttribute('loading')
    })   
  }

  render(){
    const template = html`    
      <div class="background page-centered">      
        <div class="signinup-box">
        <img class="signinup-logo" src="/images/logo.svg">
          <h1 class='signinup'>Sign Up</h1>
          <sl-form class="form-signup" @sl-submit=${this.signUpSubmitHandler}>
            <div class="input-group">
              <sl-input name="firstName" type="text" placeholder="First Name" class='form-input' required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="lastName" type="text" placeholder="Last Name" class='form-input' required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Email" class='form-input' required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Password" class='form-input' required toggle-password></sl-input>
            </div>
            <div class="input-group">
              <sl-select name="accessLevel" class='form-input' style="color: grey" placeholder="I am a ...">
                <sl-menu-item value="1">Yoga Student</sl-menu-item>
                <sl-menu-item value="2">Yoga Teacher</sl-menu-item>
              </sl-select>
            </div>            
            <sl-button type="primary" class="submit-btn" submit style="width: 100%;" pill>Create account<sl-icon slot="suffix" name="arrow-right"></sl-icon></sl-button>
          </sl-form>
          <p class='line'>Have an account?</p>
          <a href="/signin" @click=${anchorRoute} class='link-txt'>Sign In</a>
        </div>
      </div>
    `
    render(template, App.rootEl)
  }
}


export default new SignUpView()