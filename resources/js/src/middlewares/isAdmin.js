
export default function isAdmin ({ next, store }){
    window.localStorage.getItem("is_admin") == 'false' ? next({ path: '/' }) : next();
}