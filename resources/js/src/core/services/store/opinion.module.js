import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const GET_OPINION = "GET_OPINION";
export const GET_OPINION_PUBLIC = "GET_OPINION_PUBLIC";
export const GET_OPINION_BY_ID = "GET_OPINION_BY_ID";
export const STORE_OPINION = "STORE_OPINION";
export const UPDATE_OPINION = "UPDATE_OPINION";
export const DELETE_OPINION = "DELETE_OPINION"
export const GET_OPINION_BY_SEARCH = "GET_OPINION_BY_SEARCH"
export const GET_PUBLIC = "GET_PUBLIC"
export const GET_OPINION_BY_ID_PUBLIC = "GET_OPINION_BY_ID_PUBLIC"
const actions = {
  [GET_OPINION](context, data){
    return new Promise((resolve, reject) => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("api/opinion?page="+data.pageNumber+"&name="+data.search+"&")
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
  [GET_OPINION_PUBLIC](context,data){
    return new Promise((resolve, reject) => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("api/public/opinion?page="+data.pageNumber+"&name="+data.search+"&")
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
  [GET_OPINION_BY_ID_PUBLIC](context,opinionId){
    return new Promise((resolve, reject) => {
        ApiService.get("api/opinion/getOpinion/"+opinionId)
        .then(( { data } ) => {
            // console.log(data)
            resolve(data);
            
        })
        .catch(( { response } ) => {
            console.log(response )
            reject('Ocurrió un error desconocido al intentar obtener las ordenes');
        });
    });
  },
  [GET_OPINION_BY_ID](context,opinionId){
    return new Promise((resolve, reject) => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("api/opinion/getOpinion/"+opinionId)
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
  [GET_OPINION_BY_SEARCH](context,search){
    return new Promise((resolve, reject) => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("/api/opinion/q?search="+search)
        .then(( { data } ) => {
          resolve(data);
        })
        .catch(( { response } ) => {
            console.log(response )
            reject('Ocurrió un error desconocido al intentar obtener las ordenes');
        });
      }
    });
  },
  [STORE_OPINION](context, data){
    return new Promise((resolve, reject) => {
      if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.post("api/opinion", data)
        .then(( { data } ) => {
            console.log(data)
            resolve(data);
            
        })
        .catch(( { response } ) => {
            reject( response.data.error ?? 'Ocurrió un error al crear la opinión');
        });
      }
    });

  },
  [GET_PUBLIC](context, data){
    return new Promise((resolve, reject) => {
      // if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("api/public/opinion?page="+data.pageNumber+"&name="+data.search+"&")
        .then(( { data } ) => {
            console.log(data)
            resolve(data);
            
        })
        .catch(( { response } ) => {
            reject( response.data.error ?? 'Ocurrió un error al crear la opinión');
        });
      // }
    });

  },
  [UPDATE_OPINION](context, data){
    // console.log(data)
    return new Promise( (resolve, reject) => {
      ApiService.setHeader();
      ApiService.post('api/opinion/'+data.id, data.data)
      .then(( {data} ) =>{
        resolve(data);
      })
      .catch(( { response } ) => {
        console.log(response )
        reject('Ocurrió un error desconocido al intentar modificar la opinión');
      });
    })
  },
  [DELETE_OPINION](context, opinionId){
    return new Promise( (resolve, reject) => {
      ApiService.setHeader();
      ApiService.post('api/opinion/delete/'+opinionId)
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
