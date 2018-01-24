export default class Router
{
    constructor()
    {
        this._routes = []
        this._current_route = null
        this._default_route = {}
    }
    hashChange()
    {
        // right now we'll just proxy, may do further tweaks later...
        this.findPredefinedRoute()
    }
    applyRoutes(routes)
    {
        this._routes = routes
    }
    runRoute(route)
    {
        // task: find route!
        this._routes.forEach((route) => {
            if(route.route === route)
            {
                if(typeof route.component === 'function' && typeof route.component.getDescription !== 'undefined')
                {
                    alert('here')
                    let componentNode = new route.component();
                    typeof componentNode.willRender !== 'undefined' ? componentNode.willRender() : '';
                    componentNode.render()
                }
                else
                {
                    alert('component func')
                    route.component() // trigger route component
                }
                this._current_route = route
                return
            }
        })
        if(this._current_route === null)
        {
            if(typeof this._default_route.component === 'function' && typeof this._default_route.component.getDescription !== 'undefined') // exported class
            {
                let componentNode = new this._default_route.component;
                typeof componentNode.willRender !== 'undefined' ? componentNode.willRender() : '';
                componentNode.render()
            }
            else
            {
                this._default_route.component()
            }
        }
    }
    findDefault()
    {
        this._routes.forEach((route) => {
            if(typeof route.default !== 'undefined' && route.default)
            {
                this._default_route = route
            }
        })
    }
    findPredefinedRoute()
    {
        if(window.location.hash !== "")
        {
            let hash = window.location.hash
            hash = hash.replace(/\#\//g, '')
            this.runRoute(hash)
        }
    }
}