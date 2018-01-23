/** Import your components here! */
// import mycomponent from '../components/helloworld/component'

const routes = [
    {
        route: '/',
        default: true,
        component: () => alert('loaded')
    }
]
export default routes