import React from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card"
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    console.log(location)
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
                        />
                        <Form.Control
                            className="mt-3"
                            placeholder="Введите пароль"
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
                                variant="outline-success"
                                className="mt-3"
                            >
                                {isLogin 
                                ?
                                "Войти"
                                :
                                "Зарегистрироваться"
                                }
                            </Button>
                        </Col>
                    </Form>
                </Card>
            </Container>
        </div>
    )
};

export default Auth;