import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { auth } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [flag, setFlag] = useState('');
  const location = useLocation();
  const comefrom = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !pass) {
      setError('Fill in all login fields');
      return;
    }
    setError('');
    setFlag(true);
      await signInWithEmailAndPassword(auth, email, pass)
      .then((r)=>{
        console.log(r);
        navigate(comefrom, { replace: true });
      })
      .catch((errorr)=>{
        setFlag(false)
        console.log(errorr);
      })
    
  };
  console.log(comefrom);
  return (
    <div className='login' style={{border:"1px solid black", width:"30%", height:"400px",margin:"auto",marginTop:"5px",backgroundImage:"URL(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_enQvl_kc45QJUn312vIROsSXVUkShBp0mA&usqp=CAU)",backgroundSize:"cover",backgroundRepeat: 'no-repeat',backgroundPosition:"center"}} >
        <h1 style={{width:"100%", color:"white"}}>Login App</h1>
        <form onSubmit={handleLogin}>
            <input style={{width:"98%", height:"50px",fontSize:"24px",marginTop:"5px"}} type="email"
            placeholder='enter your email'
            value={email} 
            onChange={(e)=> setEmail(e.target.value)}/>
            <br />
            <input type="password"
            style={{width:"98%", height:"50px",fontSize:"24px",marginTop:"5px"}}
            placeholder='enter your password' 
            value={pass}
            onChange={(e)=> setPass(e.target.value)} />

            <div className='inputSubmitlogin'>
                <b>{error}</b>
                <input style={{width:"100%", height:"50px",fontSize:"24px",marginTop:"5px",backgroundColor:"red", color:"black"}} type="submit" value="Submit"  disabled={flag} />
            </div>
        </form>
        <div className='notAccountgotosignup' >
        <p style={{ fontSize:"24px", color:"white"}}>
            Already have an account?{" "}
            <span>
              <Link style={{textDecoration:"none",color:"white"}} to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
    </div>
  )
}

export default Login