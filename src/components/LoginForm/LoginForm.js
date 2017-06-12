import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/reducer';
var Modal = require('react-modal');
import './LoginForm.css';
const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
class LoginForm extends Component{


    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        let {user,password} =this.state;
        let {isLoginPending, isLoginSuccess, loginError} = this.props;
        return(
            <div>
            <Modal
              isOpen={true}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Login"
            >
            <div className="login-form-wrapper">
              <form onSubmit={this.doLogin}>
                <h4> Datos de usuario </h4>
                <input name="user" type="text" placeholder="Usuario" onChange={e => this.setState({user: e.target.value})}/>
                <input name="password" type="password" placeholder="Contraseña" onChange={e => this.setState({password: e.target.value})}/>
                <center><a href="#">Olvidaste tu contraseña?</a></center> 
                  { isLoginPending && <div>Please wait...</div> }
                  { isLoginSuccess && <div>Welcome back!</div> }
                  { loginError && <div>Invalid User o password</div> } 
                <center><input className="button" type="submit" value="Ingresar"/> <button onClick={this.closeModal}>Cancelar</button></center>             
              </form>   
            </div>
            </Modal>
            </div>
        );
    }
    modalIsOpen = () => {
        this.setState({modalIsOpen: true});
    }
    afterOpenModal = () => {
        //this.refs.subtitle.style.color = '#f00';
    }
    closeModal = () => {
        this.setState({modalIsOpen: false});
    }
    doLogin = (e) => {
        e.preventDefault();
        let {user,password} = this.state;
        this.props.login(user,password);
        this.setState({
          user:'',
          password: ''
        });
    }
}

const mapStateToProps = (state) => {
    return {
        isLoginPending: state.isLoginPending,
        isLoginSuccess: state.isLoginSuccess,
        loginError: state.loginError
    };
}

const mapDispatchToProps = (dispatch) => {
    return{
        login: (user, password) => dispatch(login(user,password))
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
