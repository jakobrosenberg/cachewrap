<div ALIGN="center">
  <img src="./logo.svg" WIDTH=200>

  # cachewrapper
</div>

### cache the return of a function


#### Install
```
npm install cachewrapper
```

#### Usage
```javascript
const createCacheWrapper = require('cachewrapper')

const cacheWrapper = createcacheWrapper()

function random(min, max) {
  return Math.random() * (max - min) + min;
}

const wrappedRandom = cacheWrapper(random)

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
const cacheWrapper = createCache(myCustomDefaultHasher)

const wrappedRandom = cacheWrapper(random) // uses myCustomDefaultHasher

const wrappedRandom2 = cacheWrapper(random, myCustomHasher) // uses myCustomHasher
```


<a href='https://www.freepik.com/free-photos-vectors/baby'>Baby vector created by catalyststuff - www.freepik.com</a>