import React from 'react'
import emailSent from '../assets/img/emailSent.svg'
import { Link } from 'react-router-dom'

function MailConfirmation() {
  return (
    <section className="text-gray-700 body-font">
    <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src={emailSent} />
        <div className="text-center lg:w-2/3 w-full">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">An email confirmation was sent, please check your inbox</h1>
        <p className="mb-8 leading-relaxed">Click on the link to activate your acount</p>
        <div className="flex justify-center">
          <Link
            className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
            to="/login"
            >
              Login
          </Link>
        </div>
        </div>
    </div>
    </section>
  )
}

export default MailConfirmation
