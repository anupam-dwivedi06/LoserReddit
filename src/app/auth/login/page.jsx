"use client";

import {useRouter} from 'next/navigation'
import { useState } from 'react';


function login() {
  const [formdata, setformdata] = useState({
    email:"",
    password:"",
  })
  const [loding, setloding] = useState(false);
  const router = useRouter();
  const pushSignup = () =>  {
    console.log("Push to signup page");
    router.push('/auth/signup');
  }

  const handlechange = (e) =>{
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  }

 const handleForm = async (e) =>{
  e.preventDefault()
  setloding(true);
  try {
    const respond = await fetch("/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(formdata) // send the state data as json string
    });

    if(!respond.ok){
      const errorData = await respond.json();
      throw new Error(errorData.msg || `Login fail : ${respond.status}`)
    }

    const result = await respond.json();
    console.log("Login successfull", result.msg);
    console.log("User: ", result.user);
    router.push("/");
    router.refresh();
  } catch (error) {
    console.log("Login fail", error.msg);
  }
  finally{
    setloding(false);
    
  }
 }


  
  return (
    <>
      <div className="p-2 mt-5 flex flex-col items-center gap-5">
        <div className="p-4">
          <h2 className="text-center text-3xl md:text-4xl text-pink-600 font-bold">
            Login
          </h2>
        </div>
        <form
          onSubmit={handleForm}
          className="p-4 bg-amber-100 rounded-md w-full md:w-1/4"
        >
          
    
          <div className="flex flex-col gap-2 p-2">
            <label htmlFor="email" className="font-semibold text-purple-500">
              Email
            </label>
            <input
              type="text"
              className="border rounded border-brown-800 indent-4 p-1"
              name="email"
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col gap-2 p-2">
            <label htmlFor="password" className="font-semibold text-purple-500">
              Password
            </label>
            <input
              type="text"
              className="border rounded border-brown-800 indent-4 p-1"
              name="password"
              onChange={handlechange}
            />
          </div>
          <button className="bg-amber-600 py-2 px-5 text-white rounded" type='submit'>Login</button>
      
        </form>

        <div className="">
          <button className="bg-amber-600 py-2 px-5 text-white rounded" onClick={pushSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );

}
export default login;
