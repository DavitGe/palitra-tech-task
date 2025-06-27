# Palitra Tech Task

A modern React application built with TypeScript, Vite, and Storybook that demonstrates a complete e-commerce catalog system with authentication flow.

## 🚀 Features

### ✨ **Modern Tech Stack**

- **React 19** with TypeScript for type-safe development
- **Vite** for lightning-fast development and building
- **React Router DOM** for client-side routing
- **SCSS** for advanced styling capabilities
- **Storybook** for component documentation and testing

### 🔐 **Authentication System**

- Secure sign-up form with validation
- Protected routes implementation
- JWT token handling with the `jose` library
- Responsive design that adapts to different screen sizes

### 🛍️ **Product Catalog**

- Dynamic product loading from external API (DummyJSON)
- Infinite scroll pagination for smooth user experience
- Responsive product grid layout
- Loading states and error handling
- Product cards with images, titles, and pricing

### 🎨 **UI/UX Excellence**

- Responsive design that works on all devices
- Smooth animations and transitions
- Professional styling with SCSS
- Component-based architecture for maintainability

### 📚 **Developer Experience**

- ESLint configuration for code quality
- TypeScript for type safety
- Storybook for component documentation
- Hot Module Replacement (HMR) for fast development

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd palitra-tech-task

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📖 Available Scripts

| Command                   | Description                        |
| ------------------------- | ---------------------------------- |
| `npm run dev`             | Start development server with HMR  |
| `npm run build`           | Build for production               |
| `npm run preview`         | Preview production build           |
| `npm run lint`            | Run ESLint for code quality        |
| `npm run storybook`       | Start Storybook development server |
| `npm run build-storybook` | Build Storybook for deployment     |

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── authorization/   # Authentication components
│   ├── catalog/        # Product catalog components
│   ├── Layout/         # Layout components (Header, etc.)
│   ├── routing/        # Routing configuration
│   └── shared/         # Shared/common components
├── pages/              # Page components
│   ├── Authorization.tsx
│   └── Catalog.tsx
├── utils/              # Utility functions and API
├── assets/             # Static assets
├── stories/            # Storybook stories
└── styles/             # Global styles and SCSS variables
```

## 🔄 Application Flow

1. **Authentication Page** (`/auth`)

   - Users start at the sign-up form
   - Responsive design with optional background image
   - Form validation and error handling

2. **Protected Catalog** (`/app/catalog`)
   - Requires authentication to access
   - Displays products in a responsive grid
   - Infinite scroll for loading more products
   - Loading states and error handling

## 🎯 Key Features Explained

### **Infinite Scroll**

The catalog implements smooth infinite scroll pagination that loads 6 products at a time, providing an excellent user experience without overwhelming the browser.

### **Responsive Design**

The application adapts beautifully to different screen sizes:

- Desktop: Full layout with background images
- Tablet: Optimized grid layouts
- Mobile: Stacked layouts for better usability

### **Type Safety**

Full TypeScript implementation ensures:

- Compile-time error detection
- Better IDE support with autocomplete
- Self-documenting code
- Reduced runtime errors

### **Component Documentation**

Storybook integration provides:

- Interactive component documentation
- Visual testing capabilities
- Design system documentation
- Component development in isolation

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deploy Storybook

```bash
npm run build-storybook
```

This creates a static build of Storybook that can be deployed alongside your application.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using React, TypeScript, and Vite**
