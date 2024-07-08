import AlpineAnimation from '../src/index'
import AlpineAnimation from './module'

document.addEventListener('alpine:initializing', () => {
    AlpineAnimation(window.Alpine)
})
