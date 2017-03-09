# Found differences

documenting the current status of affairs

## float formatter

FF:

```js
console.log("%f", 23)
23.000000
```

Chrome:

```js
console.log("%f", 23)
23
```

FF:

```
console.log('bjoern and robert are born on the %fst dec', 1.234)
bjoern and robert are born on the 1.234000st dec
```

Chrome:

```
console.log('bjoern and robert are born on the %fst dec', 1.234)
bjoern and robert are born on the 1.234st dec
````

FF:

```js
console.log("%f", null)
0.000000
```

Chrome:

```js
console.log("%f", null)
NaN
```

## integer formatter

FF:

```js
console.log("%d", null)
0
```

Chrome:

```js
console.log("%d", null)
NaN
```

FF:

```
console.log('bjoern and robert are born on the %dst dec', "foo")
bjoern and robert are born on the 0st dec
```

Chrome:

```js
console.log('bjoern and robert are born on the %dst dec', "foo")
bjoern and robert are born on the NaNst dec
```

## not enough arguments to interpolate all placeholders

FF:

```js
console.log("%s %snewword", "duck")
duck newword
```

Chrome:

```js
console.log("%s %snewword", "duck")
duck %snewword
```

## console.assert - string formatter

FF / Edge:

```js
console.assert(false, "robert keeps %s on his balcony", "plaices")
robert keeps plaices on his balcony
```

Chrome:

```js
console.assert(false, "robert keeps %s on his balcony", "plaices")
Assertion failed: robert keeps %s on his balcony plaices
```


## console.assert

FF / Edge:

```js
console.assert(false, "robert keeps %s on his balcony", {foo: "bar"})
robert keeps [object Object] on his balcony
```

Chrome:

```js
console.assert(false, "robert keeps %s on his balcony", {foo: "bar"})
Assertion failed: robert keeps %s on his balcony Object {foo: "bar"}
```

## console.table - printing of strings

FF:

```js
console.table("the plaice living on the balcony")
```

![Image of Firefox printing console.table():](images/notes/console-table-string-ff.png)


Chrome:

```js
console.table("the plaice living on the balcony")
```

![Image of Chrome printing the string](images/notes/console-table-string-chrome.png)


## console.table - Sets

FF:

```js
console.table(new Set([{name: "terin", owner: false}, {name: "robert", owner: false}, {name: "domenic", owner: true}]))
```

![Image of Firefox displaying the Set as a table](images/notes/console-table-set-ff.png)

Chrome:

```js
console.table(new Set([{name: "terin", owner: false}, {name: "robert", owner: false}, {name: "domenic", owner: true}]))
```

![Image of Chrome not printing the Set as a table](images/notes/console-table-set-chrome.png)


## console.table - Indexes

FF:

```js
console.table([[1, 2, 3, 4], [5, 6, 7, 8]], [2, 3])
```

![Image of Firefox not displaying the table with custom indexes](images/notes/console-table-custom-index-ff.png)


Chrome:

```js
console.table([[1, 2, 3, 4], [5, 6, 7, 8]], [2, 3])
```

![Image of Chrome not displaying the table with custom indexes](images/notes/console-table-custom-index-chrome.png)


## console.table - Multiple Arguments


FF:

```js
console.table([[1, 2, 3, 4], [5, 6, 7, 8]], 2, 3)
```

![Image of Firefox not displaying the table with additional arguments](images/notes/console-table-add-args-ff.png)

Chrome:

```js
console.table([[1, 2, 3, 4], [5, 6, 7, 8]], 2, 3)
```

![Image of Chrome not displaying the table with additional arguments](images/notes/console-table-add-args-chrome.png)


## console.count - counters and label repetition

Edge:

```js
console.count('foo')
undefined
foo:           2
console.count('foo')
undefined
```

FF / Chrome:

```js
console.count('foo')
foo: 1
undefined
console.count('foo')
foo: 2
undefined
```

*Edge: the counter is raised where the first label `foo` is printed*
<br/>
*FF/Chrome: the label is printed multiple times with the current counter*


## console.count - objects / arrays

Edge:

```js
console.count({})
undefined
[object Object]: 1

console.count([])
undefined
:           1
```

Chrome:

```js
console.count({})
[object Object]: 1
undefined

console.count([])
: 1
undefined
```

FF:

```js
console.count({})
[object Object]: 1
undefined

console.count([])
<no label>: 1
undefined
```

*`<no label>` appears in FF*

## console.count - no arguments

Edge:

```js
console.count()
undefined
: 1
```

Chrome:

```js
console.count()
: 1
undefined
```

FF:

```js
console.count()
<no label>: 1
undefined
```

*`<no label>` appears in FF*

## - no arguments / empty strings

Edge:

```js
console.count()
: 1
undefined

console.count("")
: 1
undefined
```

Chrome:

```js
console.count()
: 1
undefined

console.count("")
: 2
undefined
```

FF:

```js
console.count()
<no label>: 1
undefined
console.count("")
<no label>: 2
undefined
```

*Chrome/FF count no-arguments and empty-string as the same counter, FF adds `<no label>`.*
<br>
*Edge counts empty-string and no-arguments separetely*

## console.count - null

Edge:

```js
console.count(null)
undefined
: 2
```

Chrome:

```js
console.count(null)
null: 2
undefined
```

FF:

```js
console.count(null)
null: 1
undefined
```

*Edge has no label*

## console.count - undefined

Edge:

```js
console.count(undefined)
: 1
undefined
```

Chrome:


```js
console.count(undefined)
undefined: 1
undefined
```

FF:

```js
console.count(undefined)
undefined: 1
undefined
```

*Edge has no label*


## console.time - no param/undefined

FF:

```js
console.time() // no timer started
console.time(undefined) // no timer started
```

Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1270636

Chrome:

```js
console.time()
console.time(undefined)

console.timeEnd()
default: <time in ms here>
console.timeEnd()
undefined: <time in ms here>
```

Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=696798

## console.time - label conversion / conversion errors

FF:

```js
console.time({ toString() {throw new Error("Farolino")} }) // toString called, no error thrown, no timer started
```

Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1343013

Chrome:

```js
console.time({ toString() { return 'conversion' } }) // timer started with label `[object Object]`

console.timeEnd('conversion')
console.timeEnd({})
[object Object]: <time in ms here>

// ...

console.time({ toString() { throw new Error("Farolino") } }) // toString never called, no timer started
```

Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=696805

Edge:

```js
console.time({ toString() { throw new Error("Farolino") } }) // toString called, no error thrown, no timer started
```

Bug: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/11201116/