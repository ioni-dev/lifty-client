import React, { useState, useEffect } from 'react'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'

import { useForm, Controller } from "react-hook-form";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ky from 'ky'

const api = ky.extend({
	hooks: {
		beforeRequest: [
			request => {
				request.headers.set('Authorization', `Bearer ${localStorage.getItem("token")}` );
			}
		]
	}
});

const DriverForm = () => {
    const { register, handleSubmit, errors, control } = useForm({mode: "onBlur"});

    const onSubmit = async (formData) => {
        // formData['cellphone'] = "999898998998"
        formData['is_active'] = true
        formData['organization_id'] = localStorage.getItem('organizationId')
        console.log('on submit', formData)
      try {
      const res =  await api.post('http://localhost:4000/api/drivers',  {json: {driver: formData}});
        console.log('res', res)
      } catch (error) {
        console.error('checking error', error)
      }
      // res.ok && history.push('/mail-confirmation')
      // return res.json();
    };

    // button create driver
    const [isModalOpen, setIsModalOpen] = useState(false)
    function openModal() {
      setIsModalOpen(true)
    }
    function closeModal() {
      setIsModalOpen(false)
    }
    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>New Driver</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <ModalBody>
            <div className="flex">
              <Label className="w-1/2 mx-3">
                <span>First name</span>
                <Input className="mt-1" name="first_name" ref={register({
                    required: {
                      value: true,
                      message: "Please enter your driver first name",
                    }
                })} />
              </Label>
              <Label className="w-1/2">
                <span>Last name</span>
                <Input name="last_name" className="mt-1" ref={register({
                    required: {
                      value: true,
                      message: "Please enter your driver last name",
                    }
                })} />
              </Label>
            </div>
            <div className="flex">
              <Label className="w-1/2 mx-3">
                <span>Certifications</span>
                <Input name="certifications" className="mt-1" />
              </Label>
                <Label className="w-1/2">
                  <span>Years of experience</span>
                  <Input type="number" name="years_of_experience" className="mt-1"  ref={register({
                    required: {
                      value: true,
                      message: "Please enter your driver experiencec",
                    }
                })}/>
              </Label>
            </div>
            <div className="flex">
              <Label className="w-1/2 mx-3">
                <span>Email</span>
                <Input type="email" name="email" className="mt-1" 
                   ref={register({
                    required: {
                      value: true,
                      message: "Please enter your driver's email address",
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
                })}
                />
              </Label>
              <Label className="w-1/2">
                <span>Emergency contact</span>
                <Input className="mt-1" name="emergency_contact"  />
              </Label>
            </div>
            <div className="flex">

              <Label className="w-1/2  mx-3">
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
                })} />
              </Label>
              <Label className="w-1/2">
                <span>Confirm Password</span>
                <Input className="mt-1" />
              </Label>
            </div>
            <div>
                <Label className="mx-3">
                  <span>Mobile number</span>
                  <Controller
                    name="cellphone"
                    control={control}
                    defaultValue=""
                    render={({ name, onBlur, onChange, value }) => (
                      <PhoneInput
                        containerClass="w-1/3"
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
            </div>
        </ModalBody>
        <ModalFooter>
          <Button className="w-full sm:w-auto" layout="outline" onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit" block className="mt-4" disabled={useForm.isSubmitting}>
            Create
          </Button>
        </ModalFooter>
       </form>

      </Modal>
    )
}


export default DriverForm;