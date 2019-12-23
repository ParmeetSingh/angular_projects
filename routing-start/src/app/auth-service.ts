
export class AuthService{
    loggedIn = false;

    
    login(){
        console.log("Logging in");
        this.loggedIn = true;
    }

    logout(){
        console.log("Logging out");
        this.loggedIn = false;
    }
    
    isAuthenticated(){
        const promise = new Promise(
            (resolve,reject) => {
                setTimeout(
                    () => {resolve(this.loggedIn);},
                800);
            }
        );
        return promise;
    }


}
