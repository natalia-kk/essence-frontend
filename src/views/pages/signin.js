import App from './../../App'
import {html, render } from 'lit-html'
import {anchorRoute, gotoRoute} from './../../Router'
import Auth from './../../Auth'
import Utils from './../../Utils'

class SignInView {
  init(){
    console.log('SignInView.init')
    document.title = 'Sign In'
    this.render()
    Utils.pageIntroAnim()
  }

  signInSubmitHandler(e){
    e.preventDefault()
    const formData = e.detail.formData
    const submitBtn = document.querySelector('.submit-btn')
    submitBtn.setAttribute('loading', '')    
    
    // sign in using Auth    
    Auth.signIn(formData, () => {
      submitBtn.removeAttribute('loading')
    })
  }

  render(){    
    const template = html`   
      <div class="background page-centered">
        <div class="signinup-box">
          <div class='signin-content-box'>
          <img class="signinup-logo" src="/images/logo.svg">    
          <h1 class='signinup'>Sign in</h1>      
          <sl-form class="form-signup dark-theme" @sl-submit=${this.signInSubmitHandler}>          
            <div class="input-group">
              <sl-input name="email" type="email" placeholder="Email" class='form-input' required></sl-input>
            </div>
            <div class="input-group">
              <sl-input name="password" type="password" placeholder="Password" class='form-input' required toggle-password></sl-input>
            </div>
            <sl-button class="submit-btn" type="primary" submit style="width: 100%;" pill>Sign in<sl-icon slot="suffix" name="arrow-right"></sl-icon></sl-button>
          </sl-form>
          <p class='line'>New user?</p> 
          <a href="/signup" @click=${anchorRoute} class='link-txt'>Create an account</a>
        </div>
      </div>
    `
    render(template, App.rootEl)    
  }
}

export default new SignInView()