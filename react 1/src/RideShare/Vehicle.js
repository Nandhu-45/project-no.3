import axios from "axios";
import React, { useState } from "react";
//import "./Vehicle.css";



function Vehicle(prop){
    var [vid,setId] = useState(prop.regNumber);
    var [vehicle,setVehicle] = useState("");
    var [vType,setVType] = useState("");
    var [VPic,setVpic] = useState("");
    var [price,setPrice] = useState();
    var [priceError,setPriceError] = useState("");

    async  function deleteVehicle () {
      await  axios.get("http://localhost:8083/deletevehicle?regNumber="+prop.id).then((res)=>{
            alert("vehicle deleted");
        })
         prop.update()
        document.getElementById("card"+prop.id).remove();
    }

    function upDateVehicle(){

        var isOkay = true;
        if(price<=10){
            setPriceError("Price can't be less than 10");
            isOkay = false;
        }else{
            setPriceError("");
        }

        if(!isOkay){
            alert("Something Error!!");
        
        }else{
            var img = VPic.replace("C:\\fakepath\\","/Images/");
            var newVehicle = {
                model : vehicle,
                type : vType,
                // VPic : VPic.replace("C:\\fakepath\\","./Images/"),
                VPic : img,
                price : parseInt(price),
                id : parseInt(vid)
            }
            axios.get("http://localhost:8083/updateVehicle?regNumber="+prop.id+"&model="+vehicle+"&vehiclePic="+img+"&wheeler="+parseInt(vType)+"&pricePerKm="+parseInt(price)+"&ownerId="+localStorage.getItem("Id")).then((res)=>{
                prop.update()   
                alert("Vehicle Updation successful");
            })
            setPrice("");
            setVehicle("");
            setVType("");
            setVpic("");
            setId("");
           
        }

    }

    
    return(
        <div className="col-12 col-md-4">
            <div className="vehicle">
            {/* <div className="col-12 col-md-4"> */}
                <div class="card" id={"card"+prop.id} >
                    <img src={prop.vPic} class="card-img-top" alt="Image"/>
                    <div class="card-body">
                        <h5 class="card-title"> {prop.model}</h5>
                        <h5 class="card-title">RegNumber : {prop.id}</h5>
                        <p class="card-text">For 1Km you will charger : RS.{prop.price}</p>
                        <button className="btn btn-danger" onClick={deleteVehicle}>Delete</button> 
                        <div>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Update
                            </button>

                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            {/** */}
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Update Vehicle</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div class="modal-body">
                                    
                                                         <div className="modal-container">
                                                            <div className="inside-form">
                                                                
                                                            {/* <div>
                                                                <input type="text" placeholder="Vehicle RegNumber" value={vid} onChange={val=>setId(val.target.value)} required />
                                                            </div> */}
                                                            <div>
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
                                                                <span className="text-danger">{priceError}</span>
                                                                <input type="number" placeholder="Price" value={price} onChange={val=>setPrice(val.target.value)} required />
                                                            </div>
                                                            <div>
                                                                <input type="file" name="vehicle" placeholder="Vehicle" value={VPic} onChange={val=>setVpic(val.target.value)} required />
                                                            </div>
                            

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" onClick={upDateVehicle}>Update</button>
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
export default Vehicle;

