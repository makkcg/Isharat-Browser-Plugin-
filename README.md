# Isharat إشارات

### ♦ How to run development version locally (Frontend) ?

- You need to install node modules first
- Open terminal or CMD
- change directory to 'plugin' or 'dashboard/frontend' directory and type

```
npm install
```

- then type

```
npm start
```

---

### ♦ How to build production version (Frontend) ?

- First make sure node modules are installed
- use terminal or CMD in 'plugin' or 'dashboard/frontend' directory then type

```
npm run build
```

- this will build project to production in 'dist' folder

---

### ♦ Plugin

- Production version path: plugin/dist

- React.js Production version will run only when added in browser extensions or using server and cannot run normally (will not run if you open index.html)

- Available and tested in Chrome, Firefox, Edge

- for testing on Firefox browser you need to replace ("service_worker": "background.js") to ("scripts": ["background.js"]) in manifest.json file
