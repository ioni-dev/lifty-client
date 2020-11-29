import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";
import { Label, Input, Button } from '@windmill/react-ui'
import login from '../assets/img/login.svg'
import ky from 'ky'
import { useHistory } from "react-router-dom";
import NotyfContext from './../context/NotyfContext';



function Login() {
  const notyf = useContext(NotyfContext);
  const { register, handleSubmit, errors, control } = useForm({mode: "onBlur"});
  let history = useHistory();
  const onSubmit = async (data) => {
    try {
      const res =  await ky.post('http://localhost:4000/api/auth/identity/callback',  {json: {user: data, type: 'organization' }}).json();
      console.log(res)
      localStorage.setItem("token", res.token)
      localStorage.setItem("organizationId", res.id)
      res && history.push('/app/drivers')
    } catch (error) {
      notyf.error('Email o password no coinciden')
      console.log('check', error)
    }

  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={login}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={login}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className="w-full">
              
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" name="email"  ref={register({
                    required: {
                      value: true,
                      message: "Please enter your email address",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Enter a valid email address",
                    },
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters are allowed",
                    },
                    maxLength: {
                      value: 255,
                      message: "Maximum 255 characters are allowed",
                    },
                })}/>
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password"  name="password" ref={register({
                    required: {
                      value: true,
                      message: "Please enter a password"
                    }
                })} />
              </Label>

             
              <Button type="submit" block className="mt-4" disabled={useForm.isSubmitting}>
                 Log in
              </Button>
              <hr className="my-8" />


              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </form>
          
          
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
