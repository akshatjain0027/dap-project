import Reflux from 'reflux';
import jwt_decode from 'jwt-decode';
import { APIService } from '../../services/APIService';
import { StorageHelper } from '../../utils/StorageHelper';

export const Actions = Reflux.createActions([
    "inputChange",
    "indexChange",
    "signInClick",
    "signUpClick",
]);

class LoginStore extends Reflux.Store {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: "",
            signUpName: "",
            signUpEmail: "",
            signUpPassword: "",
            confirmPassword: "",
            selectedIndex: 0
        }
        this.listenables = Actions;
        this.APIService = new APIService();
        this.StorageHelper = new StorageHelper();
    }

    onInputChange(name, value) {
        this.setState({
            [name]: value
        })
    }

    onIndexChange(index){
        this.setState({
            selectedIndex: index
        })
    }

    onSignInClick() {
        if (this.state.signInEmail === "" || this.state.signInPassword === "") {
            console.log("error")
        }
        else {
            try {
                this.APIService.login(this.state.signInEmail, this.state.signInPassword)
                    .then(data => {
                        if (data) {
                            let token = data.token;
                            localStorage.setItem("jwtToken", token)
                            const currentUser = jwt_decode(token);
                            this.StorageHelper.setLoginUserData(currentUser);
                            this.setState({
                                signInEmail: "",
                                signInPassword: ""
                            })
                            window.location.reload()
                        }
                        else {
                            throw new Error;
                        }
                    })
            }
            catch (error) {
                console.log(error)
                this.setState({
                    signInEmail: "",
                    signInPassword: ""
                })
            }
        }
    }

    onSignUpClick() {
        const { signUpName, signUpEmail, signUpPassword, confirmPassword } = this.state;
        if (signUpName === "" || signUpEmail === "" || signUpPassword === "" || confirmPassword === "") {
            console.log("error")
        }
        else if (signUpPassword !== confirmPassword) {
            console.log("password error")
        }
        else {
            try {
                const user = {
                    email: signUpEmail,
                    name: signUpName,
                    password: signUpPassword,
                    password2: confirmPassword
                }
                this.APIService.register(user)
                    .then(data => {
                        this.StorageHelper.setRegisterUserData(data)
                        this.setState({
                            signUpName: "",
                            signUpEmail: "",
                            signUpPassword: "",
                            confirmPassword: ""
                        })
                        window.location.reload();
                    })
            }
            catch (error) {
                console.log(error)
                this.setState({
                    signUpName: "",
                    signUpEmail: "",
                    signUpPassword: "",
                    confirmPassword: ""
                })
            }

        }
    }
}



export default LoginStore;