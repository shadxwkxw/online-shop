import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "..";
import { login, registration } from "../http/userAPI";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { Spinner } from "react-bootstrap";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const history = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        setLoading(true)
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password); 
            }   
            if (data.role === 'ADMIN') {
                user.setIsAdmin(true)
            } else {
                user.setIsAdmin(false)
            }
            user.setUser(user)
            user.setIsAuth(true)
            history(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Container 
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 54}}
            > 
                <Card style={{width: 600}} className="p-5">
                    <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
                    <Form className="d-flex flex-column">
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                        />
                        <Col className="d-flex justify-content-between align-items-center mt-3">
                            {isLogin
                            ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} style={{textDecorationLine: 'none'}}>Зарегистрируйтесь</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE} style={{textDecorationLine: 'none'}}>Авторизуйтесь</NavLink>
                            </div>
                            }
                            <Button 
                                onClick={click} 
                                disabled={loading} 
                                variant="outline-success" 
                                className="mt-3"
                            >
                                {loading ? (
                                    
                                    <Spinner animation={"border"}/>
                                     
                                ) : (
                                    isLogin ? "Войти" : "Зарегистрироваться"
                                )}
                            </Button>
                        </Col>
                    </Form>
                </Card>
            </Container>
        </div>
    )
});

export default Auth;