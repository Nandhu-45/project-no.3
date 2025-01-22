// import axios from "axios";
// import moment from "moment";
// import React, { useEffect, useState } from "react";

// function BookingHistory(prop){
    
//     var today = moment().format('YYYY-MM-DD');
//     var [veh,setVeh] = useState([]);

//     function getAmount(){
//         axios.get("http://localhost:8888/getbyregNumber?regNumber="+prop.vehicleId).then((res)=>{
//             setVeh(res.data);
//         })
//     }
//     useEffect(getAmount,[]);

//     function confirmBooking(){
//         var msg="Your booking was confirmed and your bill is : "+veh.pricePerKm*(prop.kms);
//         alert("into booking")
//         var isConfirm = false;
//         var booking = {
//             pichUp : prop.pick,
//             dropLoc : prop.drop,
//             distance : parseInt(prop.kms),
//            // fromDate : prop.fDate,
//             toDate : prop.tDate,
//             vehicleId : parseInt(prop.vehicleId),
//             userEmail : prop.userEmail
            
//         }
//         alert("before confirm")
//         axios.get("http://localhost:8888/OwnerConfirmBookings?ownerconfirmationId="+prop.bookingId+"&pickUpLocation="+prop.pick+"&droppingLocation="+prop.drop+"&kms="+parseInt(prop.kms)+"&ownerconfirmationDate="+today+"&regNumber="+prop.vehicleId+"&userName="+prop.userName+"&userEmail="+prop.userEmail).then((res)=>{
            

//             axios.get("http://localhost:8888/deleteConfoBooking?id="+prop.bookingId);
//             axios.get("http://localhost:8888/AddOwnermessagesContent?id="+prop.bookingId+"&msgedDate="+today+"&adminMsg="+msg+"&userEmail="+prop.userEmail);
//             document.getElementById("order"+prop.bookingId).remove();
//             alert("into confirmBooking");
            
//         })
        

        
//     }

//     function deleteBooking(){
//         var msg="Your booking was cancelled";
//         alert("into delete")
//         axios.get("http://localhost:8888/deleteConfoBooking?id="+prop.bookingId).then((res)=>{
//             axios.get("http://localhost:8888/AddOwnermessagesContent?id="+prop.bookingId+"&msgedDate="+today+"&adminMsg="+msg+"&userEmail="+prop.userEmail);
//             document.getElementById("order"+prop.bookingId).remove();
//             alert("Booking cancelled");
//         })
//     }

//     return(
//         <div id={"order"+prop.bookingId}>
//         <div className="col-11">
//             <ul class="list-group list-group-horizontal oList">
//                 <li class="list-group-item sli">{prop.bookingId}</li>
//                 <li class="list-group-item sli">{prop.pick}</li>
//                 <li class="list-group-item sli">{prop.drop}</li>
//                 <li class="list-group-item sli">{prop.kms}</li>
//                 <li class="list-group-item sli">{prop.tDate}</li>
//                 <li class="list-group-item sli">{prop.vehicleId}</li>
//                 <li class="list-group-item sli">{prop.userEmail}</li>
//                 <li>
//                     <button type="button" className="confirm" onClick={confirmBooking} >Confirm</button>
                    
//                 </li>
//                 <li>
//                     <button type="button" onClick={deleteBooking} >Delete</button>
//                 </li>
//             </ul>
//         </div>
//         </div>
//     )
// }

// export default BookingHistory;