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
        }, 1000)
    }

    genExampleTemplate()
    {
        let topNode = document.createElement("div")
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