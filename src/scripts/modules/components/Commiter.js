const CommiterObject = {
    states: [],
    modules: []
}
export default CommiterObject
export default class Commiter
{
    constructor(origin, scope)
    {
        if(typeof scope === 'undefined')
        {
            let scope = "gcommiter"
        }
        this.scope = scope
        if(typeof window[scope] === 'undefined')
        {
            window[this.scope] = CommiterObject
        }
        this.addToScope(origin)
    }

    commit(action, value, origin)
    {
        let win = window[this.scope]
        let scope = this.scope
        if(typeof win.states[action] === 'undefined')
        {
            throw new TypeError(`You cannot commit to ${action} as it is not available in the "${scope}" scope`)
        }
        if(typeof win.scopes[action] !== 'undefined')
        {
            win.scopes[action]['bindValue'] = value
            this.shouldUpdate(win[action])
        }
        else
        {
            throw new TypeError(`You cannot commit to ${action} as it has never been created. Please call createCommit before calling commit.`)
        }
    }

    createCommit(action, defaultValue, originalBinder)
    {
        let win = window[this.scope]
        win.states.push({
            bindAction: action,
            bindValue: defaultValue,
            vrep: null,
            binder: originalBinder
        })
    }

    shouldUpdate(action)
    {
        let win = window[scope]['modules']
        win.forEach((stateModule) => {
            if(typeof stateModule['eventNotice'] !== 'undefined')
            {
                stateModule['eventNotice'](action)
            }
        })
    }

    addToScope(origin)
    {
        let scope = this.scope
        let win = window[scope]
        win.modules.push(origin)
    }
}