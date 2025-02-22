import React, { useContext } from "react";
import {Routes, Route, Navigate} from 'react-router-dom'
import { adminRoute, authRoute, publicRoutes } from "../routes";
import { SHOP_ROUTE } from "../utils/consts";
import { Context } from "..";

const AppRouter = () => {
    const {user} = useContext(Context);
    console.log(user)
    return (
        <Routes>
            {user.isAuth && authRoute.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component/>} exact />
            )}

            {user.isAdmin && adminRoute.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component/>} exact />
            )}

            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component/>} exact />
            )}
            
            <Route path="*" element={<Navigate to={SHOP_ROUTE} />}/>
        </Routes>
    );
};

export default AppRouter;