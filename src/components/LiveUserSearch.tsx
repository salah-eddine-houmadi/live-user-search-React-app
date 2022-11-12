import React, { useEffect, useState } from "react";
import { UserService } from "../services/UserService";

let LiveUserSearch = () => {

    let [state,setState] = useState({
        searchKey:'',
        loading : false,
        users : [] ,
        fUsers : [],
        errorMessage : null
    });

    useEffect(() => {
        checkUserLoggedIn()
    }, [])

    // Check if user is logged in
    const checkUserLoggedIn:() => Promise<void> = async () => {
        try {
            setState({...state,loading:true});
            let response = await UserService.getALLUsers();
            let {results} = response.data;
            setState({
                ...state,
                users:results,
                fUsers:results,
                loading:false
            })
        }
        catch(error){
            setState({
                ...state,
                loading:false
                
            })

        }
        
    };


    let searchUser = (event:any) => {
        setState({...state,searchKey:event.target.value});
        let filteredUsers = state.fUsers.filter(user =>{
            return user.name.first.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setState({...state,users:filteredUsers,searchKey:event.target.value});
    };
   
    return (
        <React.Fragment>
          
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card shadow-lg">
                            <div className="card-header bg-primary text-white p-3">
                                <p className="h4">Live User Search</p>
                                <form>
                                    <input name="searchKey" value={state.searchKey} onChange={searchUser} type="text" className="form-control" placeholder="Search here"/>
                                </form>

                            </div>
                            <div className="card-body bg-light">
                                <div className="list-group">
                                 {
                                    state.users.length > 0 && state.users.map(user =>{
                                        return(
                                            <li key={user.login.uuid} className="list-group-item list-group-item-primary">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                   <img src={user.picture.thumbnail}  alt="404" className="img-fluid"/>
    
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="h5">{user.name.title} .{user.name.first} {user.name.last}</p>
                                                    <small>{user.location.city} , {user.location.country}</small>
    
                                                </div>
                                            </div>
                                        </li>
                                        )
                                    })
                                 } 
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </React.Fragment>
    )
};

export default LiveUserSearch;