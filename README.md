# Peek

A lightweight, modern and customizable toast notification library for web applications. Peek provides beautiful iOS-style toast notifications with smooth animations and a stacking effect.

## Features

- 🪶 Lightweight and zero dependencies
- 🎨 Beautiful iOS-style design
- ⚡️ Smooth animations and transitions
- 📱 Fully responsive
- 🔧 Highly customizable
- 🎯 TypeScript support
- 📦 Modern bundle (ES modules, UMD)
- 🔄 Smart toast stacking
- ⚛️ React support
- 💚 Vue.js support

## Installation

```bash
npm install peek-notify
```

or

```bash
yarn add peek-notify
```

## Usage

### Vanilla JavaScript

```javascript
import { Peek } from 'peek-notify';

// Initialize with default options
const peek = new Peek();

// Show a default toast
peek.show({
  title: 'Hello',
  message: 'Welcome to Peek!'
});

// Show different types of toasts
peek.success('Operation completed successfully!');
peek.error('Something went wrong!');
peek.warning('Please be careful!');
peek.info('Here is some information.');

// With titles
peek.success('Your changes have been saved.', 'Success');
```

### Vue.js Usage

#### Composition API Example

```vue
<!-- composables/usePeek.ts -->
import { ref, onMounted, type Ref } from 'vue'
import { Peek } from 'peek-notify'

export function usePeek(options = {}) {
  const peekInstance: Ref<Peek | null> = ref(null)

  onMounted(() => {
    peekInstance.value = new Peek(options)
  })

  const show = (options: any) => peekInstance.value?.show(options)
  const success = (message: string, title?: string) => peekInstance.value?.success(message, title)
  const error = (message: string, title?: string) => peekInstance.value?.error(message, title)
  const warning = (message: string, title?: string) => peekInstance.value?.warning(message, title)
  const info = (message: string, title?: string) => peekInstance.value?.info(message, title)

  return {
    show,
    success,
    error,
    warning,
    info
  }
}

<!-- Component.vue -->
<script setup lang="ts">
import { usePeek } from '../composables/usePeek'

const toast = usePeek({ maxToasts: 3 })

const showNotification = () => {
  toast.show({
    title: 'Hello Vue!',
    message: 'Welcome to Peek notifications'
  })
}

const showSuccess = () => {
  toast.success('Operation completed!', 'Success')
}
</script>

<template>
  <div>
    <button @click="showNotification">Show Notification</button>
    <button @click="showSuccess">Show Success</button>
  </div>
</template>
```

#### Options API Example

```vue
<!-- plugins/peek.ts -->
import { Peek } from 'peek-notify'

export const peekPlugin = {
  install(app, options = {}) {
    const peek = new Peek(options)
    
    app.config.globalProperties.$peek = {
      show: (opts) => peek.show(opts),
      success: (message, title) => peek.success(message, title),
      error: (message, title) => peek.error(message, title),
      warning: (message, title) => peek.warning(message, title),
      info: (message, title) => peek.info(message, title)
    }
  }
}

<!-- main.ts -->
import { createApp } from 'vue'
import { peekPlugin } from './plugins/peek'
import App from './App.vue'

const app = createApp(App)
app.use(peekPlugin, { maxToasts: 3 })
app.mount('#app')

<!-- Component.vue -->
<script>
export default {
  methods: {
    showNotification() {
      this.$peek.show({
        title: 'Hello Vue!',
        message: 'Welcome to Peek notifications'
      })
    },
    showSuccess() {
      this.$peek.success('Operation completed!', 'Success')
    }
  }
}
</script>

<template>
  <div>
    <button @click="showNotification">Show Notification</button>
    <button @click="showSuccess">Show Success</button>
  </div>
</template>
```

#### Provide/Inject Pattern Example

