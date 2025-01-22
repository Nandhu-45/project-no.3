import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Link, Route, Routes,Outlet } from 'react-router-dom';

function Link(){
    return(
        <div>
            <Link to="/">Home</Link>
            <Link to='/userHome'>User-Home</Link>
        </div>
    )
}
export default Link;