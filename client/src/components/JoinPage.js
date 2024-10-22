import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

import votingABI from '../abi/Attendance.json'; 
import './JoinPage.css'; // Import the separate CSS file

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; 

const Modal = ({ isOpen, onClose, formData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <h3 className="modal-title">Form Submitted</h3>
        <p className="modal-description">The following students were selected:</p>
        <ul className="student-list">
          {formData.students.filter(student => student.isChecked).map((student, index) => (
            <li key={index}><strong>{student.name}</strong></li>
          ))}
        </ul>
        <p className="modal-description">Your attendance has been recorded.</p>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

const JoinPage = () => {
  const [formData, setFormData] = useState({
    students: [
      { name: 'Krishnendu ', isChecked: false },
      { name: 'Matrix Roy', isChecked: false },
      { name: 'Jishnu Proto', isChecked: false },
      { name: 'Echo Whisper', isChecked: false },
      { name: 'Frozen Saturn', isChecked: false },
      { name: 'Apex Kumar', isChecked: false },
    ]
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      '.join-page',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
    );
  }, []);

  const handleChange = (index) => {
    const updatedStudents = formData.students.map((student, i) => {
      if (i === index) {
        return { ...student, isChecked: !student.isChecked };
      }
      return student;
    });
    setFormData({ ...formData, students: updatedStudents });
  };

  const getContract = () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to interact with this feature.');
      return null;
    }

    const provider = new Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, votingABI, signer);
  };

  const submitAttendance = async () => {
    try {
      const contract = getContract();
      if (!contract) return false;
  
      const selectedStudents = formData.students
        .filter(student => student.isChecked)
        .map(student => student.name);
  
      if (selectedStudents.length === 0) {
        alert('Please select at least one student.');
        return false;
      }
  
      const tx = await contract.markAttendance(selectedStudents);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error submitting attendance:', error);
      return false;
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await submitAttendance(); 
    if (success) {
      setIsModalOpen(true); 
    } else {
      alert('Attendance Recorded!');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      students: formData.students.map(student => ({ ...student, isChecked: false }))
    });
  };

  return (
    <div className="join-page">
      <div className={`form-container ${isModalOpen ? 'form-container-blur' : ''}`}>
        <h2 className="form-title">Attendance</h2>
        <form onSubmit={handleSubmit} className="attendance-form">
          <div className="student-checkbox-group">
            {formData.students.map((student, index) => (
              <label key={index} className="student-checkbox">
                <input
                  type="checkbox"
                  checked={student.isChecked}
                  onChange={() => handleChange(index)}
                />
                {student.name}
              </label>
            ))}
          </div>
          <div className="submit-button-container">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} formData={formData} />
    </div>
  );
};

export default JoinPage;
