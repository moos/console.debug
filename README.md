# console.debug

Helpers for Visionmedia's [debug](https://github.com/visionmedia/debug)  in the browser.

## Install
```
npm install
```
In your html:
```
   <script src="<install-path>/console.debug/index.js"></script>
```
Or via modules:
```
   require('console.debug');
```

## Usage

### enable / disable a namespace
```
console.debug('foo').enable();
console.debug('foo').enabled;  // true
console.debug('foo').disable();
```

### enable / disable globally
```
localStorage.debug = 'foo,bar';
console.debug(); // ['foo','bar'];

// disable all
console.debug.disable();  // undefined

// re-enable previous
console.debug.enable();  // 'foo,bar'
```

## To-do
- html edit

## Change log
-v0.1.0 initial version

## License
ISC
