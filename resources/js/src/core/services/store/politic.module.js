import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const GET_POLITICS= "GET_POLITICS";
export const SEE_ALL_NOTIFICATIONS_BY_TYPE = "SEE_ALL_NOTIFICATIONS_BY_TYPE";
export const GET_POLITIC_BY_ID = "GET_POLITIC_BY_ID";
export const STORE_POLITIC = "STORE_POLITIC";

const actions = {
  [GET_POLITICS](context,query =''){
    return new Promise((resolve, reject) => {
      // if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("api/politic/"+query)
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
      // if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("api/politic/"+politicID)
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
  [STORE_POLITIC](context, data){
    return new Promise((resolve, reject) => {
      // if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.post("api/politic/", data)
        .then(( { data } ) => {
            console.log(data)
            resolve(data);
            
        })
        .catch(( { response } ) => {
            console.log(response )
            reject('Ocurrió un error desconocido al intentar obtener las ordenes');
        });
      // }
    });

  }
};
export default {
    actions,
};
