## CUSTOM SKINS WELCOME!

### HOW TO CREATE

1. Gather the following assets that you would like to replace:

```
// check system/context/FileThemeContext.tsx for the latest skin settings
export interface FileThemeCustomOptions {
  // ...
};
```

2. Create a new ts file with the skin name and put it in [./components/filetheme](components/filetheme)
3. Then update [./system/context/FileThemeContext.tsx](system/context/FileThemeContext.tsx) with the following changes:

 - Update the `type FileTheme` to include the name of your theme.
 - Update `const themeMap` to include your `filetheme` that you created in step 2.


### HOW TO SUBMIT

See [CONTRIBUTING.md](./CONTRIBUTING.md)


