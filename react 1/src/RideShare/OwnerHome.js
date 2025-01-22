import axios from "axios";
import React, { useEffect, useState } from "react";
import Vehicle from "./Vehicle";
import "./OwnerHome.css";
import Booking from "./Booking";
import { useNavigate } from "react-router-dom";
import UserCrud from "./UserCrud";
import AdminMsg from "./AdminMsg";
import SpecificUserMsg from "./SpecificUserMsg";
import VehicleReg from "./VehicleReg";

function OwnerHome(){

    var [vehicles,setVehicles] = useState([]);
    var [booking,setBookings] = useState([]);
    var [allUsers,setAllUsers] = useState([]);
    var [allMsg,setAllMsg] = useState([]);
    var[msgsOneUserArray,setMsgsOneUserArray] = useState([]);
    
    var[newVehicles,setNewVehicles] = useState(false);
    var[seeVehicles,setSeeVehicles] = useState(false);
    var[seeCars,setSeeCars] = useState(false);
    var[seeBikes,setSeeBikes] = useState(false);
    var[doCrudUser,setDoCrudUser] = useState(false);
    var[msgAllToggle,setMsgAllToggle] = useState(false);
    var[msgsOneUserToggle,setMsgsOneUserToggle] = useState(false);
    var [specialEmail,setSpecialEmail] = useState("");

    var navigate = useNavigate();

    function allVeicles(){
     if(   localStorage.getItem("userEmail") == null){ navigate("/") }
        axios.get("http://localhost:8083/getallvehicles").then((res)=>{
            var vehcileList = []
            var temp = res.data;
            var id =  localStorage.getItem("Id");
            for(let i = 0; i < temp.length; i++) {
                console.log("local id"+ id)
                console.log("server id"+ id)
                if( temp[i].ownerId == id ) {
                   
                    vehcileList.push(temp[i]);
                }
            }
            setVehicles(vehcileList);
        })

        axios.get("http://localhost:8084/getAllConfirmedBookings").then((res)=>{
            setBookings(res.data);
        })

        axios.get("http://localhost:8081/getallusers").then((res)=>{
            setAllUsers(res.data);
        })

        axios.get("http://localhost:8085/getallMessages").then((res)=>{
            
            setAllMsg(res.data);
        })

        // axios.get("http://localhost:5000/UserMsg?userEmail=ganesh@123.com").then((res)=>{
        //     setMsgsOneUserArray(res.data);
        // })

        

    }

    useEffect(allVeicles,[]);

    function getSpecificUserMsg(){
        axios.get("http://localhost:5000/UserMsg?userEmail="+specialEmail).then((res)=>{
            setMsgsOneUserArray(res.data);
        })
    }

    //Toggle

    function newVehicle(){
        if(newVehicles==false){
            setNewVehicles(true);
            setSeeVehicles(false);
            setSeeCars(false);
            setSeeBikes(false);
            setDoCrudUser(false);
            setMsgsOneUserToggle(false);
            setMsgAllToggle(false);
        }else{
            setNewVehicles(false);
        }
    }

    function crud(){
       
        if(seeVehicles==false){
            setSeeVehicles(true);
            setSeeCars(false);
            setSeeBikes(false);
            setDoCrudUser(false);
            setMsgsOneUserToggle(false);
            setNewVehicles(false);
            setMsgAllToggle(false);
        }else{
            setSeeVehicles(false);
        }
    }

    function bookings(){
        if(seeCars == false){
            setSeeCars(true);
            setSeeVehicles(false);
            setSeeBikes(false);
            setDoCrudUser(false);
            setMsgsOneUserToggle(false);
            setNewVehicles(false);
            setMsgAllToggle(false);

        }else{
            setSeeCars(false);
        }
    }

    function bookingBike(){
        if(seeBikes==false){
            setSeeBikes(true);
            setDoCrudUser(false);
            setSeeCars(false);
            setSeeVehicles(false);
            setMsgsOneUserToggle(false);
            setNewVehicles(false);
            setMsgAllToggle(false);
        }else{
            setSeeBikes(false);
        }
    }

    function userCrud(){
        if(doCrudUser==false){
            setDoCrudUser(true);
            setSeeBikes(false);
            setSeeCars(false);
            setSeeVehicles(false);
            setMsgsOneUserToggle(false);
            setNewVehicles(false);
            setMsgAllToggle(false);
        }else{
            setDoCrudUser(false);
        }
    }

    function messegeAll(){
        if(msgAllToggle==false){
            setMsgAllToggle(true);
            setDoCrudUser(false);
            setSeeBikes(false);
            setSeeCars(false);
            setSeeVehicles(false);
            setMsgsOneUserToggle(false);
            setNewVehicles(false);

        }
        else{
            setMsgAllToggle(false);
        }
    }
    function messegeSDate(){

    }
    function messegeOneUser(){
        if(msgsOneUserToggle==false){
            setMsgsOneUserToggle(true);
            setMsgAllToggle(false);
            setDoCrudUser(false);
            setSeeBikes(false);
            setSeeCars(false);
            setSeeVehicles(false);
            setNewVehicles(false);
        }else{
            setMsgsOneUserToggle(false);
        }
    }

    function logout(){

        
            localStorage.removeItem("type");
            localStorage.removeItem("login");
            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            navigate("/");
    
        
    }

    return(
      
        <div>
            <div className="row">
                <div className="col-12 col-md-4">
                    <div className="book-btn">
                        <div class="dropdown">
                            <button  class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Booking-Here
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" onClick={newVehicle}>New-Vehicle</a></li>
                                <li><a class="dropdown-item" onClick={crud}>Vehicle-Crud</a></li>
                                <li><a class="dropdown-item" onClick={userCrud}>User-Crud</a></li>
                                <li><a class="dropdown-item" onClick={bookings}>Bookings</a></li>
                                <li><a class="dropdown-item" onClick={bookingBike}>Chat With User</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                <div className="book-btn">
                        <div class="dropdown">
                            <button type="button" class="btn btn-primary position-relative dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        Inbox
                                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {allMsg.length}
                                            <span class="visually-hidden">unread messages</span>
                                        </span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" onClick={messegeAll}>All</a></li>
                                {/* <li><a class="dropdown-item" onClick={messegeSDate}>Chats in Specific Date</a></li>
                                <li><a class="dropdown-item" onClick={messegeOneUser}>Specific User Chat</a></li> */}
                                
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="book-btn">
                        <div class="dropdown">
                            <div className="logout">
                                <button type="button" className=" btn btn-danger" onClick={logout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    { seeVehicles &&
                        vehicles.map(temp=>{
                            return(
                                <Vehicle id={temp.regNumber} model={temp.model} type={temp.wheeler} vPic={temp.vehiclePic} price={temp.pricePerKm} update={allVeicles}></Vehicle>
                            )
                        })
                    }
                </div>


                <div className="row">
                    { doCrudUser &&
                        allUsers.map(temp=>{
                            return(
                                <UserCrud id={temp.userId} name={temp.userName} email={temp.userEmail} password={temp.userPassword} pic={temp.userPic}  update={allVeicles}></UserCrud>
                            )
                        })
                    }
                </div>

                <div className="row">
                    { newVehicles &&
   
                        <VehicleReg  update={allVeicles}></VehicleReg>
  
                    }
                </div>

                <div className="row">
                    { seeBikes &&
   
                        <AdminMsg></AdminMsg>
  
                    }
                </div>

                <div className="row">
                    {seeCars &&
                    <div className="col-9">
                        <ul class="list-group list-group-horizontal oList">
                            <li class="list-group-item sli text-danger">Booking-Id</li>
                            <li class="list-group-item sli text-danger">PickUp-Location</li>
                            <li class="list-group-item sli text-danger">Drop-Location</li>
                            <li class="list-group-item sli text-danger">KM's</li>
            
                            <li class="list-group-item sli text-danger">On-Date</li>
                            <li class="list-group-item sli text-danger">Vehicle-Id</li>
                            <li class="list-group-item sli text-danger">User-Email</li>
                            <li class=""></li>
                        </ul>
                    </div>}
                    { seeCars &&
                        booking.map(temp=>{
                            return(
                                <Booking bookingId={temp.confirmId} vehicleId={temp.regNumber} pick={temp.pickUpLocation} drop={temp.droppingLocation} kms={temp.kms} userName={temp.userName} userEmail={temp.userEmail} tDate={temp.confirmDate} ></Booking>
                            )
                        })
                    }
                    
                </div>

                <div className="row">
                    {msgAllToggle && 

                        allMsg.map(temp=>{
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

                <div className="row">
                    
                    {msgsOneUserToggle &&
                        msgsOneUserArray.map(temp=>{
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
        </div>
    )
}

export default OwnerHome;