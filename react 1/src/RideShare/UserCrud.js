import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
//import "./UserCrud.css";


function UserCrud(prop){

    var [allUsers,setAllUsers] = useState([]);
    var[name,setName] = useState("");
    var[email,setEmail] = useState("");
    var[password,setPassword] = useState("");
    var[ownerPic,setOwnerPic] = useState("");

    var [emailError ,setEmailError] = useState("");
    var [passwordError ,setPasswordError] = useState("");
    var [status,setStatus] = useState("");
    var [userId ,setUserId] = useState(prop.id);

 async   function deleteUser(){
       
      await  axios.get("http://localhost:8081/delete?id="+parseInt(prop.id)).then((res)=>{
        prop.update()     
      alert("User deleted");
            document.getElementById("card"+prop.id).remove();
        })
      
    }


   async function upDateVehicle(){

        var isValid = true;
        var today = moment().format('YYYY-MM-DD');
        const cond1 = ".*[a-z].*";
        const cond2 = ".*[A-Z].*";
        const cond3 = ".*[0-9].*";
        const cond4 = ".*[!@#$%^.].*";
        
        if(email.length <= 4){
            isValid = false
            setEmailError("Email length can't be less than 4 characters");
        }else{
            setEmailError("");
        }

        if(password.length < 4){
            setPasswordError("Password length should be Atleast 4 characters");
            isValid = false;
        }else if(!password.match(cond4)){
            setPasswordError("Password should be contain 1 special characters");
            isValid = false;
        }else if(!password.match(cond3)){
            setPasswordError("Password should be contain 1 Numeric Number");
            isValid = false;
        }else if(!password.match(cond2)){
            setPasswordError("Password should be contain 1 Capital letter");
            isValid = false;
        }else if(!password.match(cond1)){
            setPasswordError("Password should be contain 1 small letter");
            isValid = false;
        }
        else{
            setPasswordError("");
        }


        if(!isValid){
            alert("Something Error !!!");
            setStatus("");
        }else{
            var ownerImg =ownerPic.replace("C:\\fakepath\\","./Images/");
            var insertUser = {
                userId : userId,
                name : name,
                email : email,
                password : password,
                ownerPic : ownerImg,
                type : "User"
            }

         await  axios.get("http://localhost:8081/update?userId="+userId+"&userName="+name+"&userEmail="+email+"+&userPassword="+password+"+&userPic="+ownerImg).then((res)=>{
            alert("Updated successfully");
           })
         
           prop.update();
           
           setStatus("User added into the server");
            setName("");
            setEmail("");
            setPassword("");
            setOwnerPic("");
            setUserId("");
        }

    }

    function preventsubmit(event){
        event.preventDefault();

    }

    
    return(
        <div className="col-12 col-md-4">
            <div className="userCrud">
            {/* <div className="col-12 col-md-4"> */}
                <div class="card" id={"card"+prop.id} >
                    <img src={prop.pic} class="card-img-top" alt="Image"/> 
                    <div class="card-body">
                        <h5 class="card-title">{prop.id}. {prop.name}</h5>
                        <span class="card-title">Email : {prop.email}</span><br></br>
                        <span class="card-title">Password : {prop.password}</span><br></br>
                        <button className="btn btn-danger" onClick={deleteUser}>Delete</button> 
                        <div>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Update
                            </button>

                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            {/** */}
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Update User</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div class="modal-body">
                                    
                                                         <div className="modal-container">
                                                            <div className="inside-form">
                                                                
                                                            <form onSubmit={preventsubmit}>
                                                                {/* <div>
                                                                    
                                                                    <input type="number" placeholder="User Id" value={userId} onChange={val=>setUserId(val.target.value)}  required />
                                                                </div> */}
                                                                    <div>
                                                                    
                                                                        <input type="text" placeholder="User Name" value={name} onChange={val=>setName(val.target.value)}  required />
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-danger">{emailError}</span>
                                                                        <input type="email" placeholder="abc@gmail.com" value={email} onChange={val=>setEmail(val.target.value)} required />
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-danger">{passwordError}</span>
                                                                        <input type="password" placeholder="Password" value={password} onChange={val=>setPassword(val.target.value)} required />
                                                                    </div>
                                                                    <div>
                                                                        <input type="file" name="profile" placeholder="Profile"  value={ownerPic} onChange={val=>setOwnerPic(val.target.value)} required />
                                                                    </div>
                                                                    {/** 
                                                                    <div>
                                                                        <span className="text-danger">{dateError}</span>
                                                                        <input type="date" value={date} onChange={val=>setDate(val.target.value)} required />
                                                                    </div>
                                                                    <div>
                                                                        <span className="text-danger"></span>
                                                                        <input type="text" placeholder="Vehicle Model" value={vehicle} onChange={val=>setVehicle(val.target.value)} required />
                                                                    </div>

                                                                    <div>
                                                                        <select value={vType} onChange={val=>setVType(val.target.value)}>
                                                                            <option>--Select Vehicle Type--</option>
                                                                            <option>2-Wheeler</option>
                                                                            <option>4-Wheeler</option>
                                                                            
                                                                        </select>
                                                                    </div>
                                                                    <div>
                                                                        <input type="file" name="vehicle" placeholder="Vehicle" value={VPic} onChange={val=>setVpic(val.target.value)} required />
                                                                    </div>

                                                                        */}
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        <button type="button" class="btn btn-primary" onClick={upDateVehicle}>Update</button>
                                                                    </div>
                                                                    
                                                                </form>
                                                           

                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            
                                     </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                    </div>

                </div>
            </div>
        </div>
       
    )
}
export default UserCrud;

