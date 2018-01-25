export default class Commiter
{
    commiterObject()
    {
        const CommiterObject = {
            states: [],
            modules: []
        }
        return CommiterObject
    }
    constructor(origin, scope)
    {
        if(typeof scope === 'undefined')
        {
            let scope = "gcommiter"
        }
        this.scope = scope
        this.addToScope(origin)
    }

    commit(action, value, origin)
    {
        let scope = this.scope
        if(typeof window.gcommiter.states[action] === 'undefined')
        {
            throw new TypeError(`You cannot commit to ${action} as it is not available in the "${scope}" scope`)
        }
        if(typeof window.gcommiter.states[action] !== 'undefined')
        {
            window.gcommiter.states[action]['bindValue'] = value
            this.shouldUpdate(window.gcommiter.states[action])
        }
        else
        {
            throw new TypeError(`You cannot commit to ${action} as it has never been created. Please call createCommit before calling commit.`)
        }
    }

    createCommit(action, defaultValue, originalBinder)
    {
        win.gcommiter.states.push({
            bindAction: action,
            bindValue: defaultValue,
            vrep: null,
            binder: originalBinder
        })
    }

    shouldUpdate(action)
    {
        window.gcommiter.modules.forEach((stateModule) => {
            if(typeof stateModule['eventNotice'] !== 'undefined')
            {
                stateModule['eventNotice'](action)
            }
        })
    }

    addToScope(origin)
    {
        window.gcommiter.modules.push(origin)
    }
}