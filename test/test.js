const assert = require('assert')
const createCacheWrapper = require('../index')

let count = 0

const cacheWrapper = createCacheWrapper()
const iterator = name => name + (count++).toString()
const cachedIterator = cacheWrapper(iterator)


// iterator should bump `count`
assert.strictEqual(iterator('uncached stuff'), 'uncached stuff0')
assert.strictEqual(iterator('uncached stuff'), 'uncached stuff1')
assert.strictEqual(iterator('uncached stuff'), 'uncached stuff2')

// cached iterator should only bump count on first call
assert.strictEqual(cachedIterator('cached stuff'), 'cached stuff3')
assert.strictEqual(cachedIterator('cached stuff'), 'cached stuff3')
assert.strictEqual(cachedIterator('cached stuff'), 'cached stuff3')

// cached iterator should bump if params change
assert.strictEqual(cachedIterator('cached other stuff'), 'cached other stuff4')
assert.strictEqual(cachedIterator('cached other stuff'), 'cached other stuff4')
assert.strictEqual(cachedIterator('cached other stuff'), 'cached other stuff4')
assert.strictEqual(cachedIterator('cached other stuff', 'foo'), 'cached other stuff5')
assert.strictEqual(cachedIterator('cached other stuff', 'foo'), 'cached other stuff5')
assert.strictEqual(cachedIterator('cached other stuff', 'foo'), 'cached other stuff5')

// cached iterator should refresh if specified
assert.strictEqual(cachedIterator.refresh('cached stuff'), 'cached stuff6')
assert.strictEqual(cachedIterator.refresh('cached stuff'), 'cached stuff7')
assert.strictEqual(cachedIterator.refresh('cached stuff'), 'cached stuff8')

// but should use cache without refresh
assert.strictEqual(cachedIterator('cached stuff'), 'cached stuff8')
assert.strictEqual(cachedIterator('cached stuff'), 'cached stuff8')
assert.strictEqual(cachedIterator('cached stuff'), 'cached stuff8')