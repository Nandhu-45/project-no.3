import React, { createContext, useState } from "react";
import "./Home.css"
import Moment from "moment";
import axios from "axios";
import { BrowserRouter, Link, useNavigate } from "react-router-dom";



function Home(){
    const [loginUser , setLoginUser] = useState();
    

    var [loginStatus , setLogin] = useState(false);
    var [registerStatus , setRegister] = useState(false);
    var [registerStatusUser , setRegisterUser] = useState(false);
    var [frontView , setFrontView] = useState(true);
    
    //User Registration
    var[name,setName] = useState("");
    var[email,setEmail] = useState("");
    var[password,setPassword] = useState("");
    var[ownerPic,setOwnerPic] = useState("");

    var [emailError ,setEmailError] = useState("");
    var [passwordError ,setPasswordError] = useState("");
    var [ustatus,setUStatus] = useState("");
    var [ostatus,setOStatus] = useState("");
    var [userId ,setUserId] = useState();
    

    //Login Verification
    var [owners , setOwnerDetails] = useState([]);
    var [users, setUserDetails] = useState([]);

    const navigate = useNavigate();

    function preventsubmit(event){
        event.preventDefault();

    }

    function ownerRegister(){
        var isValid = true;
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
            setOStatus("");
        }else{
            var ownerImg =ownerPic.replace("C:\\fakepath\\","");
            var insertUser = {
                name : name,
                email : email,
                password : password,
                ownerPic : ownerImg,
                type : "Owner"
            }
            axios.get("http://localhost:8082/addOwner?ownerId="+userId+"&ownerName="+name+"&ownerEmail="+email+"&ownerPassword="+password+"&ownerPic="+ownerImg);
            setOStatus("Owner added into the server");
            setName("");
            setEmail("");
            setPassword("");
            setOwnerPic("");
            setUserId("");
            
            
        }
    }

    function ownerReset()
    {
        setName("");
        setEmail("");
        setPassword("");
        setOwnerPic("");
        setUserId("");
    }

    function userRegister(){
        var isValid = true;
        var today = Moment().format('YYYY-MM-DD');
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
            setUStatus("");
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

           axios.get("http://localhost:8081/register?userId="+userId+"&userName="+name+"&userEmail="+email+"&userPassword="+password+"&userPic="+ownerImg);
           
           setUStatus("User added into the server");
            setName("");
            setEmail("");
            setPassword("");
            setOwnerPic("");
            setUserId("");
            
            
        }
    }

    function userReset()
    {
        setName("");
        setEmail("");
        setPassword("");
        setOwnerPic("");
        setUserId("");
    }

    function login(){
        if(loginStatus==false){
            setLogin(true);
            setRegister(false);
            setRegisterUser(false);
            setFrontView(false)
        }else{
            setLogin(false);
            setFrontView(true)
        }
    }

    function checkLogin(){
        
        axios.get("http://localhost:8081/login?userName="+email+"&userPassword="+password).then((responce)=>{
                //   "http://localhost:8081/login?userName=sasi.bhumaraju@gmail.com&userPassword=1a2b3c4a5b6cA$"
            console.log(responce.data)
            if(responce.data.userEmail.localeCompare(email)==0 &&responce.data.userPassword.localeCompare(password)==0  ){
                alert("Welcome, "+responce.data.userName);
                localStorage.setItem("Id",responce.data.userId);
                localStorage.setItem("type","User");
                localStorage.setItem("userName",responce.data.userName);
                localStorage.setItem("userEmail",responce.data.userEmail);
                localStorage.setItem("login",1);
                navigate("/userHome");
                setUserDetails(responce.data);
               
            }

        })
            
        

     console.log("ssaisjiois")
        axios.get("http://localhost:8082/login?ownerName="+email+"&ownerPassword="+password).then((responce)=>{
            console.log("+++++++")
            console.log(responce.data)
            if(responce.data.ownerEmail.localeCompare(email)==0 &&responce.data.ownerPassword.localeCompare(password)==0  ){
                alert("Welcome, "+responce.data.ownerName);
                localStorage.setItem("type","Owner");
                localStorage.setItem("Id",responce.data.ownerId);
                localStorage.setItem("userName",responce.data.ownerName);
                localStorage.setItem("userEmail",responce.data.ownerEmail);
                localStorage.setItem("login",1);
                navigate("/ownerHome");
                setOwnerDetails(responce.data);
            }
            
        })

        console.log("sql : "+owners.ownerName+" : "+owners.ownerEmail+" : "+users.length+"Owner : "+owners.length);
        if(owners!=null && owners.ownerEmail.localeCompare(email)==0 && owners.ownerPassword.localeCompare(password)==0){
            localStorage.setItem("type","Owner");
                localStorage.setItem("userName",owners.ownerName);
                localStorage.setItem("userEmail",owners.ownerEmail);
                navigate("/ownerHome");
                
        }
       
           
    }

    function home()
    {
        if(frontView==false){
            setFrontView(true);
            setRegister(false);
            setLogin(false);
            setRegisterUser(false);
            setFrontView(false)
        }else{
            setRegister(false);
            setFrontView(false);
        } 
    }

    function register(){
        if(registerStatus==false){
            setRegister(true);
            setLogin(false);
            setRegisterUser(false);
            setFrontView(false)
        }else{
            setRegister(false);
            setFrontView(true);
        }
    }

    function registerUser(){

        if(registerStatusUser==false){
            setRegisterUser(true);
            setLogin(false);
            setRegister(false);
            setFrontView(false)
        }else{
            setRegisterUser(false);
            setFrontView(true)
        }
    }
    return(
        <div>
            <nav class="navbar navbar-expand-lg ">
            <div class="container">
                <a class="navbar-brand" href="#"><img className="logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOBMg9I_ex0nNaSJjVQpi3X1wvvOTdNVOSVA&usqp=CAU" /></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#" onClick={home}>Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick={login}>Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick={register}>Owner-Register</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onClick={registerUser}>User-Register</a>
                    </li>
                </ul>
                {/* <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form> */}
                </div>
            </div>
            </nav>
            
            <div className="ride-heading">
                 <h3 className="h3">Sha r e R i de</h3>     
            </div>
            {
                frontView&&


                <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
                <div class="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img src="..." class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                      <h5>First slide label</h5>
                      <p>Some representative placeholder content for the first slide.</p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src="..." class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                      <h5>Second slide label</h5>
                      <p>Some representative placeholder content for the second slide.</p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src="..." class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-none d-md-block">
                      <h5>Third slide label</h5>
                      <p>Some representative placeholder content for the third slide.</p>
                    </div>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            } 

            {loginStatus && 
            <div className="row">
                <div className="col-12">
           
                    <div className="login-container">
                    <div>
                                <h2> Login Page</h2>
                            </div>
                        <div>
                            <input type="text" className="email" placeholder="abc@gmail.com" value={email} onChange={val=>setEmail(val.target.value)}  required/>
                        </div>

                        <div>
                            <input type="password" className="password" placeholder="Password" value={password} onChange={val=>setPassword(val.target.value)} required/>
                        </div>
                        <div>
                            <button type="button" className="login" onClick={checkLogin}>Login</button>
                            <h5>New User? Register Here...</h5>
                            {/* <button type="button" className="register" ><Link to="/newUser">Register</Link></button> */}
                            <button type="button" className="register" onClick={register}>Owner-Register</button>
                            <button type="button" className="register" onClick={registerUser}>User-Register</button>    
                        </div>
                    </div>
                </div>
             </div>
            } 

            {
                registerStatus &&
                <div className="row">
                    <div className="col-12">
                        <div className="form-container">
                            <div>
                                <h2>Owner Registration Page</h2>
                            </div>
                            <div className="inside-form">
                            <span className="text-success">{ostatus}</span>
                                <form onSubmit={preventsubmit}>
                                <div>
                                    
                                    <input type="number" placeholder="Owner Id" value={userId} onChange={val=>setUserId(val.target.value)}  required />
                                </div>
                                    <div>
                                    
                                        <input type="text" placeholder="Owner Name" value={name} onChange={val=>setName(val.target.value)}  required />
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
                 
                                    {/* <div>
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
                                    </div> */}

        
                                     <div>
                                        <button type="submit" className="submit" onClick={ownerRegister}>Submit</button>
                                    </div>
                                    <div>
                                        <button type="reset" className="reset" onClick={ownerReset}>Reset</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            }


             {
                registerStatusUser &&
                <div className="row">
                    <div className="col-12">
                        <div className="form-container">
                            <div>
                                <h2>User Registration Page</h2>
                            </div>
                            <div className="inside-form">
                            <span className="text-success">{ustatus}</span>
                                <form onSubmit={preventsubmit}>
                                <div>
                                    
                                    <input type="number" placeholder="User Id" value={userId} onChange={val=>setUserId(val.target.value)}  required />
                                </div>
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
                                       
                                    <div>
                                        <button type="submit" className="submit" onClick={userRegister}>Submit</button>
                                    </div>
                                    <div>
                                        <button type="reset" className="reset" onClick={userReset}>Reset</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            } 

        </div>
    )
}


export default Home;