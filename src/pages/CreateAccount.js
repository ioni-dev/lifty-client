import React from 'react'
import { Link } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form";

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { Input, Label, Button } from '@windmill/react-ui'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Select } from '@windmill/react-ui'
import ky from 'ky'
import { useHistory } from "react-router-dom";





function CreateAccount() {
  let history = useHistory();
  const { register, handleSubmit, errors, control } = useForm({mode: "onBlur"});
  const onSubmit = async (data) => {
    const res =  await ky.post('http://localhost:4000/api/organizations',  {json: {organization: data}});
    res.ok && history.push('/mail-confirmation')
    // return res.json();
  };
  

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <Label>
                <span>Nombre</span>
                <Input className="mt-1" type="text" name="full_name"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter your full name",
                    },
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters are allowed",
                    },
                    maxLength: {
                      value: 255,
                      message: "Maximum 255 characters are allowed",
                    },
                })} />
              </Label>
                {errors.full_name && (
                <span className={` mandatory`}>
                  {errors.full_name.message}
                </span>
              )}
               <Label>
                <span>Organization Name</span>
                <Input className="mt-1" type="text" name="organization_name"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter your organization name",
                    },
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters are allowed",
                    },
                    maxLength: {
                      value: 255,
                      message: "Maximum 255 characters are allowed",
                    },
                })} />
              </Label>
                {errors.organization_name && (
                <span className={` mandatory`}>
                  {errors.organization_name.message}
                </span>
              )}
                   <Label>
                <span>Country</span>
                  <Select className="mt-1" name="country"  ref={register({
                    required: {
                      value: true,
                      message: "Please enter your organization name",
                    }
                })} >
                    <option value="Uruguay">Uruguay</option>
                  </Select>
              </Label>
                {errors.country && (
                <span className={` mandatory`}>
                  {errors.country.message}
                </span>
              )}
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" name="email"
                  ref={register({
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
                })} />
              </Label>
                {errors.email && (
                <span className={` mandatory`}>
                  {errors.email.message}
                </span>
              )}
              <Label>
                <span>Mobile number</span>
                 <Controller
                  name="cellphone"
                  control={control}
                  defaultValue=""
                  render={({ name, onBlur, onChange, value }) => (
                    <PhoneInput
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      id="contactPhoneNumber"
                      country={"uy"}
                      style={{ width: "100%" }}
                      label="Contacto telefónico"
                      variant="outlined"
                      margin="normal"
                      error={Boolean(errors.phone)}
                    />
                    )}
                    />
                </Label>
                {errors.mobileNumber && (
                <span className={` mandatory`}>
                  {errors.mobileNumber.message}
                </span>
              )}
              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" type="password" name="password"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter password",
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
                <span>Confirm password</span>
                <Input className="mt-1" type="password" name="confirmPassword"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter password",
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
                <span>Vehicle quantity</span>
                <Input className="mt-1" type="number" name="vehicule_quantity"
                  ref={register({
                    required: {
                      value: true,
                      message: "Please enter a quantity"
                    }
                })}/>
              </Label>

              <Label className="mt-6" check>
                <Input type="checkbox" />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label>

              {/* <Button tag={Link} to="/login" block className="mt-4"> */}
               <Button type="submit" block className="mt-4" disabled={useForm.isSubmitting}>
                Create account
              </Button>

              <hr className="my-8" />


              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
