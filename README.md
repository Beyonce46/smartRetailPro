# BIT 4107 - Mobile Application Development

## SmartRetailPro

A cross-platform retail management mobile application built with React Native and Expo.

## Features

- Dashboard with retail analytics
- Inventory management
- Product management
- User authentication
- iOS, Android, and Web support
## Tech Stack

- React Native 0.85.3
- Expo 56.0.8
- TypeScript 6.0.3
- React Navigation 7.x

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the app**
   ```bash
   npx expo start
   ```

3. **Run on your device**
   - Press `i` for iOS
   - Press `a` for Android
   - Press `w` for web
   - Scan QR code with Expo Go app

---

## 📚 Unit Learning Objectives

This project demonstrates competency in:

- ✅ **Cross-Platform Development** - Building applications that run on multiple platforms
- ✅ **React Native Framework** - Understanding component-based architecture
- ✅ **TypeScript Integration** - Writing type-safe mobile applications
- ✅ **State Management** - Using React Context and hooks
- ✅ **Navigation Patterns** - Implementing complex navigation flows
- ✅ **UI/UX Design** - Creating responsive and accessible interfaces
- ✅ **Mobile Best Practices** - Performance optimization and platform-specific considerations
- ✅ **Project Structure** - Organizing code for scalability and maintainability

---

##  Development Workflow

### Coding Standards

- Use **TypeScript** for new components
- Follow **React hooks** patterns for state management
- Maintain consistent naming conventions (camelCase for functions/variables, PascalCase for components)
- Use functional components over class components
- Document complex logic with comments

### Component Development

1. Create components in `src/components/`
2. Use `themed-view.tsx` and `themed-text.tsx` for consistent styling
3. Implement responsive design using platform-specific files (`.web.tsx`, `.native.tsx`)
4. Export components from index files for clean imports

### Screen Development

1. Add new screens to `src/screens/`
2. Connect screens via React Navigation in `app-tabs.tsx`
3. Use AppContext for shared state between screens
4. Implement proper loading and error states

### Styling Approach

- Use `global.css` for application-wide styles
- Use module CSS files for component-specific styles (`.module.css`)
- Leverage theme constants from `src/constants/theme.ts`
- Support both light and dark modes via `use-color-scheme` hook

---

##  Testing & Quality Assurance

### Running Linter

```bash
npx expo lint
```

### Unit Testing (Optional)

For unit testing setup with Jest:

```bash
npx expo install --save-dev jest @testing-library/react-native
```

Follow the [Expo unit testing guide](https://docs.expo.dev/develop/unit-testing/)

---

##  Key Resources

### Official Documentation

- [Expo Documentation](https://docs.expo.dev/) - Complete Expo reference
- [React Native Docs](https://reactnative.dev/) - React Native API reference
- [React Navigation](https://reactnavigation.org/) - Navigation library docs
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript reference

### Learning Resources

- [Expo Tutorial](https://docs.expo.dev/tutorial/introduction/)
- [React Hooks Documentation](https://react.dev/reference/react)
- [React Native CLI Troubleshooting](https://reactnative.dev/docs/troubleshooting)

---

##  Troubleshooting

### Common Issues

**Issue: Blank screen after launch**

- Clear cache: `expo start --clear`
- Reinstall dependencies: `rm -rf node_modules && npm install`

**Issue: Module not found errors**

- Check import paths (TypeScript files should use `.ts` or `.tsx`)
- Verify file structure matches export statements

**Issue: Platform-specific code not loading**

- Restart Expo: `expo start --clear`
- Verify `.native.tsx` and `.web.tsx` files exist in same directory

**Issue: Development server not starting**

- Check port 8081 is not in use: `netstat -ano | findstr :8081` (Windows)
- Restart terminal and run `npx expo start`

For more help, check the [Expo troubleshooting guide](https://docs.expo.dev/troubleshooting/troubleshooting-build-credentials/)

---

##  Contributing Guidelines

1. **Create feature branches** from `main`
2. **Write meaningful commit messages**
3. **Test on multiple platforms** before submitting
4. **Follow the coding standards** outlined above
5. **Document significant changes** in code comments

---

##  License

This project is provided as part of the BIT 4107 - Mobile Application Development unit. See the [LICENSE](LICENSE) file for details.

---

##  Support

For unit-specific questions and support:

- Refer to unit materials on your learning management system
- Contact your instructor during office hours
- Consult the [Expo Discord community](https://chat.expo.dev)

---

**Last Updated:** June 2026  
**Expo Version:** ~56.0.8  
**React Native Version:** 0.85.3
