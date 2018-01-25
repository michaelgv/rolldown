import RxComponent from '../modules/components/RxComponent'
import Commiter from '../modules/components/Commiter'

class Example extends RxComponent
{
    constructor()
    {
        super()
        this.commiter = new Commiter(this)
        this.loadTemplate(this.genExampleTemplate())
        setTimeout(() => {
            this.qSelect('#ptest > span').innerText = " ..... Changed after 1 seconds successfully"
            this.qCommit()
            this.commiter.createCommit('test', 'metoo', this)
            setTimeout(() => this.commiter.commit('test', 'newtest', this), 2000)
        }, 1000)
    }

    eventtest()
    {
        alert('eventtest called')
    }

    genExampleTemplate()
    {
        let topNode = document.createElement("div")
        topNode.dataset.parentvrep = "#root"
        topNode.id = "examplecontainer"
        topNode.classList.add('container')
        let paragraph = document.createElement("p")
        paragraph.id = 'ptest'
        paragraph.innerText = "Hello, world! This was rendered from the example component. In 15 seconds this text will change"
        let span = document.createElement("span")
        span.innerText = "test, me, here!"
        paragraph.appendChild(span)
        topNode.appendChild(paragraph)
        return topNode
    }
}

export default Example