# Alpine Animation
Alpine's animation plugin allows you to easily add animations when an element is added, removed, or changed in the DOM.


This package is useful for things like adding or removing items from tables or any components that deal with list shuffling, etc.  


The plugin seamlessly integrates the  [AutoAnimate](https://auto-animate.formkit.com/)  library for effortless animations.
## Installation 

For now, you can use this plugin by installing it via NPM.

You can install Alpine Animate from NPM for use inside your bundle like so:



```shell
npm install @charrafimed/alpine-animation
```

Then initialize it from your bundle:

```js
import Alpine from 'alpinejs'
import Animate from '@charrafimed/alpine-animation'

Alpine.plugin(Animate)

...

```
## basic usage 