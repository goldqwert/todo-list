import React from 'react';
import s from './Login.module.css';
import { connect } from 'react-redux';
import { loginTC } from '../redux/AuthReducer';
import { Redirect } from 'react-router-dom';

interface mapStateToProps {
    isAuth: boolean,
    captchaUrl: any,
    formError: string
}

interface IProps {
    loginTC: (email: string, password: string, rememberMe: boolean, captcha: any) => void
    isAuth: boolean
    captchaUrl: string
    formError: string
}

class Login extends React.Component<IProps> {

    state = {
        email: '',
        password: '',
        rememberMe: false,
        captcha: ''
    }

    sendLoginData = () => {
        this.props.loginTC(this.state.email, this.state.password, this.state.rememberMe, this.state.captcha)
    }

    render = () => {

        if (this.props.isAuth) {
            return <Redirect to='/' />
        }

        return (
            <div className={s.loginWrapper}>
                <div className={s.loginWord}>
                    <p>Чтобы посмотреть и протестировать приложение введите данные тестового акканута:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </div>
                <div className={s.loginForm}>
                    <span>Login</span>
                    <div className={s.loginError}>{this.props.formError}</div>
                    <input className={s.loginInput} type='email' placeholder='email' onChange={(e) => this.setState({ email: e.currentTarget.value })} />
                    <input className={s.loginInput} type='password' placeholder='password' onChange={(e) => this.setState({ password: e.currentTarget.value })} />
                    {this.props.captchaUrl && <img className={s.captcha} src={this.props.captchaUrl} />}
                    {this.props.captchaUrl && <input onChange={(e) => this.setState({ captcha: e.currentTarget.value })}
                        placeholder='Write symbols with image' name='captcha' />}
                    <button onClick={this.sendLoginData}>Login</button>
                </div>
            </div>);
    }
}

const mapStateToProps = (state: any): mapStateToProps => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
    formError: state.auth.formError
})

export default connect(mapStateToProps, { loginTC })(Login);


