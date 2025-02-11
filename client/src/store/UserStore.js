import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._user = {}
        const isAdminFromStorage = localStorage.getItem('isAdmin');
        if (isAdminFromStorage !== null) {
            this._isAdmin = isAdminFromStorage === 'true';
        }   
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    
    setIsAdmin(bool) {
        this._isAdmin = bool
        localStorage.setItem('isAdmin', bool.toString());
    }

    setUser(user) {
        this._user = user
    }
 
    get isAuth() {
        return this._isAuth
    }

    get isAdmin() {
        return this._isAdmin
    }

    get user() {
        return this._user
    }
}