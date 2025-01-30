# GloeLIB
Gloe is a library for creating window style debugging tools on the fly.

### Usage
1. Pick Gloe CDN link (or self host, it doesnt matter)
```py
# Pick from one of these:
https://rawcdn.githack.com/klashdevelopment/gloe/main/gloe.js
https://raw.githack.com/klashdevelopment/gloe/refs/heads/main/gloe.js
https://raw.githubusercontent.com/klashdevelopment/gloe/refs/heads/main/gloe.js
```
2. Fetch gloe to register
```js
fetch('https://raw.githubusercontent.com/klashdevelopment/gloe/refs/heads/main/gloe.js')
    .then(gloeScript => gloeScript.text())
    .then(gloeScript => eval(gloeScript))
    .then(_ => {
        // do step 3 here!!
    });
```
3. Make your windows
```js
window.gloe.create({ ... });
```
All parameters are optional, see below for more information:

| Name | Type | Example |
| --- | --- | --- |
| `title` | String | "Awesome Title" |
| `id` | HTML ID compiliant String | "awesome-title" |
| `content` | String or HTMLElement | "<b>Hello, World!</b>" |
| `onCreated` | Function<HTMLDivElement> | (window)=>{ ... } |

Use **onCreated** to add event listeners to inputs/buttons. Takes in the generated gloe-window


### Manual minification
```
Minify and make this as small as physically possible, removing all unused funcs and minifying variable names (however keep the syntax window.gloe.create({title: "", content: "", id: "", onCreated: ()=>{}})
```
