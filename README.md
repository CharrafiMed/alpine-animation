# Alpine Animation Plugin

A seamless Alpine.js plugin that brings smooth animations to your DOM changes using the powerful [AutoAnimate](https://auto-animate.formkit.com/) library under the hood.

Perfect for animating list changes, table updates, card shuffles, and any dynamic content that gets added, removed, or reordered.

## ✨ Features

- **Zero Configuration** - Works out of the box with sensible defaults
- **Multiple Configuration Methods** - Use modifiers, objects, or global settings
- **Global Configuration** - Set defaults for your entire application
- **Method Chaining** - Fluent API for easy setup
- **TypeScript Ready** - Full type support (when available)
- **Lightweight** - Minimal overhead, maximum performance

## 📦 Installation

### Via CDN

Include the plugin **before** Alpine's core JS file:

```html
<!-- Alpine Animation Plugin -->
<script src="https://cdn.jsdelivr.net/npm/@charrafimed/alpine-animation@latest/dist/cdn.min.js" defer></script>

<!-- Alpine Core -->
<script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
```

### Via NPM

```bash
npm install @charrafimed/alpine-animation
```

Then register the plugin:

```javascript
import Alpine from 'alpinejs'
import AlpineAnimation from '@charrafimed/alpine-animation'

// Optional: Configure global defaults
AlpineAnimation.customize({ 
  duration: 400, 
  easing: 'ease-out' 
})

Alpine.plugin(AlpineAnimation)
Alpine.start()
```

## 🚀 Quick Start

Add the `x-animate` directive to any container, and watch the magic happen:

```html
<div x-data="{ items: ['Apple', 'Banana', 'Cherry'] }" x-animate>
  <template x-for="item in items">
    <div x-text="item" x-on:click="items.splice(items.indexOf(item), 1)"></div>
  </template>
  <button x-on:click="items.push('New Item')">Add Item</button>
</div>
```

**That's it!** Items will now animate smoothly when added, removed, or reordered.

## ⚙️ Configuration Options

### Using Modifiers

Chain modifiers directly on the directive:

```html
<!-- Custom duration -->
<div x-animate.duration.600ms>...</div>
<div x-animate.duration.1s>...</div>
<div x-animate.duration.300>...</div> <!-- defaults to ms -->

<!-- Custom easing -->
<div x-animate.easing.ease-in-out>...</div>
<div x-animate.easing.linear>...</div>

<!-- Ignore user motion preferences -->
<div x-animate.disrespectusermotionpreference.true>...</div>

<!-- Combine multiple modifiers -->
<div x-animate.duration.500ms.easing.ease-out.disrespectusermotionpreference.true>
  <!-- Your animated content -->
</div>
```

### Using Object Configuration

For more complex configurations, pass a JavaScript object:

```html
<div x-animate="{ 
  duration: 600, 
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  disrespectUserMotionPreference: false 
}">
  <!-- Your content -->
</div>
```

### Conditional Animation

Disable animations conditionally:

```html
<div x-data="{ animate: true }" x-animate="animate">
  <!-- Animation only runs when animate is true -->
</div>

<!-- Or disable completely -->
<div x-animate="false">
  <!-- No animation -->
</div>
```

## 🌐 Global Configuration

Set default configuration for all animations in your application:

### Basic Global Setup

```javascript
import AlpineAnimation from '@charrafimed/alpine-animation'

// Configure before registering with Alpine
AlpineAnimation.customize({
  duration: 400,
  easing: 'ease-out',
  disrespectUserMotionPreference: false
})

Alpine.plugin(AlpineAnimation)
```

### Available Global Methods

```javascript
// Set global defaults
AlpineAnimation.customize({ duration: 500 })

// Method chaining
AlpineAnimation
  .customize({ duration: 300 })
  .customize({ easing: 'linear' })

// Get current global configuration
const config = AlpineAnimation.getConfig()
console.log(config) // { duration: 300, easing: 'linear', ... }

// Reset to original defaults
AlpineAnimation.reset()
```

### Configuration Priority

Settings are applied in this order (highest to lowest priority):

1. **Object expression**: `x-animate="{ duration: 1000 }"`
2. **Modifiers**: `x-animate.duration.500ms`
3. **Global configuration**: `AlpineAnimation.customize()`
4. **Default values**: Built-in defaults

## 📋 Configuration Reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `duration` | `number` | `300` | Animation duration in milliseconds |
| `easing` | `string` | `'ease-in-out'` | CSS easing function |
| `disrespectUserMotionPreference` | `boolean` | `false` | Ignore `prefers-reduced-motion` setting |

### Easing Options

Common easing values you can use:

- `'linear'` - Constant speed
- `'ease'` - Slow start, fast middle, slow end
- `'ease-in'` - Slow start
- `'ease-out'` - Slow end  
- `'ease-in-out'` - Slow start and end
- `'cubic-bezier(0.4, 0, 0.2, 1)'` - Custom cubic bezier

## 💡 Usage Examples

### Todo List

```html
<div x-data="{ 
  todos: ['Learn Alpine.js', 'Build something cool'],
  newTodo: ''
}" x-animate.duration.300ms>
  
  <template x-for="(todo, index) in todos" :key="todo">
    <div class="todo-item" x-on:click="todos.splice(index, 1)">
      <span x-text="todo"></span>
      <button>×</button>
    </div>
  </template>
  
  <form x-on:submit.prevent="todos.push(newTodo); newTodo = ''">
    <input x-model="newTodo" placeholder="Add todo...">
    <button type="submit">Add</button>
  </form>
</div>
```


### Table Rows

```html
<table x-data="{ 
  users: [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
  ]
}">
  <tbody x-animate.duration.400ms>
    <template x-for="user in users" :key="user.id">
      <tr>
        <td x-text="user.name"></td>
        <td x-text="user.email"></td>
        <td>
          <button x-on:click="users = users.filter(u => u.id !== user.id)">
            Delete
          </button>
        </td>
      </tr>
    </template>
  </tbody>
</table>
```

## 🎛️ Advanced Usage

### Multiple Animation Containers

```html
<div x-data="{ fastItems: [], slowItems: [] }">
  <!-- Fast animations -->
  <div x-animate.duration.150ms>
    <template x-for="item in fastItems">
      <div x-text="item"></div>
    </template>
  </div>
  
  <!-- Slow animations -->
  <div x-animate.duration.800ms.easing.ease-in-out>
    <template x-for="item in slowItems">
      <div x-text="item"></div>
    </template>
  </div>
</div>
```

### Responsive Animation Settings

```html
<div x-data="{ isMobile: window.innerWidth < 768 }" 
     x-animate="{ 
       duration: isMobile ? 200 : 400,
       easing: isMobile ? 'ease' : 'ease-in-out'
     }">
  <!-- Content adapts animation to screen size -->
</div>
```

### Theme-Based Configuration

```javascript
// Set up different themes
const themes = {
  fast: { duration: 150, easing: 'ease' },
  smooth: { duration: 400, easing: 'ease-in-out' },
  slow: { duration: 800, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
}

// Apply theme
AlpineAnimation.customize(themes.smooth)
```

## 🐛 Troubleshooting

### Common Gotchas

```html
<!-- ❌ Won't work - animate the container, not individual items -->
<div x-for="item in items">
  <div x-animate>{{ item }}</div>
</div>

<!-- ✅ Correct - animate the parent container -->
<div x-animate>
  <div x-for="item in items">
    <div>{{ item }}</div>
  </div>
</div>
```

## 🤝 Contributing

Found a bug or have a feature request? We'd love to hear from you!

- **Issues**: [GitHub Issues](https://github.com/charrafimed/alpine-animation/issues)
- **Pull Requests**: [GitHub PRs](https://github.com/charrafimed/alpine-animation/pulls)

## 📄 License

MIT License - see [LICENSE.md](LICENSE.md) for details.

---

**Built with ❤️ for the Alpine.js community**