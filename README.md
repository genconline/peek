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

## Installation

```bash
npm install peek-notify
```

or

```bash
yarn add peek-notify
```

## Usage

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