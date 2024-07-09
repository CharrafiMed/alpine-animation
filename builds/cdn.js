import AlpineAnimation from '../src/index'

document.addEventListener('alpine:initializing', () => {
    AlpineAnimation(window.Alpine)
})
