import axios from "axios";
import React, { useState } from "react";

function SpecificUserMsg(){

    var [specialEmail,setSpecialEmail] = useState("");
    var[msgsOneUserArray,setMsgsOneUserArray] = useState([]);
    function getSpecificUserMsg(){
        axios.get("http://localhost:5000/UserMsg?userEmail="+specialEmail).then((res)=>{
            setMsgsOneUserArray(res.data);
        })
    }

    return(
        <div>
            <div className="col-12"> 
                <form class="row row-cols-lg-auto g-3 align-items-center">
                    <div class="col-12">
                        <label class="visually-hidden" for="inlineFormInputGroupUsername">Username</label>
                        <div class="input-group">
                            <div class="input-group-text">@</div>
                                    <input type="text" class="form-control" id="inlineFormInputGroupUsername" placeholder="Username" value={specialEmail} onChange={val=>setSpecialEmail(val.target.value)}/>
                            </div>
                        </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary" onClick={getSpecificUserMsg}>Submit</button>
                    </div>
                </form>
            </div>
            <div className="col-12">
                {
                    msgsOneUserArray.map(temp=>{
                        console.log("Rajani")
                        return(
                            <div class="alert alert-primary" role="alert">
                                 
                                <li class="list-group-item sli">User Email : {temp.userEmail}</li>
                                <li class="list-group-item sli">Messege : {temp.msg}</li>
                                <li class="list-group-item sli">Posted Date : {temp.msgDate}</li>
                            </div>        
                        )
                    })
                }
            
            </div>
        </div>

    )
}
export default  SpecificUserMsg;