# Image Loading Components

This directory contains reusable image components with built-in loading states, error handling, and smooth transitions.

## Components

### 1. Image Component (`<Image />`)

A drop-in replacement for the standard `<img>` tag with loading states and error handling.

#### Features

- ✅ Loading spinner while image loads
- ✅ Error state with broken image icon
- ✅ Smooth fade-in transition
- ✅ Customizable loading and error states
- ✅ All standard img attributes supported
- ✅ TypeScript support

#### Usage

```tsx
import Image from '../shared/Image';

// Basic usage
<Image
  src="/path/to/image.jpg"
  alt="Description"
/>

// With custom styling
<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={300}
  height={200}
  className="my-image"
  loadingSpinnerColor="#ff6b6b"
  loadingSpinnerSize={40}
  style={{ borderRadius: '8px' }}
/>

// With callbacks
<Image
  src="/path/to/image.jpg"
  alt="Description"
  onLoad={() => console.log('Image loaded!')}
  onError={() => console.log('Image failed to load')}
/>
```

#### Props

| Prop                     | Type         | Default     | Description                            |
| ------------------------ | ------------ | ----------- | -------------------------------------- |
| `src`                    | `string`     | -           | **Required.** Image source URL         |
| `alt`                    | `string`     | -           | **Required.** Alternative text         |
| `loadingSpinnerColor`    | `string`     | `"#6c46aa"` | Color of the loading spinner           |
| `loadingSpinnerSize`     | `number`     | `30`        | Size of the loading spinner            |
| `loadingBackgroundColor` | `string`     | `"#f8f9fa"` | Background color during loading        |
| `showErrorIcon`          | `boolean`    | `true`      | Show broken image icon on error        |
| `errorIconColor`         | `string`     | `"#afafaf"` | Color of the error icon                |
| `errorIconSize`          | `number`     | `34`        | Size of the error icon                 |
| `containerClassName`     | `string`     | `""`        | CSS class for the container div        |
| `onLoad`                 | `() => void` | -           | Callback when image loads successfully |
| `onError`                | `() => void` | -           | Callback when image fails to load      |

### 2. BackgroundImage Component (`<BackgroundImage />`)

A component for CSS background images with loading states and error handling.

#### Features

- ✅ Loading spinner while background image loads
- ✅ Error state with fallback color
- ✅ Smooth fade-in transition
- ✅ Supports children elements
- ✅ Customizable loading and error states
- ✅ TypeScript support

#### Usage

```tsx
import BackgroundImage from '../shared/BackgroundImage';

// Basic usage
<BackgroundImage src="/path/to/background.jpg">
  <div>Content overlaid on background</div>
</BackgroundImage>

// With custom styling
<BackgroundImage
  src="/path/to/background.jpg"
  className="hero-section"
  loadingSpinnerColor="#ffffff"
  loadingSpinnerSize={50}
  fallbackColor="#e3f2fd"
  style={{ height: '100vh' }}
>
  <h1>Hero Title</h1>
</BackgroundImage>
```

#### Props

| Prop                     | Type                  | Default     | Description                            |
| ------------------------ | --------------------- | ----------- | -------------------------------------- |
| `src`                    | `string`              | -           | **Required.** Background image URL     |
| `children`               | `ReactNode`           | -           | Content to render over the background  |
| `className`              | `string`              | `""`        | CSS class for the container            |
| `loadingSpinnerColor`    | `string`              | `"#6c46aa"` | Color of the loading spinner           |
| `loadingSpinnerSize`     | `number`              | `40`        | Size of the loading spinner            |
| `loadingBackgroundColor` | `string`              | `"#f8f9fa"` | Background color during loading        |
| `fallbackColor`          | `string`              | `"#e9ecef"` | Background color on error              |
| `style`                  | `React.CSSProperties` | -           | Additional styles for the container    |
| `onLoad`                 | `() => void`          | -           | Callback when image loads successfully |
| `onError`                | `() => void`          | -           | Callback when image fails to load      |

## Migration Guide

### From `<img>` to `<Image>`

```tsx
// Before
<img
  src="/image.jpg"
  alt="Description"
  width={300}
  height={200}
  className="my-image"
/>

// After
<Image
  src="/image.jpg"
  alt="Description"
  width={300}
  height={200}
  className="my-image"
/>
```

### From CSS background-image to `<BackgroundImage>`

```scss
// Before (CSS)
.hero {
  background-image: url("/hero.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
}
```

```tsx
// Before (JSX)
<div className="hero">
  <h1>Hero Title</h1>
</div>

// After
<BackgroundImage
  src="/hero.jpg"
  style={{ height: '100vh' }}
>
  <h1>Hero Title</h1>
</BackgroundImage>
```

## Best Practices

1. **Always provide alt text** for the Image component for accessibility
2. **Use appropriate spinner sizes** - smaller for thumbnails, larger for hero images
3. **Consider loading performance** - use appropriate image sizes and formats
4. **Handle errors gracefully** - provide meaningful error states
5. **Use consistent loading colors** that match your design system
