import React, { useState, useEffect } from 'react'

import { useForm, Controller } from "react-hook-form";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import SectionTitle from '../components/Typography/SectionTitle'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui'
import PageTitle from '../components/Typography/PageTitle'
import { AddPersonIcon, FilterIcon, SearchIcon } from '../icons'
import ky from 'ky'
import { useQuery } from 'react-query';
import DriverForm from '../components/forms/driver/DriverForm'

import response from '../utils/demo/tableData'
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui'


import { Dropdown, DropdownItem } from '@windmill/react-ui'

const api = ky.extend({
	hooks: {
		beforeRequest: [
			request => {
				request.headers.set('Authorization', `Bearer ${localStorage.getItem("token")}` );
			}
		]
	}
});

const fetchDrivers = async () => {
  const res = await api.get('http://localhost:4000/api/drivers').json()
  return res.data
}



function Drivers() {
  const { status, data, error, isFetching } = useQuery('drivers', fetchDrivers)

  console.log(data)

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
  
  const [page, setPage] = useState(1)
  const [datas, setData] = useState([])
  // dropdown filter
  const [isOpen, setIsOpen] = useState(false)
  function toggleDropdown() {
    setIsOpen(!isOpen)
  }
    // button create driver
  const [isModalOpen, setIsModalOpen] = useState(false)
  function openModal() {
    setIsModalOpen(true)
  }
  function closeModal() {
    setIsModalOpen(false)
  }
  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {
    setPage(p)
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage))
  }, [page])

  return (
    <>
      <PageTitle>Drivers</PageTitle>


     {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search for drivers"
              aria-label="Search"
            />
          </div>
        </div>
      <div className="flex justify-end w-full">
           {/* filter dropdown */}
        <div className="relative mb-2 mx-2">
          <Button className="bg-bitterSweet" onClick={toggleDropdown} aria-label="Filter" aria-haspopup="true" iconLeft={FilterIcon}>
            Filter
          </Button>
          <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)} className="w-px" align="left">
            <DropdownItem tag="a" href="#">
              <span>By Name</span>
            </DropdownItem>
            <DropdownItem onClick={() => alert('Alerts!')}>
              <span>Status</span>
            </DropdownItem>
              <DropdownItem onClick={() => alert('Alerts!')}>
              <span>Last time active</span>
            </DropdownItem>
          </Dropdown>
        </div>
        <div className="relative">
          <Button onClick={openModal} className="bg-bitterSweet dark:bg-red-500"  aria-label="AddDriver" 
            iconLeft={AddPersonIcon} >
            Add driver
          </Button>
          <DriverForm />
        </div>

      </div>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Driver</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last time active</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data && data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>

                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.profile_pic} alt="pic" />
                    <div>
                      <p className="font-semibold">{user.first_name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.last_name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm"> {user.years_of_experience}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.is_active && "Active"}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.last_logged_in).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Drivers
