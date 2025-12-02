const age = {
    _value: 0,
    get value() {
        return this._value
    },
    set value(val) {
        // ....
        this._value = val
    }
}

// ref()

const user = {
    address: {
        city: 'Paris'
    }
}

let userProxy = new Proxy(user, {
    set(obj, prop, val) {
        // ...
        obj[prop] = val
        return true
    },
    get(obj, prop) {
        return obj[prop]
    }
})

// reactive()

userProxy = {
    address: {
        city: 'lyon'
    }
}