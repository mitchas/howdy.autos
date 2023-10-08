# howdy.autos
leave messages for license plates (US)

## Built With
* [Svelte](https://svelte.dev) - Framework
* [Supabase](supabase.com) - Backend - DB, Storage
* No frontend/CSS frameworks

### Third-party packages:
 * [DayJS](https://day.js.org/) for Dates
 * [Numeral.js](http://numeraljs.com/) for Number stuff
 * [Iconoir](https://iconoir.com/) icons

&nbsp;

&nbsp;

# Project Installation & Development

## .env files
You need config values in your .env files. - 
.env.local, .env.production.local, .env.test.local

```
NODE_ENV=development
VITE_SUPABASE_URL=https://xxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxx
VITE_PUBLIC_STORAGE_URL=https://xxxxxxxxx.supabase.co/storage/v1/object/public/
```



## Packages
```bash
npm install
```

## NPM Commands

### **Run**
#### Serve on [localhost:8080](https://localhost:8080)
```bash
npm run serve
npm run serve-test
npm run serve-prod
```

### **Build**
#### Build with test configuration
```bash
npm run build
npm run build-test
npm run build-prod
```

You can preview the production build with `npm run preview`.