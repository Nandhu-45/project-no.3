import axios from "axios";
import moment, { localeData } from "moment";
import React, { useEffect, useState } from "react";

function AdminMsg(){

    var [users ,setUsers] = useState([]);
    var [email,setEmail] = useState("");
    var [msg,setMsg] = useState("");
    var [error,setError] = useState("");
    var[ans,setAns] = useState();

    var today = moment().format('YYYY-MM-DD');

    function allUsers(){
        axios.get("http://localhost:8081/getallusers").then((res)=>{
            setUsers(res.data);
        })



    }

    useEffect(allUsers,[]);

    function sendMsg(){
        var isOkay = true;
        if(msg == null || email==null){
            setError("Email/Msg Should not be empty");
            isOkay=false;
        }else{
            setError("");
        }

        if(!isOkay){
            alert("Something Empty.......");
        }else{
            var newMsg = {
                userEmail : email,
                adminMsg : msg,
                msgedDate : today

            }
            axios.get("http://localhost:8085/addOwnerMessage?id="+ans+"&msgedDate="+today+"&adminMsg="+msg+"&userEmail="+email).then((res)=>{
                alert("Msg sent to The User");
            })
            setEmail("");
            setMsg("");
            setAns("");
        }
    }

    return(
        <div className="row">
            <div className="col-12 col-md-4">
                <div>
                <ul class="list-group list-group-horizontal oList">
                    <li class="list-group-item sli">UserName</li>
                    <li class="list-group-item sli">User mail</li>
                    </ul>
                </div>
                {
                    users.map(temp=>{
                        return(
                            <ul class="list-group list-group-horizontal oList">
                                <li class="list-group-item sli">{temp.userName}</li>
                                <li class="list-group-item sli">{temp.userEmail}</li>
                            </ul>
                        )
                    })
                }
            </div>
            <div className="col-12">
            <div class="row g-2">
                <div class="col-md-6">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="floatingInputGrid" value={msg} onChange={val=>setMsg(val.target.value)} />
                        <label for="floatingInputGrid">Your Messege</label>
                        
                    </div>
                    <div><button className="btn btn-primary" onClick={sendMsg}>send</button></div>
                </div>
                <div class="col-md-4">
                    <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInputGrid" value={email} onChange={val=>setEmail(val.target.value)}/>
                    <label for="floatingSelectGrid">abc@123.com</label>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="form-floating">
                    <input type="number" class="form-control" id="floatingInputGrid" value={ans} onChange={val=>setAns(val.target.value)}/>
                    <label for="floatingSelectGrid">Answer-Id</label>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}
export default AdminMsg;