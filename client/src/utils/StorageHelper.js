export class StorageHelper {

    setLoginUserData(userData){
        localStorage.setItem("userName", userData.name)
        localStorage.setItem("userId", userData.id)
        localStorage.setItem("userAvatar", userData.avatar)
        localStorage.setItem("isAuthenticated", true)
    }

    setRegisterUserData(userData){
        localStorage.setItem("isAuthenticated", true)
        localStorage.setItem("userName", userData.name)
        localStorage.setItem("userId", userData._id)
        localStorage.setItem("userAvatar", userData.avatar)
    }
}