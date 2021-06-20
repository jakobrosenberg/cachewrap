<div ALIGN="center">
  <img src="./logo.svg" WIDTH=200>

  # cachewrap
</div>

### cache the return of a function


#### Install
```
npm install cachewrap
```

#### Usage
```javascript
const createCacheWrap = require('cachewrap')

const cacheWrap = createcacheWrap()

function random(min, max) {
  return Math.random() * (max - min) + min;
}

const wrappedRandom = cacheWrap(random)

wrappedRandom(10, 100) === wrappedRandom(10, 100) // true

```

##### Refreshing
Cached data can be refreshed by using the refresh prop
```javascript
wrappedRandom.refresh(10, 100) === wrappedRandom(10, 100) // true
wrappedRandom(10, 100) === wrappedRandom.refresh(10, 100) // false
```

#### Cache hash
By default all function calls are hashed with `params.map(p => p.toString).join()`.
Continuing the above example, the hash function can be overwritten as:
```javascript
const cacheWrap = createCache(myCustomDefaultHasher)

const wrappedRandom = cacheWrap(random) // uses myCustomDefaultHasher

const wrappedRandom2 = cacheWrap(random, myCustomHasher) // uses myCustomHasher
```


<a href='https://www.freepik.com/free-photos-vectors/baby'>Baby vector created by catalyststuff - www.freepik.com</a>