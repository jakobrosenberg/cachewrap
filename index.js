/**
 * @callback IdGenerator
 * @param {any[]} params
 * @returns {any}
 */

/** @type {IdGenerator} */
const _idGenerator = params => params.map(param => param.toString()).join('-')

/**
 * @param {IdGenerator} defaultIdGenerator 
 */
const createCacheWrapper = (defaultIdGenerator = _idGenerator) => {
    const cache = new Map()

    /**
     * @template {(...params: any[]) => any} T
     * @param {T} fn
     * @param {IdGenerator} idGenerator
     * @returns {T & {refresh: T}}
     */
    const cacheWrapper = (fn, idGenerator = defaultIdGenerator) => {
        const wrapped = (...params) => {
            const id = idGenerator(params)
            if (!cache.has(id)) {
                const result = fn(...params)
                if (result && result.then) {
                    return new Promise(resolve => {
                        result.then(res => {
                            cache.set(id, res)
                            resolve(res)
                        })
                    })
                } else cache.set(id, result)
            }
            return cache.get(id)
        }

        wrapped.refresh = (...params) => {
            const id = idGenerator(params)
            cache.delete(id)
            return wrapped(...params)
        }

        /** @ts-ignore */
        return wrapped
    }

    return cacheWrapper
}

module.exports = createCacheWrapper