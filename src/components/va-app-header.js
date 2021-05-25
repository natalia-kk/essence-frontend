// CUSTOM WEB COMPONENT - APP HEADER - top menu and slide out menu (main)

import { LitElement, html, css } from '@polymer/lit-element' // for creating custom elements
import {anchorRoute, gotoRoute} from './../Router' // required for navigating to any page in the SPA
import Auth from './../Auth' // for accessing current user
import App from './../App' 


// using lit element to create custom web component
/*  define custom element 
    - requires defining custom html tag name ('va-app-header')
    - attaching a class (AppHeader)
    - extending LitElement class 
    - (all wrapped inside the define method) */

customElements.define('va-app-header', class AppHeader extends LitElement {
  // constructor will run right away
  constructor(){
    // call the constructor of the class we're extending (LitElement) (= parent class)
    super()    
  }

  // DEFINE PROPERTIES - returns an object that has a property for each attribute on the tag e.g. <va-app-header title="">
  // creates JS properties (title, user) = converted to attributes for the custom tag
  // attributes are set inside the tag in each view it is used
  static get properties(){
    return {
      title: {
        type: String
      },
      user: {
        type: Object
      }
    }
  }

  // firstUpdated function = fired when page is first rendered/created
  firstUpdated(){ // run for AppHeader class
    super.firstUpdated() // run for parent class (LitElement)
    this.navActiveLinks()    
  }

  navActiveLinks(){	
    const currentPath = window.location.pathname
    const navLinks = this.shadowRoot.querySelectorAll('.app-top-nav a, .app-side-menu-items a')
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return
      if(navLink.pathname === currentPath){			
        navLink.classList.add('active')
      }
    })
  }

  hamburgerClick(){  
    const appMenu = this.shadowRoot.querySelector('.app-side-menu')
    appMenu.show()
  }
  
  // menuClick function for sl-drawer (side menu) 
  // Clicking the link (anchor tag in sl-drawer) closes sidebar drawer, then loads the new route
  menuClick(e){
    e.preventDefault()
    const pathname = e.target.closest('a').pathname
    const appSideMenu = this.shadowRoot.querySelector('.app-side-menu')
    // hide appMenu
    appSideMenu.hide()
    appSideMenu.addEventListener('sl-after-hide', () => {
      // goto route after menu is hidden
      gotoRoute(pathname)
    })
  }

  // RENDER THE ELEMENT
  // html and css styling for the custom element
  // shadow root/DOM = html/css is isolated here
  render(){    
    return html`
    <!-- start styling -->
    <style>  
      * {
        box-sizing: border-box;
      }
      .app-header {
        background: var(--brand-color);
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: var(--app-header-height);
        color: #fff;
        display: flex;
        z-index: 9;
        box-shadow: 4px 0px 10px rgba(0,0,0,0.2);
        align-items: center;
        padding-left: 1.75em;
        padding-right: 1.75em;
      }
      

      .app-header-main {
        flex-grow: 1;
        display: flex;
        align-items: center;
      }

      .app-header-main::slotted(h1){
        color: #fff;
      }

      .app-logo a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2em;
        padding: .6em;
        display: inline-block;        
      }

      .app-logo img {
        width: 90px;
      }
      
      .hamburger-btn::part(base) {
        color: #fff;
      }

      .app-top-nav {
        display: flex;
        height: 100%;
        align-items: center;
      }

      .app-top-nav a {
        display: inline-block;
        padding: .8em;
        text-decoration: none;
        color: #fff;
      }
      
      .app-side-menu-items a {
        display: block;
        padding: .5em;
        text-decoration: none;
        font-size: 1.3em;
        color: #333;
      }

      .app-side-menu-logo {
        width: 120px;
        margin-bottom: 1em;
        position: absolute;
        top: 2em;
        left: 1.5em;
      }

      .page-title {
        color: var(--app-header-txt-color);
        margin-right: 0.5em;
        font-size: var(--app-header-title-font-size);
      }

      /* active nav links */
      .app-top-nav a.active,
      .app-side-menu-items a.active {
        font-weight: bold;
      }

      /* RESPONSIVE - MOBILE ------------------- */
      @media all and (max-width: 768px){       
        
        .app-top-nav {
          display: none;
        }
      }

    </style>
    <!-- end styling -->

    <!-- Start HTML (what will be seen on the webpage) -->
    <!-- Start header -->
    <header class="app-header">
      <!-- 'this' refers to the class we're inside (AppHeader) -->       
      <sl-icon-button class="hamburger-btn" name="list" @click="${this.hamburgerClick}" style="font-size: 1.5em;"></sl-icon-button>       
      
      <div class="app-header-main">
        ${this.title ? html`
          <h1 class="page-title">${this.title}</h1>
        `:``}
        <slot></slot>
      </div>

      <nav class="app-top-nav">
        <a href="/" @click="${anchorRoute}">Home</a> 
        ${this.user.accessLevel == 2 ? html `
        <a href="/newListing" @click="${anchorRoute}">Create a Listing</a>
        ` : html ``} 

        <sl-dropdown>
          <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">
            <sl-avatar style="--size: 24px;" image=${(this.user && this.user.avatar) ? `${App.apiBase}/images/${this.user.avatar}` : ''}></sl-avatar> ${this.user && this.user.firstName}
          </a>
          <sl-menu>            
            <sl-menu-item @click="${() => gotoRoute('/profile')}">Profile</sl-menu-item>
            <sl-menu-item @click="${() => gotoRoute('/editProfile')}">Edit Profile</sl-menu-item>
            <sl-menu-item @click="${() => Auth.signOut()}">Sign Out</sl-menu-item>
          </sl-menu>
        </sl-dropdown>
      </nav> 
    </header> <!-- End header -->

    <sl-drawer class="app-side-menu" placement="left">
      <img class="app-side-menu-logo" src="/images/logo.svg">
      <nav class="app-side-menu-items">
        <a href="/" @click="${this.menuClick}">Home</a>
        <a href="/explore" @click="${this.menuClick}">Explore</a>
        <a href="/teachersLounge" @click="${this.menuClick}">Teacher's Lounge</a>
        <a href="/favourites" @click="${this.menuClick}">My Favourites</a>
        <a href="/myAccount" @click="${this.menuClick}">My Account</a>
        <a href="#" @click="${() => Auth.signOut()}">Sign Out</a>
      </nav>  
    </sl-drawer>
    <!-- end HTML (what will be seen on the webpage) -->
    ` 
  } // end render()
  
}) // end AppHeader class

