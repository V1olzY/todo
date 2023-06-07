import { defineStore } from 'pinia';
import axios from "axios";
import router from "@/router/router";

interface IUserData{
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        _token: '',
        appUserId: '',
        refreshToken: '',
        _isLoggedIn: false,
    }),
    getters: {
        isLoggedIn: (state) => state._isLoggedIn,
        token: (state) => state._token
    },


    actions: {

        setToken(token: string){
          this._token = token;
        },
        setAppUserId(appUserId: string){
            this.appUserId = appUserId;
        },

        setRefreshToken(refreshToken: string){
            this.refreshToken = refreshToken
        },

        async login(email: string, password: string) {
            try {
                const response = await axios.post(
                    'https://taltech.akaver.com/api/v1/Account/Login',
                    {
                        email: email,
                        password: password,
                    }
                );


                this.setToken(response.data.token);
                this.setRefreshToken(response.data.refreshToken);
                this.setLoggedIn(true);


                await router.push('/tasks');
            } catch (error) {
                alert('Invalid credentials. Please try again.');
            }

        },

        async signUp (userData: IUserData){
            try {
                const response = await axios.post(
                    'https://taltech.akaver.com/api/v1/Account/Register', userData
                );

                this.setToken(response.data.token)
                this.setRefreshToken(response.data.refreshToken)

                await this.login(userData.email, userData.password);

                await router.push('/tasks');
            } catch (error) {
                alert('Registration failed. Please try again.');
            }
        },

        async logout() {
            this._token = '';
            this.appUserId = '';
            this.refreshToken = '';
            this.setLoggedIn(false);
            await router.push('/')
        },

        setLoggedIn(value: boolean) {
            this._isLoggedIn = value;
        },
    },
});
