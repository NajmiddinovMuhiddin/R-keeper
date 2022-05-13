import "../Login/Login.css";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiLogin} from '../../Api';
import {Map, YMaps, ZoomControl} from "react-yandex-maps";

const Login = () => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

      const handleClick = async () => {
        console.log('click')
        if (login && password) {
            setLoading(true);
            try {

                const response = await apiLogin({login, password});

                console.log(response.data)
                setLoading(false);
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify({
                        name: response.data.name,
                        lastname: response.data.lastname,
                        photo: `https://hamd.loko.uz${response.data.photo}`,
                    }));
                    navigate('/');
                }

                /*const responseData = await response.json();
                if (responseData.error) {
                    throw responseData.error
                }
                if (responseData.token) {
                    localStorage.setItem('token', responseData.token);
                    localStorage.setItem('email', password);
                    navigate('/');
                }*/
            } catch (e) {
                alert(e)
            }
        }
        else
        {
            console.log('required fields');
        }
    }



    return (
        <div className="auth">
            <h1 className="title-keeper">r<span className="r-line">_</span>keeper</h1>
            {loading && <div className="spinner"></div>}
            <form className="auth-form">
                <input type="text"  value={login}
                   onChange={e => setLogin(e.target.value)} placeholder="Логин"
                />
                <input type="text" value={password}
                   onChange={e => setPassword(e.target.value)} placeholder="Пароль"
                />
                <button type={"button"} onClick={handleClick} className="btn-login"><span>Войти</span></button>
            </form>
        </div>
    );
};

export default Login;