import diffDOM from 'diff-dom'

export default class RxComponent
{
	static getDescription()
	{
		return {
			type: "component"
		}
	}

	constructor()
	{
		this.state = {}
		this.vrep = null
		this.changelog = []
	}

	createState(stateName, stateValue, stateBinder)
	{
		// Everything must bind to something by design... :)
		if(typeof this.state[stateName] === 'undefined')
		{
			this.state[stateName] = {
				bindValue: stateValue, // Initial value
				vrep: null,
				callees: [], // you can attach events to objects, and have them rendered in callees to be instantiated
				shadow_children: [], // any object children you want to virtually render in memory, but not to the dom. Shadow children **can not** ever render to a DOM
				inspect: () => {
					return {
						stateName,
						stateValue,
						stateBinder
					}
				}
			}
			this.bindStateToVrep(stateName, stateBinder)
			this.shouldUpdate(this.state[stateName])
		}
		else
		{
			throw new TypeError(`You cannot re-bind ${stateName} as it has already been defined. Please use setState to update values, or destroyState to force it out of the virtual representation object`)
		}
	}

	qSelect(tag, live)
	{
		this.templateVREP.querySelector('#ptest').dataset.testid = "test"
		if(typeof live !== 'undefined' && live)
		{
			this.changelog.push({ sel: tag })
			return this.template.querySelector(tag)
		}
		this.changelog.push({ sel: tag })
		return this.templateVREP.querySelector(tag)
	}

	qCommit()
	{
		let dd = new diffDOM()
		let diff = dd.diff(this.template, this.templateVREP)
		dd.apply(this.template, diff)
	}

	setState(stateProp, stateVal)
	{
		if(typeof this.state[stateProp] === 'undefined')
		{
			this.state[stateProp] = {
				bindValue: stateVal,
				vrep: null,
				callees: []
			}
		}
		this.state[stateProp]['bindValue'] = stateVal
		this.shouldUpdate(this.state[stateProp])
	}

	clearState()
	{
		this.state = {}
	}

	loadTemplate(templateVREP)
	{
		this.template = templateVREP
		this.templateVREP = this.template.cloneNode(true)
		this.shadow_parent = null
		if(typeof this.template.dataset !== 'undefined' && this.template.dataset.parentvrep !== 'undefined')
		{
			this.shadow_parent = this.template.dataset.parentvrep
		}
		if(this.shadow_parent !== null)
		{
			this.shadow_parent = document.querySelector(this.shadow_parent)
		}
		else
		{
			this.shadow_parent = document.body || document.getElementsByTagName('body')[0]
		}
	}

	bindStateToVrep(stateAction, selector)
	{
		if(typeof this.template === 'undefined')
		{
			return false
		}
		this.state[stateAction]['vrep'] = this.template.querySelector(selector)
	}

	shouldUpdate(statefulItem)
	{
		let _hasVrep = statefulItem.vrep !== null
		if(_hasVrep)
		{
			statefulItem.vrep.innerHTML = statefulItem.bindValue // since we have a 1-1 we don't need to call render again, as we'll automatically repaint
		}
		else
		{
			console.log(
					"WARNING: You cannot trigger shouldUpdate on a state without a virtual representation binding. In order to bind an item, you need to define a binder. Read more: https://rolldown.js.org/guide/binders#vrep-binding"
				)
		}
	}

	render()
	{
		if(typeof this.shadow_parent === 'undefined' || this.shadow_parent === null)
		{
			this.shadow_parent = document.body || document.getElementsByTagName('body')[0]
		}
		this.template = this.shadow_parent.appendChild(this.template) // set 1-1 mapped binding, so we can change in real time, without touching dom directly on selectors, this helps abstraction
		if(typeof window.committer !== 'undefined')
		{
			window.commiter.commit('render', this)
		}
	}
}
