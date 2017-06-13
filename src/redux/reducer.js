import Promise from 'es6-promise';
const LOGEO_PENDIENTE = "LOGEO_PENDIENTE";
const LOGEO_SATISFACTORIO = "LOGEO_SATISFACTORIO";
const LOGEO_ERROR = "LOGEO_ERROR";


function setLoginPending(isLoginPending){
  return{
    type: LOGEO_PENDIENTE,
    isLoginPending
  };
}

function setLoginSuccess(isLoginSuccess){
  return{
    type: LOGEO_SATISFACTORIO,
    isLoginSuccess
  };
}

function setLoginError(loginError){
  return {
    type: LOGEO_ERROR,
    loginError
  };
}

export function login(user, password){
  return dispatch => {
    dispatch(setLoginPending(true));
    dispatch(setLoginSuccess(false));
    dispatch(setLoginError(false));
    sendLoginRequest(user,password)
    .then(success => {
      dispatch(setLoginPending(false));
      dispatch(setLoginSuccess(true));
    })
    .catch(err => {
      dispatch(setLoginPending(false));
      dispatch(setLoginError(err));
    });
  }
}

export default function reducer(state = {
  isLoginPending: false,
  isLoginSuccess: false,
  loginError: null
}, action){
  switch (action.type){
    case LOGEO_SATISFACTORIO:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });
    case LOGEO_PENDIENTE:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });
    case LOGEO_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });
    default:
      return state;
  }
}

function sendLoginRequest(user,password){
      return new Promise((resolve,reject) =>{
        var data = {
          "userLis": user,
          "passLis": password
        }
        console.log(data.userLis);
        //,  {method: "POST", body: data}
        fetch('http://192.168.30.57:3001/pruebaLogin', {method: "POST", headers: {
                                                                'Accept': 'application/json, text/plain, */*',
                                                                'Content-Type': 'application/json'
                                                                },body: data})
        .then((response) =>{
          return response.json();
        })
        .then((data) =>{
          console.log(data);
          console.log("respuesta del servicio: "+data.status);
          if(data.code===100){
            console.log("datos concuerdan papu");
            return resolve(true);
          }
          else{
            return reject(new Error('Usuario o contraseña invalidos, codigo de error '+ data.code));
          }
        })
      });
  }






