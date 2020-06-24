import Reflux from 'reflux';
import jwt_decode from 'jwt-decode';
import { APIService } from '../../services/APIService';
import setAuthToken from '../../utils/setAuthToken';

export const Actions = Reflux.createActions([
    "inputChange",
    "signInClick",
    "signUpClick"
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
            confirmPassword: ""
        }
        this.listenables = Actions;
        this.APIService = new APIService();
    }

    onInputChange(name, value) {
        this.setState({
            [name]: value
        })
        console.log(this.state)
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
                            setAuthToken(token);
                            const currentUser = jwt_decode(token);
                            localStorage.setItem("userName", currentUser.name)
                            localStorage.setItem("userId", currentUser.id)
                            localStorage.setItem("userAvatar", currentUser.avatar)
                            localStorage.setItem("userEmail", this.state.signInEmail)
                            localStorage.setItem("isAuthenticated", true)

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
                        localStorage.setItem("isAuthenticated", true)
                        localStorage.setItem("userName", data.name)
                        localStorage.setItem("userId", data._id)
                        localStorage.setItem("userAvatar", data.avatar)
                        localStorage.setItem("userEmail", signUpEmail)

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