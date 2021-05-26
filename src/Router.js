// import views
import welcomeView from './views/pages/welcome'
import exploreView from './views/pages/explore'
import teachersLoungeView from './views/pages/teachersLounge'
import favouritesView from './views/pages/favourites'
import listingView from './views/pages/listing'
import fourOFourView from './views/pages/404'
import signinView from './views/pages/signin'
import signupView from './views/pages/signup'
import myAccountView from './views/pages/myAccount'
import myListingView from './views/pages/myListing'
import editProfileView from './views/pages/editProfile'
import newListingView from './views/pages/newListing'

// define routes
const routes = {
	'/welcome': welcomeView,
	'/explore': exploreView,
	'/teachersLounge': teachersLoungeView,
	'/favourites': favouritesView,
	'/listing': listingView,
	'404': fourOFourView,
	'/signin': signinView,
	'/signup': signupView,
	'/myAccount': myAccountView,
	'/myListing': myListingView,
	'/editProfile': editProfileView,	
	'/newListing': newListingView
}

class Router {
	constructor(){
		this.routes = routes
	}
	
	init(){
		// initial call
		this.route(window.location.pathname)

		// on back/forward
		window.addEventListener('popstate', () => {
			this.route(window.location.pathname)
		})
	}
	
	route(fullPathname){
		// extract path without params
		const pathname = fullPathname.split('?')[0]
		const route = this.routes[pathname]
		
		if(route){
			// if route exists, run init() of the view
			this.routes[window.location.pathname].init()
		}else{			
			// show 404 view instead
			this.routes['404'].init()			
		}
	}

	gotoRoute(pathname){
		window.history.pushState({}, pathname, window.location.origin + pathname);
		this.route(pathname)
	}	
}

// Main (default) export -------------------------------
// create appRouter instance and export
const AppRouter = new Router()
export default AppRouter


// Named exports ---------------------------------------
// programmatically load any route (used for buttons)
export function gotoRoute(pathname){
	AppRouter.gotoRoute(pathname)
}

// allows anchor <a> links to load routes
	/* 
	Need this function to load routes using anchor tags in SPAs (so page is not reloaded)
	(click event runs anchor route function using pop-state) 
	*/
export function anchorRoute(e){
	e.preventDefault()	
	const pathname = e.target.closest('a').pathname
	AppRouter.gotoRoute(pathname)
}
