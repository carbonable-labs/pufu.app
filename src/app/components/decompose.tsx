"use client";
import Image from 'next/image';
import { useState } from 'react';

const Decompose = () => {
  const [selectedProject, setSelectedProject] = useState('');
  const [quantity, setQuantity] = useState(0);
  
  const projectList = ['Project 1', 'Project 2', 'Project 3']; // Insert your project names

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Insert your validation and blockchain logic here
    console.log(`Selected project: ${selectedProject}`);
    console.log(`Quantity: ${quantity}`);
  }

  return (
    <>
      <div className="grid grid-flow-row place-content-around text-white w-screen  ">
        <div className='bg-white border-2 border-gray-400 round w-96 h-80 text-black'>
          <form onSubmit={handleSubmit}>
            <p> Select the asset to decompose </p>
            <select value={selectedProject} onChange={handleProjectChange}>
              {projectList.map((project, index) => <option key={index} value={project}>{project}</option>)}
            </select>
            <input type="number" value={quantity} onChange={handleQuantityChange} placeholder="Enter quantity" />
            <button type="submit">Validate</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Decompose;
