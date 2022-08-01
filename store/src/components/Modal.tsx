import React from 'react'

interface IModal {
  children: React.ReactNode
  closeModal: () => void 
}

const Modal: React.FC<IModal> = ({ children,closeModal }) => {
  return (
    <>
      <div
        className='w-full fixed bg-black/50 top-0 rigth-0 bottom-0 left-0 '
        onClick={closeModal}
      />
      <div className='w-[50%] p-5 bg-white absolute rounded-xl top-10 left-1/2 -translate-x-1/2' >
        {children}
      </div>
    </>
   
  )
};

export default Modal