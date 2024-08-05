import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Login = () => {

  const [creds, setCreds] = useState({"username":null, "password":null})
  // const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();
  
  const checkCreds =  (event)=>{
    event.preventDefault();
    const credData = {
      "username": creds['username'],
      "password": creds['password']
    }
    console.log( credData);
    axios.post(`/sales/login/`, credData)
    .then(response=>{
      console.log('Successfully LogedIn:', response.status);
      if (response.status === 200){
        navigate('/')
      }
    }).catch(error=>{
      console.error('Error making POST request:', error);
      if (error.response.status === 403){
        alert(error.response.data.detail)
        console.log(error.response.data.detail);
      }
    })
    

    
  }

  
  return (
    <div className=" w-full flex justify-center items-center bg-gray-800">
     <div id="inner" className="w-[35%] flex justify-center items-center py-[10%] border border-spacing-8 bg-gray-700 rounded-[15px] bg-opacity-4">
     <form className="flex max-w-md flex-col gap-4 w-[100%]" onSubmit={checkCreds}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email"  className="text-white"/>
        </div>
        <TextInput id="email1" onChange={(e)=>setCreds(prestat => ({...prestat, "username": e.target.value} ))}  type="email" required placeholder="name@flowbite.com"  />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" className="text-white"/>
        </div>
        <TextInput onChange={(e)=>setCreds(prestat => ({...prestat, "password": e.target.value} ))}  id="password1" required type="password"  />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-white">Remember me</Label>
      </div>
      <Button  type="submit">Submit</Button>
    </form>
     </div>
    </div>
  )
}

export default Login