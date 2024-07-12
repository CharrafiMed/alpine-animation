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

## Customization Options
You can customize the animations using the following modifiers or even pass an dedicated object as the  [AutoAnimate](https://auto-animate.formkit.com/#usage) provide.

### duration 
you can customize the duration of the animation period using the modifier or passing plain object like this : 
*
```html
<ul x-animate.duratio.300ms>
    <li>item one</li>
    <li>item two </li>
    <li>item three</li>
</ul>
```
here the animation will happend during 300ms 
> **Notice:** if the unit is ms you can even pass the duration without ms 
```html
<ul x-animate.duratio.300>
    <li>item one</li>
    <li>item two </li>
    <li>item three</li>
</ul>
```
and the duration modifier also support the s unit  like so :
```html
<ul x-animate.duratio.1s>
    <li>item one</li>
    <li>item two </li>
    <li>item three</li>
</ul>
```
    passing as a plain object like this : 
```html
<ul x-animate="{duration:3000}">
    <li>item one</li>
    <li>item two </li>
    <li>item three</li>
</ul>
```
notice : when we customize the plugin using the object syntax we don't specify the unit and it always consider as ms. 



### easing 
### Disrespect User Motion Preference
### combination

## Versioning

This projects follow the [Semantic Versioning](https://semver.org/) guidelines.

## License

Copyright (c) Charrafi Mohamed

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
