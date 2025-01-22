import axios from "axios";
import React, { useState } from "react";

function VehicleReg(prop){

    var [regNum,setRegNum] = useState("");
    var [vehicle,setVehicle] = useState("");
    var [vType,setVType] = useState("");
    var [VPic,setVpic] = useState("");
    var [price,setPrice] = useState();
    var [priceError,setPriceError] = useState("");


   async function vRegister(){
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
            var img = VPic.replace("C:\\fakepath\\","./Images/")
            var newVehicle = {
                model : vehicle,
                type : parseInt(vType),
                VPic : img,
                price : price
            }
            var ownerId =  localStorage.getItem("Id");

           await axios.get("http://localhost:8083/addVehicle?regNumber="+regNum+"&model="+vehicle+"&vehiclePic="+img+"&wheeler="+parseInt(vType)+"&pricePerKm="+parseInt(price)+"&ownerId="+parseInt(ownerId)).then((res)=>{
            prop.update()   ;
            alert("Vehicle registration successful");
            })
            setPrice("");
            setVehicle("");
            setVType("");
            setVpic("");
            setRegNum("");

        }
    }
    function resetRegister(){
            setPrice("");
            setVehicle("");
            setVType("");
            setVpic("");
            setRegNum("");
        }

    function preventsubmit(event){
        event.preventDefault();
    }

    return(
        <div className="row">
            <div className="col-12">
            <div className="form-container">
                            <div>
                                <h2>Vehicle Registration Page</h2>
                            </div>
                            <div className="inside-form">
                                <span className="text-success"></span>
                                <form onSubmit={preventsubmit}>
                                <div>
                                        <input type="text" placeholder="Vehicle Reg Number" value={regNum} onChange={val=>setRegNum(val.target.value)} required />
                                    </div>
                                    
                                    <div>
                                        <input type="text" placeholder="Vehicle Model" value={vehicle} onChange={val=>setVehicle(val.target.value)} required />
                                    </div>

                                    <div>
                                        <select value={vType} onChange={val=>setVType(val.target.value)}>
                                            <option>--Select Vehicle Type(Wheeler)--</option>
                                            <option>2</option>
                                            <option>4</option>
                                            
                                        </select>
                                    </div>
                                    <div>
                                        <span className="text-danger">{priceError}</span>
                                        <input type="number" placeholder="Price/KM" value={price} onChange={val=>setPrice(val.target.value)} required />
                                    </div>
                                    <div>
                                        <input type="file" name="vehicle" placeholder="Vehicle" value={VPic} onChange={val=>setVpic(val.target.value)} required />
                                    </div>
                                    <div>
                                        <button type="submit" className="submit" onClick={vRegister}>Submit</button>
                                    </div>
                                    <div>
                                        <button type="reset" className="reset" onClick={resetRegister}>Reset</button>
                                    </div>
                                </form>
                            </div>
                        </div>
            </div>
        </div>
    )
}
export default VehicleReg;