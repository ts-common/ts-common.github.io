// properties vs methods

interface Methods {
    /* readonly */ f();
}

const m: Methods = { f: () => {} }

m.f = () => {};

interface Properties {
    readonly f: () => {}
}

const b: Properties = m;

// b.f = () => {}; // error!
