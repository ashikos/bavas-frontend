import React from 'react'
import { useState } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';


const Container = () => {
  
  const [delModal, setDelModal] = useState(false);
  return (
    <div><Button onClick={() => setDelModal(true)}>Toggle modal</Button>
    <Modal show={delModal} size="md" onClose={() => setDelModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => setDelModal(false)}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={() => setDelModal(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal></div>
  )
}

export default Container