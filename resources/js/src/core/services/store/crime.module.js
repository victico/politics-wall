import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";

// action types
export const GET_CRIME_BY_ID = "GET_CRIME_BY_ID";
export const STORE_CRIME = "STORE_CRIME";
export const UPDATE_CRIME = "UPDATE_CRIME";
export const DELETE_CRIME = "DELETE_CRIME"
const actions = {
  [GET_CRIME_BY_ID](context,crimeID){
    return new Promise((resolve, reject) => {
      // if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.get("api/crime/"+crimeID)
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
  [STORE_CRIME](context, data){
    return new Promise((resolve, reject) => {
      // if (JwtService.getToken()) {
        ApiService.setHeader();
        ApiService.post("api/crime/", data)
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

  },
  [UPDATE_CRIME](context, data){
    return new Promise( (resolve, reject) => {
      ApiService.setHeader();
      ApiService.post('api/crime/'+data.id, data.data)
      .then(( {data} ) =>{
        resolve(data);
      })
      .catch(( { response } ) => {
        console.log(response )
        reject('Ocurrió un error desconocido al intentar obtener las ordenes');
      });
    })
  },
  [DELETE_CRIME](context, crimeID){
    return new Promise( (resolve, reject) => {
      ApiService.setHeader();
      ApiService.post('api/crime/delete/'+crimeID)
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
