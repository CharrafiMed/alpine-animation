#Alpine Animation
Alpine's animation plugin allows you to easily add animations when an element is added, removed, or changed in the DOM.


This package is useful for things like adding or removing items from tables or any components that deal with list shuffling, etc.  


The plugin seamlessly integrates the  [AutoAnimate](https://auto-animate.formkit.com/)  library for effortless animations.
##Installation 

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

Using the animation plugin is a breeze. Just add one directive and let the plugin do its work.

```html
<ul x-animate>
    <li>item one</li>
    <li>item two </li>
    <li>item three</li>
</ul>
```
Now, each time an item is added to the list, removed from it, or even shuffled, the animation will apply.

## Versioning

This projects follow the [Semantic Versioning](https://semver.org/) guidelines.

## License

Copyright (c) Charrafi Mohamed

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
