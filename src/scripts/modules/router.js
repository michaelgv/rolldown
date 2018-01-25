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
    runDefaultRoute()
    {
        let defRoute = this._default_route
        if(defRoute)
        {
            if(typeof defRoute.component === 'function' && typeof defRoute.component.getDescription !== 'undefined')
            {
                let componentNode = new defRoute.component()
                typeof componentNode.willRender !== 'undefined' ? componentNode.willRender() : '';
                componentNode.render()
            }
            else
            {
                defRoute.component()
            }
            this._current_route = defRoute
        }
    }
    runRoute(route)
    {
        // task: find route!
        this._routes.forEach((inroute) => {
            if(inroute.route === route)
            {
                if(typeof inroute.component === 'function' && typeof inroute.component.getDescription !== 'undefined')
                {
                    let componentNode = new inroute.component();
                    typeof componentNode.willRender !== 'undefined' ? componentNode.willRender() : '';
                    componentNode.render()
                }
                else
                {
                    inroute.component() // trigger route component
                }
                this._current_route = inroute
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
        else
        {
            this.runDefaultRoute()
        }
    }
}
