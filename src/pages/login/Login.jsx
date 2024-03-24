import React, {useContext, useRef} from 'react'
import "./Login.css"
import { loginCall } from "../../actionCalls";
import { AuthContext } from "../../state/AuthContext";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const {dispatch} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall(
            {
                email: email.current.value,
                password: password.current.value,
            },
            dispatch
        );
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className='loginLogo'>Express SNS</h3>
                    <div className="loginDesc">本格的なSNSを自分の手で</div>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={(e) => handleSubmit(e)}>
                        <p className="loginMsg">ログインはこちら</p>
                        <input 
                            type="email" 
                            className='loginInput' 
                            placeholder='Eメール' 
                            required 
                            ref={email}
                        />
                        <input 
                            type="password" 
                            className='loginInput' 
                            placeholder='パスワード' 
                            required 
                            minLength="6" 
                            ref={password}
                        />
                        <button className="loginButton">ログイン</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
