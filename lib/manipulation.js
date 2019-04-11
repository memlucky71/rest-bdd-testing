/**
 * Created by mohammad on 4/9/2019 AD.
 */


class Manipulator {

    constructor(objectDiff, arrayDiff) {
        this.objectDiff = objectDiff;
        this.arrayDiff = arrayDiff;
    }

    apply() {
        throw new Error('This method should be implemented in the child class');
    }
}


class Update extends Manipulator {
    constructor(objectDiff) {
        super(objectDiff, null);
    }

    apply(container) {
        for (const key of Object.keys(this.objectDiff)) {
            if (!container.hasOwnProperty(key)) {
                throw new Error(`The key ${key} is not in target container`);
            }
        }
        Object.assign(container, this.objectDiff);
    }
}


class Append extends Manipulator {
    constructor(objectDiff) {
        super(objectDiff, null);
    }

    apply(container) {
        for (const key of Object.keys(this.objectDiff)) {
            if (container.hasOwnProperty(key)) {
                throw new Error(`The key ${key} is already exists in target container`);
            }
        }
        Object.assign(container, this.objectDiff);
    }
}


class Remove extends Manipulator {
    constructor(arrayDiff) {
        super(null, arrayDiff)
    }

    apply(container) {
        for (let element of this.arrayDiff) {
            if (!(container.hasOwnProperty(element))) {
                throw new Error(`Target container has no key ${element}`)
            }

            delete container[element]
        }
    }
}

export {Manipulator, Update, Append, Remove};