```vue
<!-- providers/PeekProvider.vue -->
<script setup lang="ts">
import { provide, onMounted, ref } from 'vue'
import { Peek } from 'peek-notify'

const peekKey = Symbol('peek')
const peek = ref<Peek | null>(null)

onMounted(() => {
  peek.value = new Peek()
})

provide(peekKey, {
  show: (options: any) => peek.value?.show(options),
  success: (message: string, title?: string) => peek.value?.success(message, title),
  error: (message: string, title?: string) => peek.value?.error(message, title),
  warning: (message: string, title?: string) => peek.value?.warning(message, title),
  info: (message: string, title?: string) => peek.value?.info(message, title)
})
</script>

<template>
  <slot></slot>
</template>

<!-- App.vue -->
<script setup>
import PeekProvider from './providers/PeekProvider.vue'
</script>

<template>
  <PeekProvider>
    <!-- Your app content -->
  </PeekProvider>
</template>

<!-- Component.vue -->
<script setup lang="ts">
import { inject } from 'vue'

const peek = inject('peek')

const showNotification = () => {
  peek.show({
    title: 'Hello Vue!',
    message: 'Welcome to Peek notifications'
  })
}
</script>

<template>
  <button @click="showNotification">Show Notification</button>
</template>
```

### React Usage

#### Basic Component Example

```jsx
import { useEffect, useRef } from 'react';
import { Peek } from 'peek-notify';

function App() {
  const peekRef = useRef(null);

  useEffect(() => {
    // Initialize Peek once when component mounts
    peekRef.current = new Peek();

    // Optional: Cleanup on unmount
    return () => {
      // Any cleanup if needed
    };
  }, []);

  const showNotification = () => {
    peekRef.current.show({
      title: 'Hello React!',
      message: 'Welcome to Peek notifications'
    });
  };

  const showSuccess = () => {
    peekRef.current.success('Operation completed!', 'Success');
  };

  return (
    <div>
      <button onClick={showNotification}>Show Notification</button>
      <button onClick={showSuccess}>Show Success</button>
    </div>
  );
}

export default App;
```

#### Custom Hook Example

```jsx
// hooks/usePeek.js
import { useEffect, useRef } from 'react';
import { Peek } from 'peek-notify';

export function usePeek(options = {}) {
  const peekRef = useRef(null);

  useEffect(() => {
    peekRef.current = new Peek(options);
  }, []);

  return {
    show: (options) => peekRef.current?.show(options),
    success: (message, title) => peekRef.current?.success(message, title),
    error: (message, title) => peekRef.current?.error(message, title),
    warning: (message, title) => peekRef.current?.warning(message, title),
    info: (message, title) => peekRef.current?.info(message, title),
  };
}

// Usage in component
function MyComponent() {
  const toast = usePeek({ maxToasts: 3 });

  const handleClick = () => {
    toast.success('Operation successful!', 'Success');
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

#### Context Provider Example

```jsx
// context/PeekContext.js
import { createContext, useContext } from 'react';
import { usePeek } from '../hooks/usePeek';

const PeekContext = createContext(null);

export function PeekProvider({ children, options }) {
  const toast = usePeek(options);
  return <PeekContext.Provider value={toast}>{children}</PeekContext.Provider>;
}

export function usePeekContext() {
  const context = useContext(PeekContext);
  if (!context) {
    throw new Error('usePeekContext must be used within a PeekProvider');
  }
  return context;
}

// Usage in app
function App() {
  return (
    <PeekProvider options={{ maxToasts: 3 }}>
      <MyComponent />
    </PeekProvider>
  );
}

// Usage in any component
function MyComponent() {
  const toast = usePeekContext();

  const handleClick = () => {
    toast.success('Operation successful!', 'Success');
  };

  return <button onClick={handleClick}>Show Toast</button>;
}
```

## Configuration

You can customize Peek by passing options when initializing:

```javascript
const peek = new Peek({
  duration: 3000,           // Duration in milliseconds
  maxToasts: 3              // Maximum number of toasts to show at once
});
```

### Options

| Option     | Type   | Default | Description                                      |
|------------|--------|---------|--------------------------------------------------|
| duration   | number | 5000    | Duration in milliseconds before toast disappears |
| maxToasts  | number | 3       | Maximum number of toasts to show at once        |

### Toast Options

When showing a toast, you can pass the following options:

```javascript
peek.show({
  title: 'Optional Title',      // Optional toast title
  message: 'Toast message',     // Required toast message
  type: 'success',              // Toast type ('default', 'success', 'error', 'warning', 'info')
  duration: 3000                // Optional duration override
});
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 