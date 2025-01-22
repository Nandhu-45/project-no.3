import axios from "axios";
import moment from "moment";
import React from "react";

function UserBookings(prop){


    function confirmBooking(){
        alert("into confirm...........")
        var isConfirm = false;
        var booking = {
            pichUp : prop.pick,
            dropLoc : prop.drop,
            distance : parseInt(prop.kms),
            fromDate : prop.fDate,
            toDate : prop.tDate,
            vehicleId : parseInt(prop.vehicleId),
            userEmail : prop.email
            
        }
        alert("brfore confirm...........")
        axios.get("http://localhost:8084/addnewconfirmations?confirmId="+prop.bookingId+"&pickUpLocation="+prop.pick+"&droppingLocation="+prop.drop+"&kms="+parseInt(prop.kms)+"&confirmDate="+prop.fDate+"&regNumber="+prop.vehicleId+"&userName="+localStorage.getItem("userName")+"&userEmail="+prop.email).then((res)=>{
            alert("We will reach you shortly....");
            // axios.delete("http://localhost:8084/deleteBookingById?id="+prop.bookingId);
            deleteBooking();
            document.getElementById("order"+prop.bookingId).remove();
        })
        
    }

    function deleteBooking(){
        axios.get("http://localhost:8084/deleteBookingById?id="+prop.bookingId).then((res)=>{
            document.getElementById("order"+prop.bookingId).remove();
            alert("Booking cancelled");
        })
    }

    return(
        <div id={"order"+prop.bookingId}>
        <div className="col-11">
            <ul class="list-group list-group-horizontal oList">
                <li class="list-group-item sli">{prop.bookingId}</li>
                <li class="list-group-item sli">{prop.pick}</li>
                <li class="list-group-item sli">{prop.drop}</li>
                <li class="list-group-item sli">{prop.kms}</li>
                <li class="list-group-item sli">{prop.fDate}</li> 
                <li class="list-group-item sli">{prop.vehicleId}</li>
                <li class="list-group-item sli">{prop.email}</li>
                <li>
                    <button type="button" className="confirm" onClick={confirmBooking} >Confirm</button>
                    
                </li>
                <li>
                    <button type="button" onClick={deleteBooking} >Cancel</button>
                </li>
            </ul>
        </div>
        </div>
    )
}

export default UserBookings;