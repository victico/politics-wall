export default function guest (_to, _from, next) {
    document.title = _to.meta.title + ' - Muro de politicos'
   const isAuthenticated = window.localStorage.getItem('id_token');
   if (isAuthenticated) {
     next({ path: '/admin' });
   } else {
     next();
    }
}