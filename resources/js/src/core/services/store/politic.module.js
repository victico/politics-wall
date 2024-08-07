import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const GET_POLITICS = "GET_POLITICS";
export const GET_POLITICS_PUBLIC = "GET_POLITICS_PUBLIC";
export const GET_POLITIC_BY_ID = "GET_POLITIC_BY_ID";
export const STORE_POLITIC = "STORE_POLITIC";
export const UPDATE_POLITIC = "UPDATE_POLITIC";
export const DELETE_POLITIC = "DELETE_POLITIC"
export const GET_POLITIC_BY_SEARCH = "GET_POLITIC_BY_SEARCH"

const actions = {
  [GET_POLITICS](context, data){
    return new Promise((resolve, reject) => {
      // if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("api/politic?page="+data.pageNumber+"&name="+data.search+"&")
        .then(( { data } ) => {
            // console.log(data)
            resolve(data);
            
        })
        .catch(( { response } ) => {
          console.log(response )
          reject('Ocurrió un error desconocido al intentar obtener las ordenes');
        });
      // }
    });
  },
  [GET_POLITICS_PUBLIC](context,data){
    return new Promise((resolve, reject) => {
      // if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("api/public/politic?page="+data.pageNumber+"&name="+data.search+"&")
        .then(( { data } ) => {
            // console.log(data)
            resolve(data);
            
        })
        .catch(( { response } ) => {
          console.log(response )
          reject('Ocurrió un error desconocido al intentar obtener las ordenes');
        });
      // }
    });
  },
  [GET_POLITIC_BY_ID](context,politicID){
    return new Promise((resolve, reject) => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("api/politic/getPolitic/"+politicID)
        .then(( { data } ) => {
            // console.log(data)
            resolve(data);
            
        })
        .catch(( { response } ) => {
            console.log(response )
            reject('Ocurrió un error desconocido al intentar obtener las ordenes');
        });
      }
    });
  },
  [GET_POLITIC_BY_SEARCH](context,search){
    return new Promise((resolve, reject) => {
      // if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("/api/politic/q?search="+search)
        .then(( { data } ) => {
          resolve(data);
        })
        .catch(( { response } ) => {
            console.log(response )
            reject('Ocurrió un error desconocido al intentar obtener las ordenes');
        });
      // }
    });
  },
  [STORE_POLITIC](context, data){
    return new Promise((resolve, reject) => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.post("api/politic", data)
        .then(( { data } ) => {
            console.log(data)
            resolve(data);
            
        })
        .catch(( { response } ) => {
            console.log(response )
            reject( response.data.error ?? 'Ocurrió un error al crear el politico');
        });
      }
    });

  },
  [UPDATE_POLITIC](context, data){
    return new Promise( (resolve, reject) => {
      ApiService.setHeader();
      ApiService.post('api/politic/'+data.id, data.data)
      .then(( {data} ) =>{
        resolve(data);
      })
      .catch(( { response } ) => {
        console.log(response )
        reject('Ocurrió un error desconocido al intentar obtener las ordenes');
      });
    })
  },
  [DELETE_POLITIC](context, politicID){
    return new Promise( (resolve, reject) => {
      ApiService.setHeader();
      ApiService.post('api/politic/delete/'+politicID)
      .then(( {data} ) =>{
        resolve(data);
      })
      .catch(( { response } ) => {
        console.log(response )
        reject('Ocurrió un error desconocido al intentar obtener las ordenes');
      });
    })
  }
};
export default {
    actions,
};
