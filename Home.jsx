import { React, useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Fp from '../components/Fp'
import Modal from '../components/Modal'
import { useRef } from 'react';

function Home() {
  const [open, setOpen] = useState(false);
  const [det, setDet] = useState({ name: "Sam", gen: "Male" })
  const name = localStorage.getItem('name');
  const ref = useRef();
  const [warn, setWarn] = useState(true);
  if (!name) { ref.current = 1 }

  useEffect(() => {
    if (ref.current === 1) setOpen(true);
    ref.current++;
    setWarn(true);
  }, [])

  return (
    <div>
      {open && <Modal setOpenModal={setOpen} setDet={setDet} />}
     
      <Navbar />
      <Fp open={open} />
    </div>
  )
}

export default Home
