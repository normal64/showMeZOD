import React, { useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Zlib } from 'zlib';
import { z } from "zod"

function App() {
  const [formValidationStatus, setFormValidationStatus] = useState(false)
  const [formData, setFormData] = useState({
    userName: "",
    userAge: 1,
    isProgrammer: true, 
    hobby:""
  })
  useEffect(() => {
    console.log("formdata effect", formData)
    console.log(UserSchema.safeParse(formData).success)
    setFormValidationStatus(UserSchema.safeParse(formData).success)
    return () => {
      
    }
  }, [formData])
  useEffect(() => {
    console.log(formValidationStatus);
    
    return () => {
      
    }
  }, [])

  const hobbies = ["Programing", "Weight Lifting", "Drums","Guitar"] as const
  const UserSchema = z.object({
    userName: z.string().min(3),
    userAge: z.number().gt(16),
    birthday: z.date().optional(),
    isProgrammer: z.boolean(),
    hobby: z.string().optional()
    //hobby: z.enum(hobbies).optional()
  })
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome</h1>
        <form>
          <label htmlFor="uname">Your name:</label><br />
          <input type="text" id="uname" name="uname" value={formData.userName} onChange={(e) => setFormData({...formData,userName:e.target.value})} /><br />
          <label htmlFor="age">Age:</label><br />
          <input type="number" id="age" min="10" max="60" name="age" onChange={(e) => setFormData({...formData,userAge:Number(e.target.value)})} /><br />
          <input type="checkbox" id="scales" name="scales"  onChange={(e) => setFormData({...formData,isProgrammer:e.target.checked})} 
            defaultChecked />
          <label htmlFor="scales" className="checkbox-text">I would consider offering  a developer position or refer to a person in business</label>
          <br />
          <label>Choose a hobby: 
<input list="browsers" type="text" name="myBrowser"  onChange={(e)=>setFormData({...formData,hobby:e.target.value})}/></label>
          <datalist id="browsers" >

            {hobbies.map(elem => {
              return (
                <option value={elem} />
              )
            })}
          </datalist><br />
          
          <a href="https://normal64.github.io/prtfl/">
          <button type="button" disabled={formValidationStatus ? false : true} > 
          Enter
         
          </button>
          </a>

        </form>
      </header>

    </div>
  );
}

export default App;
