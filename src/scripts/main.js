/**
 * -----------------
 * - Rolldown Core -
 * -----------------
 */

import router from './modules/router'
import routes from './modules/config/routes'

// Define helper functions
let log = (mesg) => console.log(mesg);

// Define Enviornment Variables
const _env = {
    environment: "development",
    app_name: "rolldowncore",
    debug: {
        title: "app:log"
    },
}

// Create commiter window object
window.gcommiter = {
    modules: [],
    states: []
}
// Override log if we're in production
if(_env.environment !== "development")
{
    log = (mesg) => {}
}

log('Starting router...')
let routerInstance = new router()
log('Router started')
log('Applying routes from routes file')
routerInstance.applyRoutes(routes)
log('Routes applied')
log('Finding default route')
routerInstance.findDefault()
log('Found default route')
log('Checking if we have a predefined route')
routerInstance.findPredefinedRoute()
log('Checked predefined route, and routed if found, otherwise evaluated default component')
log('--- Runtime Completed ---')
log('--- Post-runtime: Attach hash listener ---')
window.addEventListener("hashchange", routerInstance.hashChange, false)
log('--- Post-runtime completed ---')