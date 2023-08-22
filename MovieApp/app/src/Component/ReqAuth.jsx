import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const ReqAuth = ({children, change='/login'}) => {
    const isAuth = true;
    // console.log(auth)
    const location = useLocation();

    if(!isAuth){
          return <Navigate to="/login"  state={{from: location}} replace/>
    }
 
   return children;
}

export default ReqAuth