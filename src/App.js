import Router from './Router'
import Auth from './Auth'
import Toast from './Toast'


class App {
  constructor(){
    this.name = "Essence"
    this.version = "1.0.0"
    this.apiBase = 'http://localhost:3000' // backend API address
    this.rootEl = document.getElementById("root") // the index.html root div that everything will be inserted into
    this.version = "1.0.0"
  }
  
  // the function that gets fired from the index.js file - App.init() - to start the app
  init() { 
    console.log("App.init")
    
    // Toast init
    Toast.init()   
    
    // AuUTHENTICATION CHECK - run the Auth.js check() function 
    // (nothing in this app works if user isn't logged in)   
    Auth.check(() => {
      // authenticated! init Router
      Router.init()
    })    
  }
}

export default new App()