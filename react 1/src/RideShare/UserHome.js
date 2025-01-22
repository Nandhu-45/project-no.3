import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./UserHome.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { userContext } from "./Home";
import UserBookings from "./UserBookings";
import BookingHistory from "./BookingHistory";


function UserHome(){

   
    var[vehicleID , setVehicleId] = useState();
    var[que,setQue] = useState();
    var[myBookingsHistory, setMyBookingsHistory] = useState(false);
    var[msgAllToggle,setMsgAllToggle] = useState(false);
    var[vehicles,setVehicles] = useState([]);
    var[seeVehicles,setSeeVehicles] = useState(false);
    var[seeCars,setSeeCars] = useState(false);
    var[seeBikes,setSeeBikes] = useState(false);
    var[mybookins,setMyBookings] = useState(false);
    var[myMsg,setMyMsg] = useState(false);
    var[sort,setSort] = useState(false);
    var[frontView,setFrontView] = useState(true);
    var [fromDate , setFromDate] = useState();
    var [toDate , setToDate] = useState();
    var [bookingVehicle,setBVehicle] = useState();
    var [onlyCars,setOnlyCars] = useState([]);
    var [onlyBikes,setOnlyBikes] = useState([]);
    var [pickLoc , setPicLoc] = useState("");
    var [dropLoc , setDropLoc] = useState("");
    var [kms , setKms] = useState();
    var [msg , setMsg] = useState("");

    var [notify,setNotify]=useState();

    var date = moment.now();
    //var loginUser = localStorage.getItem("user");


    var [ dateError , setDateError] = useState();
    var [locError , setLocError] = useState("");
    var [kmError , setKmError] = useState("");
    var navigate = useNavigate();
    var [booking,setBookings] = useState([]);
    var [bookingHistory, setBookingHistory] = useState([])
    var [allMsg,setAllMsg] = useState([]);
    var [sortVehicles,setSortVehicles] = useState([]);

    var today = moment().format('YYYY-MM-DD');
    var notification = [];
    var [showMyMsg,setShowMyMsg] = useState([]);

    function allVeicles(){
        if(   localStorage.getItem("userEmail") == null){ navigate("/") }
        axios.get("http://localhost:8084/getownerConfirmations").then((res)=>{
            var temp = res.data;
            console.log("sasi"+temp);
            var userEmail = localStorage.getItem("userEmail");
            var list = []
            for(let i = 0; i < temp.length; i++ ) {
                if( temp[i].userEmail === userEmail ) {
                    list.push(temp[i]); 
                }  
            }  
            setVehicles(list);

            console.log("regNumber : "+res.data[0].regNumber);

        })

        axios.get("http://localhost:8083/SortVehicles").then((res)=>{

            setSortVehicles(res.data);

            console.log("regNumber : "+res.data[0].regNumber);

        })

        axios.get("http://localhost:8083/getallByWheeler?wheeler=2").then((res)=>{
           console.log("my bikes"+res.data);
            setOnlyBikes(res.data);
        })
        axios.get("http://localhost:8083/getallByWheeler?wheeler=4").then((res)=>{
            setOnlyCars(res.data);
        })

        axios.get("http://localhost:8084/allBookings").then((res)=>{
            console.log("bookings data" +res.data)
            setBookings(res.data);
        })

        axios.get("http://localhost:8084/getAllConfirmedBookings").then((res)=>{
            setBookingHistory(res.data);
        })

        

        // axios.get("http://localhost:8888/searchuserEmailbyOwner?userEmail="+localStorage.getItem("userEmail")).then((res)=>{
        //     setAllMsg(res.data);

        // })

        axios.get("http://localhost:8085/getallMessagesOwner").then((res)=>{

         var email = localStorage.getItem("userEmail");
         var temp = res.data;
         var list = []
         for(let i = 0; i < temp.length; i++ ) {
             if( temp[i].userEmail === email) {
                list.push(temp[i]);
             }
         }
            setAllMsg(list);
        })

        allMsg.map(temp=>{
            if(temp.userEmail.localeCompare(localStorage.getItem("userEmail"))==0){
                notification.push(temp.adminMsg);
               // console.log("Adin msg : "+temp.adminMsg);
            }
        })
        setNotify(parseInt(notification.length))
        notification.map(temp=>{
            console.log(temp);
        })
        setShowMyMsg(notification);
    }
    useEffect(allVeicles,[]);


    function bookMyVehicle( cost ){
        alert("Into booking......")
        var isOkay = true;
        if(pickLoc.localeCompare(dropLoc)==0){
            setLocError("Pick and Drop location can't be same");
            isOkay = false;
        }else{
            setLocError("");
        }

        if(parseInt(kms) <= 10){
            setKmError("Minimum distance should be 11Km....");
            isOkay=false;
        }else{
            setKmError("");
        }

        if(fromDate < today ){
            setDateError("Choose date from today onwards....");
            isOkay=false;
        }else{
            setDateError("");
        }
        var user = localStorage.getItem("user");
        if( isOkay){
            alert(".......................");
            var newBooking = {
                pichUp : pickLoc,
                dropLoc : dropLoc,
                distance : parseInt(kms)*parseInt(cost),
                fromDate : fromDate,
                toDate : toDate,
                vehicleId : parseInt(bookingVehicle),
                userMail : localStorage.getItem("userEmail")
                
            }
            axios.get("http://localhost:8084/addbooking?id="+vehicleID+"&pickUpLocation="+pickLoc+"&droppingLocation="+dropLoc+"&kms="+parseInt(kms)*parseInt(cost)+"&bookingDate="+fromDate+"&regNumber="+bookingVehicle+"&userName="+localStorage.getItem("userName")+"&userEmail="+localStorage.getItem("userEmail")).then((res)=>{
                alert("Go to 'My Booking' To confirm your booking");
                
            })
            setFromDate("");
            setToDate("");
            setBVehicle("");
            setPicLoc("");
            setDropLoc("");
            setKms("");
        }else{
            alert("Something not okay...");
        }
    }

    function msgToAdmin(){
        console.log()
        
        var newMsg = {
            userEmail : localStorage.getItem("userEmail"),
            userName : localStorage.getItem("userName"),
            msg : msg,
            msgDate : today
        }
        
        
        axios.get("http://localhost:8085/addMessage?id="+que+"&msg="+msg+"&msgDate="+today+"&userEmail="+localStorage.getItem("userEmail")+"&userName="+localStorage.getItem("userName")).then((res)=>{
            alert("msg sent to admin");
        })
        setMsg("");
        setQue();
    }

   function BookingsHistory()
   {
    if(myBookingsHistory==false)
    {
        setMyBookingsHistory(true);
        setSeeVehicles(false);
        setSeeBikes(false);
        setSeeCars(false);
        setFrontView(false);
        setMyBookings(false);
        setMyMsg(false);
        setSort(false);
        setMsgAllToggle(false);
    }
    else{
        setMyBookingsHistory(false);
        setFrontView(true);

    }
   }

   function history()
   {
    setBookingHistory("");
    setFrontView(true);
   }
    //Toggles
    function bookingStatus(){
        if(seeVehicles==false){
            setSeeVehicles(true);
            setMyBookingsHistory(false);
            setSeeBikes(false);
            setSeeCars(false);
            setFrontView(false);
            setMyBookings(false);
            setMyMsg(false);
            setSort(false);
            setMsgAllToggle(false);
            setMyBookings(false);
        }else{
            setSeeVehicles(false);
            setFrontView(true);
        }
    }

    function Allmessages(){
        if(msgAllToggle==false){
            setMsgAllToggle(true);
            setSeeVehicles(false);
            setMyBookingsHistory(false);
            setSeeBikes(false);
            setSeeCars(false);
            setFrontView(false);
            setMyBookings(false);
            setMyMsg(false);
            setSort(false);
        }
        else{
            setMsgAllToggle(false);
            setFrontView(true);
        }
    }

    function bookingCar(){
        if(seeCars == false){
            setSeeCars(true);
            setSeeVehicles(false);
            setMyBookingsHistory(false);
            setSeeBikes(false);
            setFrontView(false);
            setMyBookings(false);
            setMyMsg(false);
            setSort(false);
            setMsgAllToggle(false);

        }else{
            setSeeCars(false);
            setFrontView(true);
        }
    }

    function bookingBike(){
        if(seeBikes==false){
            setSeeBikes(true);
            setSeeCars(false);
            setMyBookingsHistory(false);
            setSeeVehicles(false);
            setFrontView(false);
            setSort(false);
            setMyBookings(false);
            setMsgAllToggle(false);
            setMyMsg(false);
        }else{
            setSeeBikes(false);
            setFrontView(true);
        }
    }

    function myBookingsStatus(){
        if(mybookins==false){
            setMyBookings(true);
            setMyBookingsHistory(false);
            setSeeBikes(false);
            setSeeCars(false);
            setSeeVehicles(false);
            setFrontView(false);
            setMyMsg(false);
            setSort(false);
            setMsgAllToggle(false);
        }else{
            setMyBookings(false);
            setFrontView(true);
        }
    }

    function showMsgs(){
        if(myMsg==false){
            setMyMsg(true);
            setMyBookings(false);
            setMyBookingsHistory(false);
            setSeeBikes(false);
            setSeeCars(false);
            setSeeVehicles(false);
            setFrontView(false);
            setSort(false);
            setMsgAllToggle(false);
        }
        else{
            setMyMsg(false);
            setFrontView(true);
        }

    }

    function sortVeh(){
        if(sort==false){
            setSort(true);
            setMyMsg(false);
            setMyBookingsHistory(false);
            setMyBookings(false);
            setSeeBikes(false);
            setSeeCars(false);
            setSeeVehicles(false);
            setFrontView(false);
            setMsgAllToggle(false);
        }else{
            setSort(false);
            setFrontView(true);
        }
    }

    function logout(){
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("type");
        localStorage.removeItem("login");
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
                                <li><a class="dropdown-item" onClick={bookingStatus}>Booking Status</a></li>
                                <li><a class="dropdown-item" onClick={bookingCar}>Cars</a></li>
                                <li><a class="dropdown-item" onClick={bookingBike}>Bikes</a></li> 
                                <li><a class="dropdown-item" onClick={sortVeh}>Low-High Price</a></li> 
                                <li><a class="dropdown-item" onClick={myBookingsStatus}>MyBookings</a></li>
                                {/* <li><a class="dropdown-item" onClick={BookingsHistory}>Booking History</a></li> */}
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
                                <li><a class="dropdown-item" onClick={Allmessages}>All</a></li>
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
            </div>

            { frontView &&
            <div className="row">
                <div className="col-12 col-md-12">
                    <video controls >
                        <source src="./Images/video.mp4" type="video/mp4"/>
                        <source src="movie.ogg" type="video/ogg"/>
                        Your browser does not support the video tag.
                        
                    </video>
                </div>
            </div>
            }

            
            <div className="row">
                {seeVehicles &&
                        vehicles.map(temp=>{
                            console.log("reg-Number : "+temp.regNumber);
                           
                            return(
                                
                                <div className="col-12 col-md-4">
                                    <div class="card" id={"card"+temp.regNumber} >
                                        <img src={temp.vehiclePic} class="card-img-top" alt="Image"/>
                                        <div class="card-body">
                                            <h5 class="card-title">{temp.model}</h5>
                                            <h6 class="card-title">RegNumber : {temp.regNumber}</h6>
                                            <p class="card-text">Total Charge : RS.{ temp.kms }</p>
                                            <div>
                                                {/*-- Button trigger modal -->*/}
                                                {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    Book-Now
                                                </button> */}
                                                {/*<!-- Modal -->*/}
                                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Book Now</h1>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                                            </div>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div class="modal-body">
                                    
                                                                        <div className="modal-container">
                                                                            <div className="inside-form">
                                                                                <div>
                                                                                    <span className="text-danger">{locError}</span>
                                                                                    <select value={pickLoc} onChange={val=>setPicLoc(val.target.value)}>
                                                                                        <option>--Select PickUp Location--</option>
                                                                                        <option>Chennai</option>
                                                                                        <option>Hyderabad</option>
                                                                                        <option>Benguluru</option>
                                                                                        <option>Tirupati</option>
                                                                                        
                                                                                    </select>
                                                                                </div>
                                                                                <div>
                                                                                    <select value={dropLoc} onChange={val=>setDropLoc(val.target.value)}>
                                                                                        <option>--Select Droppping Location--</option>
                                                                                        <option>Chennai</option>
                                                                                        <option>Hyderabad</option>
                                                                                        <option>Benguluru</option>
                                                                                        <option>Tirupati</option>
                                                                                        
                                                                                    </select>
                                                                                </div>

                                                                                <span className="text-danger">{kmError}</span>
                                                                                <div>
                                                            
                                                                                    <input type="number" value={kms} onChange={val=>setKms(val.target.value)} placeholder="Kms" required />
                                                                                </div>

                                                                                <span className="text-danger">{dateError}</span>
                                                                                <div>
                                                                                    <span>Which Date you want</span><br></br>
                                                                                    <input type="date" value={fromDate} onChange={val=>setFromDate(val.target.value)} required />
                                                                                </div>
                                                                

                                                                                <div>
                                                                                    <span>Vehicle-RegNumber</span><br></br>
                                                                                    <input type="text" placeholder="Vehicle-Id" value={bookingVehicle} onChange={val=>setBVehicle(val.target.value)} required/>
                                                                                </div>

                                                                                <div>
                                                                                    <span>Booking-Id</span><br></br>
                                                                                    <input type="number" placeholder="Booking-Id" value={vehicleID} onChange={val=>setVehicleId(val.target.value)} required/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        <button type="button" class="btn btn-primary" onClick={()=>{bookMyVehicle(temp.pricePerKm)}}>Confirm</button>
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

                        })
                    
                    
                }
            </div>

            <div className="row">
                {seeCars &&
                    
                        onlyCars.map(temp=>{
                           
                            return(
                                
                                <div className="col-12 col-md-4">
                                    <div class="card" id={"card"+temp.regNumber} >
                                        <img src={temp.vehiclePic} class="card-img-top" alt="Image"/>
                                        <div class="card-body">
                                            <h5 class="card-title">{temp.model}</h5>
                                            <h6 class="card-title">RegNumber : {temp.regNumber}</h6>
                                            <p class="card-text">For 1Km you will charger : RS.{temp.pricePerKm}</p>
                                            <div>
                                                {/*-- Button trigger modal -->*/}
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    Book-Now
                                                </button>
                                                {/*<!-- Modal -->*/}
                                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                                            </div>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div class="modal-body">
                                    
                                                                        <div className="modal-container">
                                                                            <div className="inside-form">
                                                                            <div>
                                                                                    <span className="text-danger">{locError}</span>
                                                                                    <select value={pickLoc} onChange={val=>setPicLoc(val.target.value)}>
                                                                                        <option>--Select PickUp Location--</option>
                                                                                        <option>Chennai</option>
                                                                                        <option>Hyderabad</option>
                                                                                        <option>Benguluru</option>
                                                                                        <option>Tirupati</option>
                                                                                        
                                                                                    </select>
                                                                                </div>
                                                                                <div>
                                                                                    <select value={dropLoc} onChange={val=>setDropLoc(val.target.value)}>
                                                                                        <option>--Select Droppping Location--</option>
                                                                                        <option>Chennai</option>
                                                                                        <option>Hyderabad</option>
                                                                                        <option>Benguluru</option>
                                                                                        <option>Tirupati</option>
                                                                                        
                                                                                    </select>
                                                                                </div>

                                                                                <span className="text-danger">{kmError}</span>
                                                                                <div>
                                                            
                                                                                    <input type="number" value={kms} onChange={val=>setKms(val.target.value)} placeholder="Kms" required />
                                                                                </div>
                                                                                <span className="text-danger">{dateError}</span>
                                                                                <div>
                                                                                    <span>On Which date do want</span><br></br>
                                                                                    <input type="date" value={fromDate} onChange={val=>setFromDate(val.target.value)} required />
                                                                                </div>
                                                                                
                                                                                <div>
                                                                                    <span>Vehicle-RegNumber</span><br></br>
                                                                                    <input type="text" value={bookingVehicle} onChange={val=>setBVehicle(val.target.value)} required/>
                                                                                </div>

                                                                                <div>
                                                                                    <span>Booking-Id</span><br></br>
                                                                                    <input type="number" placeholder="Booking-Id" value={vehicleID} onChange={val=>setVehicleId(val.target.value)} required/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        <button type="button" class="btn btn-primary" onClick={()=>{bookMyVehicle(temp.pricePerKm)}}>Confirm</button>
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

                        })
                    
                    
                }
            </div>

            <div className="row">
                {seeBikes &&
                    
                        onlyBikes.map(temp=>{
                           
                            return(
                                
                                <div className="col-12 col-md-4">
                                    <div class="card" id={"card"+temp.regNumber} >
                                        <img src={temp.vehiclePic} class="card-img-top" alt="Image"/>
                                        <div class="card-body">
                                            <h5 class="card-title">{temp.model}</h5>
                                            <h6 class="card-title">RegNumber : {temp.regNumber}</h6>
                                            <p class="card-text">For 1Km you will charger : RS.{temp.pricePerKm}</p>
                                            <div>
                                                {/*-- Button trigger modal -->*/}
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    Book-Now
                                                </button>
                                                {/*<!-- Modal -->*/}
                                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                                            </div>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div class="modal-body">
                                    
                                                                        <div className="modal-container">
                                                                            <div className="inside-form">
                                                                            <div>
                                                                                    <span className="text-danger">{locError}</span>
                                                                                    <select value={pickLoc} onChange={val=>setPicLoc(val.target.value)}>
                                                                                        <option>--Select PickUp Location--</option>
                                                                                        <option>Chennai</option>
                                                                                        <option>Hyderabad</option>
                                                                                        <option>Benguluru</option>
                                                                                        <option>Tirupati</option>
                                                                                        
                                                                                    </select>
                                                                                </div>
                                                                                <div>
                                                                                    <select value={dropLoc} onChange={val=>setDropLoc(val.target.value)}>
                                                                                        <option>--Select Droppping Location--</option>
                                                                                        <option>Chennai</option>
                                                                                        <option>Hyderabad</option>
                                                                                        <option>Benguluru</option>
                                                                                        <option>Tirupati</option>
                                                                                        
                                                                                    </select>
                                                                                </div>

                                                                                <span className="text-danger">{kmError}</span>
                                                                                <div>
                                                            
                                                                                    <input type="number" value={kms} onChange={val=>setKms(val.target.value)} placeholder="Kms" required />
                                                                                </div>
                                                                                <span className="text-danger">{dateError}</span>
                                                                                <div>
                                                                                    <span>On Which date do you want</span><br></br>
                                                                                    <input type="date" value={fromDate} onChange={val=>setFromDate(val.target.value)} required />
                                                                                </div>
                                                                                
                                                                                <div>
                                                                                    <span>Vehicle-RegNumber</span><br></br>
                                                                                    
                                                                                    <input type="text" value={bookingVehicle} onChange={val=>setBVehicle(val.target.value)} required/>
                                                                                </div>
                                                                                <div>
                                                                                    <span>Booking-Id</span><br></br>
                                                                                    <input type="number" placeholder="Booking-Id" value={vehicleID} onChange={val=>setVehicleId(val.target.value)} required/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        <button type="button" class="btn btn-primary" onClick={()=>{bookMyVehicle(temp.pricePerKm)}}>Confirm</button>
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

                        })
                    
                    
                }
            </div>

            
            <div className="fixed-bottom">
            <nav class="navbar">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"/>
                        
                        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Do Messege To Owner</button>

                        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasRightLabel">Welcome</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                                <input type="number" placeholder="Question no"  required value={que} onChange={val=>setQue(val.target.value)}/>
                                <label>Your Messege : </label>
                                <textarea className="text" value={msg} onChange={val=>setMsg(val.target.value)}></textarea><br></br>
                                <button className="btn btn-primary" onClick={msgToAdmin}>Send</button>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                            
                        </svg>
                </div>
                </nav>
            </div>

            
            <div className="row">
                {myMsg && 
                    showMyMsg.map(temp=>{
                        console.log("Ibrahim")
                        return(
                            <div class="alert alert-primary" role="alert">
                                 {temp}  
                            </div>        
                        )
                    })
                }
            </div>

            <div className="row">
            {sort &&
                        sortVehicles.map(temp=>{
                            console.log("reg-Number : "+temp.regNumber);
                           
                            return(
                                
                                <div className="col-12 col-md-4">
                                    <div class="card" id={"card"+temp.regNumber} >
                                        <img src={temp.vehiclePic} class="card-img-top" alt="Image"/>
                                        <div class="card-body">
                                            <h5 class="card-title">{temp.model}</h5>
                                            <h6 class="card-title">RegNumber : {temp.regNumber}</h6>
                                            <p class="card-text">For 1Km you will charger : RS.{temp.pricePerKm}</p>
                                            <div>
                                                {/*-- Button trigger modal -->*/}
                                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    Book-Now
                                                </button>
                                                {/*<!-- Modal -->*/}
                                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Book Now</h1>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                                                            </div>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <div class="modal-body">
                                    
                                                                        <div className="modal-container">
                                                                            <div className="inside-form">
                                                                                <div>
                                                                                    <span className="text-danger">{locError}</span>
                                                                                    <select value={pickLoc} onChange={val=>setPicLoc(val.target.value)}>
                                                                                        <option>--Select PickUp Location--</option>
                                                                                        <option>Chennai</option>
                                                                                        <option>Hyderabad</option>
                                                                                        <option>Benguluru</option>
                                                                                        <option>Tirupati</option>
                                                                                        
                                                                                    </select>
                                                                                </div>
                                                                                <div>
                                                                                    <select value={dropLoc} onChange={val=>setDropLoc(val.target.value)}>
                                                                                        <option>--Select Droppping Location--</option>
                                                                                        <option>Chennai</option>
                                                                                        <option>Hyderabad</option>
                                                                                        <option>Benguluru</option>
                                                                                        <option>Tirupati</option>
                                                                                        
                                                                                    </select>
                                                                                </div>

                                                                                <span className="text-danger">{kmError}</span>
                                                                                <div>
                                                            
                                                                                    <input type="number" value={kms} onChange={val=>setKms(val.target.value)} placeholder="Kms" required />
                                                                                </div>

                                                                                <span className="text-danger">{dateError}</span>
                                                                                <div>
                                                                                    <span>On which day you want </span><br></br>
                                                                                    <input type="date" value={fromDate} onChange={val=>setFromDate(val.target.value)} required />
                                                                                </div>
                                                                                

                                                                                <div>
                                                                                    <span>Vehicle-Id</span><br></br>
                                                                                    <input type="text" placeholder="Vehicle-Id" value={bookingVehicle} onChange={val=>setBVehicle(val.target.value)} required/>
                                                                                </div>
                                                                                <div>
                                                                                    <span>Booking-Id</span><br></br>
                                                                                    <input type="number" placeholder="Booking-Id" value={vehicleID} onChange={val=>setVehicleId(val.target.value)} required/>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        <button type="button" class="btn btn-primary" onClick={()=>{bookMyVehicle(temp.pricePerKm)}}>Confirm</button>
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

                        })
                    
                    
                }
            </div>

            <div className="row">
                {mybookins &&
                    <div className="col-9">
                        <ul class="list-group list-group-horizontal oList">
                            <li class="list-group-item sli text-danger">Booking-Id</li>
                            <li class="list-group-item sli text-danger">PickUp-Location</li>
                            <li class="list-group-item sli text-danger">Drop-Location</li>
                            <li class="list-group-item sli text-danger">cost</li>
                            <li class="list-group-item sli text-danger">ForWhichDate</li> 
    
                            <li class="list-group-item sli text-danger">Vehicle-Id</li>
                            <li class="list-group-item sli text-danger">User-Email</li>
                            <li class=""></li>
                        </ul>
                    </div> }
                    { mybookins &&
                        booking.map(temp=>{
                            console.log(temp.bookingId+" : "+temp.regNumber)
                            return(
                                <UserBookings bookingId={temp.bookingId} email={temp.userEmail} vehicleId={temp.regNumber} pick={temp.pickUpLocation} drop={temp.droppingLocation} kms={temp.kms} fDate={temp.bookingDate}  ></UserBookings>
                            )
                        })
                    }
                    
            </div>

            {/* <div className="row">
                {myBookingsHistory &&
                    <div className="col-9">
                        <ul class="list-group list-group-horizontal oList">
                            <li class="list-group-item sli text-danger">Booking-Id</li>
                            <li class="list-group-item sli text-danger">PickUp-Location</li>
                            <li class="list-group-item sli text-danger">Drop-Location</li>
                            <li class="list-group-item sli text-danger">KM's</li>
                            <li class="list-group-item sli text-danger">ForWhichDate</li> 
    
                            <li class="list-group-item sli text-danger">Vehicle-Id</li>
                            <li class="list-group-item sli text-danger">User-Email</li>
                            <li class=""></li>
                        </ul>
                    </div>}
                    { 
                        bookingHistory.map(temp=>{
                            console.log(temp.bookingId+" : "+temp.regNumber)
                            return(
    
                                <div id={"order"}>
                                    <div className="col-11">
                                        <ul class="list-group list-group-horizontal oList">
                                            <li class="list-group-item sli">{temp.bookingId}</li>
                                            <li class="list-group-item sli">{temp.pick}</li>
                                            <li class="list-group-item sli">{temp.drop}</li>
                                            <li class="list-group-item sli">{temp.kms}</li>
                                            <li class="list-group-item sli">{temp.tDate}</li>
                                            <li class="list-group-item sli">{temp.vehicleId}</li>
                                            <li class="list-group-item sli">{temp.userEmail}</li>
                                            <li>
                                                <button type="button" className="confirm" onClick={myBookingsHistory} >Confirm</button> 
                                                    
                                            </li>
                                             <li>
                                                 <button type="button" onClick={history} >no</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                    
            </div> */}
            <div className="row">
                    {msgAllToggle && 

                        allMsg.map(temp=>{
                            console.log("Ibrahim")
                            return(
                                <div class="alert alert-primary" role="alert">
                                     
                                    <li class="list-group-item sli">User Email : {temp.userEmail}</li>
                                    <li class="list-group-item sli">Messege : {temp.adminMsg}</li>
                                    <li class="list-group-item sli">Posted Date : {temp.msgedDate}</li>
                                </div>        
                            )
                        })
                    }
            </div>

            {/** Msg app
            <div className="row">
                <div className="col-12 col-md-2">
                </div>
                <div className="col-12 col-md-2">
                </div>
                <div className="col-12 col-md-2">
                </div>
                <div className="col-12 col-md-2">
                </div>
                <div className="col-12 col-md-2">
                </div>
                <div className="col-12 col-md-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80px" height="80px" fill="blue" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                        
                    </svg>
                    <div class="modal-dialog modal-dialog-scrollable">
                            ...
                        </div>
                </div>

            </div> */}
        </div>
    )
}

export default UserHome;