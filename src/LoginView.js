import React, {useContext, useEffect, useState} from 'react';
import AppContext from './AppContext.js';
import {apiroot} from './Config.js';

function LoginView() {
    const context = useContext(AppContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [processLogin, setProcessLogin] = useState(false);

    const emailChangeHandler = (e) => {setEmail(e.target.value)};
    const passwordChangeHandler = (e) => {setPassword(e.target.value)};
    const processLoginHandler = () => {setProcessLogin(true)};

    useEffect(() => {
        if(processLogin === true) {
            const data = new FormData();
            data.append("email", email);
            data.append("password", password);
            fetch(apiroot+"login", {
                method: "POST",
                body: data
            }).then(response => response.json())
                .then(data => {
                    context.setToken(data.token);
                    context.setUser(data.email);
                    context.setIsAdmin(data.is_admin);
                    context.setIsAuthenticated(true);
                    context.setSchool("all");
                    context.setSpellCategory("all");
                    context.setPage("indexPage");
                });
        }


    }, [email, password, processLogin])




    return(
        <div>
            <div className={"spell-box"}>
                For the moment I am working to produce a simple but functional login screen.
                If you are still reading this message, it means I haven't made it pretty yet.
            </div>
            <div className="spell-box slight-padding">
                <form>
                    <div>
                        <label>
                            Email Address:&nbsp;
                            <input type="text" value={email} onChange={emailChangeHandler}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Password:&nbsp;
                            <input type="password" onChange={passwordChangeHandler}/>
                        </label>
                    </div>
                </form>
                <div>
                    <button onClick={processLoginHandler} >Login</button>
                </div>
            </div>


        </div>




    );
}


export default LoginView;