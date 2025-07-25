# Alpine Animation
Alpine's animation plugin allows you to easily add animations when an element is added, removed, or changed in the DOM.


This package is useful for things like adding or removing items from tables or any components that deal with list shuffling, etc.  


The plugin seamlessly integrates the  [AutoAnimate](https://auto-animate.formkit.com/)  library for effortless animations.

## Installation 

For now, you can use this plugin by installing it via NPM.

### Via CDN
You can include the CDN build of this plugin as a `<script>` tag, make sure to include it BEFORE Alpine's core JS file.

```alpine
<!-- Alpine Plugin -->
    <script src="https://cdn.jsdelivr.net/npm/@charrafimed/alpine-animation@0.1.0/dist/cdn.min.js" defer></script>


<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### Via NPM
You can install Alpine Animation from NPM for use inside your bundle like so:


```shell
npm install @charrafimed/alpine-animation
```

Then initialize it from your bundle:

```js
import Alpine from 'alpinejs'
import Animate from '@charrafimed/alpine-animation'

Alpine.plugin(Animate)

...

Alpine.start()

```
## basic usage 

Using the animation plugin is a breeze. Just add one directive and let the plugin do its work.

```html
<ul x-data x-animate>
    <li>item one</li>
    <li>item two </li>
    <li>item three</li>
</ul>
```


Now, each time an item is added to the list, removed from it, or even shuffled, the animation will apply.

## Customization Options
You can customize the animations using the following modifiers or even pass an dedicated object as the  [AutoAnimate](https://auto-animate.formkit.com/#usage) provide.

### duration 
You can customize the duration of the animation period using the duration modifier or by passing a plain object. Here are the options: 
#### Using the Modifier

```html
<ul x-data x-animate.duration.300ms>
    <li>item one</li>
    <li>item two </li>
    <li>item three</li>
</ul>
```
In this example, the animation will occur over 300 milliseconds.
> **Notice:** If the unit is milliseconds (ms), you can omit the ms and just provide the number:
```html
<ul x-data x-animate.duration.300>
    <li>item one</li>
    <li>item two </li>
    <li>item three</li>
</ul>
```
The duration modifier also supports seconds (s):

```html
<ul x-data x-animate.duration.1s>
    <li>item one</li>
    <li>item two </li>
    <li>item three</li>
</ul>
```
#### Using a Plain Object 
You can pass the duration as a plain object like this:
```html
<ul x-data x-animate="{duration:3000}">
    <li>item one</li>
    <li>item two </li>
    <li>item three</li>
</ul>
```
> **Notice:**  When using the object syntax, the duration is always considered to be in milliseconds, so you don't need to specify the unit.

### easing
Specify the easing function for the animation.
#### Using the modifier 

```html
<ul x-data x-animate.easing.ease-in-out>
    <li>item one</li>
    <li>item two</li>
    <li>item three</li>
</ul>
``` 

#### Using a Plain Object 
You can pass the easing as a plain object like this:
```html
<ul x-data x-animate="{ easing: 'ease-in-out' }">
    <li>item one</li>
    <li>item two</li>
    <li>item three</li>
</ul>
```
### Disrespect User Motion Preference
By default, the animation respects the user's motion preferences. You can override this behavior using the disrespectusermotionpreference modifier or within the object passed to the plugin.
#### using the modifier 

```html
<ul x-data x-animate.disrespectusermotionpreference.true>
    <li>item one</li>
    <li>item two</li>
    <li>item three</li>
</ul>
```
#### Using a Plain Object :
```html
<ul x-data x-animate="{ disrespectUserMotionPreference: true }">
    <li>item one</li>
    <li>item two</li>
    <li>item three</li>
</ul>

``` 

### Combined options 

Modifiers can be combined by applying them sequentially, where each modifier key is followed by its value.
```html
<ul x-data x-animate.duration.300.easing.ease-in-out.disrespectusermotionpreference.true>
    <li>item one</li>
    <li>item two</li>
    <li>item three</li>
</ul>
```
In this example, the animation will have a duration of 300 milliseconds, use the easing function ease-in-out, and disrespect the user's motion preferences.
or you can somthings like this 
```html
<ul x-data x-animate="{
  // Animation duration in milliseconds (default: 250)
  duration: 450,
  // Easing for motion (default: 'ease-in-out')
  easing: 'linear'
  // When true, this will enable animations even if the user has indicated
  // they don’t want them via prefers-reduced-motion.
  disrespectUserMotionPreference: false
}">
    <li>item one</li>
    <li>item two</li>
    <li>item three</li>
</ul>
```

1. **Global Configurations**: Implement global configuration options to allow users to set default animation settings across the entire application.

2. **Conditional Enabling/Disabling**: Add support for conditional enabling or disabling of the plugin based on runtime conditions or user preferences.


## Versioning

This projects follow the [Semantic Versioning](https://semver.org/) guidelines.

## License

Copyright (c) Charrafi Mohamed

Licensed under the MIT license, see [LICENSE.md](LICENSE.md) for details.
