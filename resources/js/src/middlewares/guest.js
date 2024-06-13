export default function guest ({ next, store }){
    store.getters.isAuthenticated ? next() : next();
}