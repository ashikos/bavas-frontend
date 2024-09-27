import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axios';
import { useNavigate } from 'react-router';
import Alertbox from '../../components/utils/Alertbox';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import loginimg from '../../assets/image/loginimg.png'
import { GiSelfLove } from "react-icons/gi";

const Login = () => {
  const [creds, SetCreds] = useState({ username: '', password: '' });
  const [errorMessage, setError] = useState({ title: '', color: 'success', message: null });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleAlertBox() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setError((prestat) => ({ ...prestat, message: null, title: null }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(creds);

    axios
      .post('bills/login/', creds, {
        headers: {},
      })
      .then((response) => {
        console.log('Post request successful:', response.data);
        const user_id = response.data.id;
        const user_type = response.data.user_type;
        let is_registered = response.data.is_registered;
        localStorage.setItem('userId', user_id);
        localStorage.setItem('firstName', response.data.first_name);
        localStorage.setItem('userType', response.data.user_type);
        localStorage.setItem('educationId', response.data.advanced_info.education);
        localStorage.setItem('professionId', response.data.advanced_info.profession);
        localStorage.setItem('familyId', response.data.advanced_info.family);
        localStorage.setItem('ClientId', response.data.advanced_info.client);
        localStorage.setItem('preferenceId', response.data.advanced_info.preference);
        localStorage.setItem('isEmploy', response.data.is_employ);

        if (user_type === 101) {
          navigate('/admin/');
        } else if (user_type === 102) {
          navigate(`${is_registered ? '/dashboard' : '/user/base/'}`);
          setError({ title: 'Success', color: 'success', message: 'Logged in successfully' });
          handleAlertBox();
        }
      })
      .catch((error) => {
        console.error('Error making POST request:', error);
        setError((prestat) => ({ ...prestat, title: 'Info Alert', message: error.response.data.detail, color: 'failure' }));
        handleAlertBox();
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetCreds((prestat) => ({ ...prestat, [name]: value }));
    console.log(creds);
  };

  const handleGoogleSuccess = (response) => {
    console.log('Google login response:', response);
    const token = response.credential;
    axios
      .post('bills/google-login/', { token }, {
        headers: {},
      })
      .then((response) => {
        console.log('Google login successful:', response.data);
        const user_id = response.data.id;
        const user_type = response.data.user_type;
        let is_registered = response.data.is_registered;
        localStorage.setItem('userId', user_id);
        localStorage.setItem('firstName', response.data.first_name);
        localStorage.setItem('userType', response.data.user_type);
        localStorage.setItem('educationId', response.data.advanced_info.education);
        localStorage.setItem('professionId', response.data.advanced_info.profession);
        localStorage.setItem('familyId', response.data.advanced_info.family);
        localStorage.setItem('ClientId', response.data.advanced_info.client);
        localStorage.setItem('preferenceId', response.data.advanced_info.preference);
        localStorage.setItem('isEmploy', response.data.is_employ);

        if (user_type === 101) {
          navigate('/admin/');
        } else if (user_type === 102) {
          navigate(`${is_registered ? '/dashboard' : '/user/base/'}`);
          setError({ title: 'Success', color: 'success', message: 'Logged in successfully' });
          handleAlertBox();
        }
      })
      .catch((error) => {
        console.error('Error making Google login request:', error);
        setError((prestat) => ({ ...prestat, title: 'Info Alert', message: error.response.data.detail, color: 'failure' }));
        handleAlertBox();
      });
  };

  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
    setError({ title: 'Google Login Failed', message: 'Unable to login with Google. Please try again.', color: 'failure' });
    handleAlertBox();
  };

  return (


    <div className="w-screen h-screen flex  bg-slate-100">
        <div className="w-[55%] bg-white h-screen ">
          <div className="flex justify-center pt-[15rem]">
            <img src={loginimg}  alt="" className='w-[65%] h-[50%]' />
          </div>
        </div>
        
        <div className="w-[45%] h-screen">
        <Link to="/dashboard" ><p className='text-gray-700 p-3 font-extrabold'>demo</p> </Link> 
         
        <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-md font-medium text-gray-700 mb-2">Email</label>
              <input type="email" id="email" name="username" onChange={handleChange} className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-md font-medium text-gray-700 mb-2">Password</label>
              <input type="password" id="password" name="password" onChange={handleChange} className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input type="checkbox" id="remember" name="remember" onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember" className="ml-2 block text-md text-gray-900">Remember me</label>
              </div>
              <div className="text-md">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
              </div>
            </div>
            <button type="submit" className="w-full bg-gray-800 mb-3 text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:bg-gray-800">Sign in</button>
            <div className="text-center">
              <p className="text-gray-700">Not registered yet?</p>
              <Link to="/login">
                <span className="pl-2">Signup</span>
              </Link>
            </div>
          </form>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
            className="mt-4"
          />
        </div>
        <Alertbox errorMessage={errorMessage} />
      </div>
        </GoogleOAuthProvider>

          {/* {<Outlet/>} */}

            
        </div>
    </div>







   
  );
};

export default Login;