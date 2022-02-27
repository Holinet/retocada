import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import GoogleLogin from 'react-google-login';
import logo from '../assets/logo.png';
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));


    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl,
    };
    
    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className='flex justify-start items-center flex-col h-screen bg-cover min-w-full min-h-full'>
      <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-[#0B0D0E] bg-cover min-w-full min-h-full'>
        <div className='p-5'>
          <img src={logo} width='330px' alt='logo' />
        </div>
        <div className='shadow-2x1'>
          <GoogleLogin 
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={renderProps => (
              <button className='bg-gradient-to-r from-[#5238AC] via-[#7554D4] to-[#E956A6] flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none text-[#0B0D0E] font-bold' onClick={renderProps.onClick} disabled={renderProps.disabled}>               
                <FcGoogle className='mr-4' /> Sign in with Google
              </button>
            )} 
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </div>
  )
}

export default Login