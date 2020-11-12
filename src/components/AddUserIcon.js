import React from 'react'
import classNames from 'classnames'
import  {AddPersonIcon}  from '../icons'

function AddUserIcon({
  // icon: AddPersonIcon,
  iconColorClass = 'text-purple-600 dark:text-purple-100',
  bgColorClass = 'bg-purple-100 dark:bg-purple-600',
  text,
  className,
}) {
  const baseStyle = 'p-3 rounded-full'

  const cls = classNames(baseStyle, iconColorClass, bgColorClass, className)
  return (
    <>
    <button className="flex flex-row-reverse justify-around w-1/5 bg-blue-500 text-white active:bg-blue-600 font-bold  text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1" 
      type="button" style={{ transition: "all .15s ease" }}>{text}
        <AddPersonIcon  className="w-6 h-6 align-middle" />
    </button>
    {/* <div className={cls}>
      <AddPersonIcon  className="w-5 h-5" />
    </div> */}
  </>
  )
}

export default AddUserIcon
