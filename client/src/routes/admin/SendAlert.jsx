import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendAlert = () => {
  const [users, setUsers] = useState([]);
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [emailAddresses, setEmailAddresses] = useState([]);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false); // State for modal visibility

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data.result);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {
    console.log(emailAddresses);
  }, [emailAddresses]);

  const handleSelectType = (selectedType) => {
    setSelectedType(selectedType); 
    const filteredRecipients = users.filter(user => user.userType === selectedType);
    const addresses = filteredRecipients.map(user => user.emailAddress);
    setEmailAddresses(addresses);
    setErrors(prevErrors => ({ ...prevErrors, selectedType: '' }));
  };

  const handleRemoveEmail = (index) => {
    setEmailAddresses(prevEmails => prevEmails.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    let validationErrors = {};
  
    if (!selectedType) {
      validationErrors.selectedType = 'Please select a user type.';
    }
  
    if (emailAddresses.length === 0) {
      validationErrors.emailAddresses = 'No recipients found.';
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    const data = {
      recipients: emailAddresses,
      subject,
      text
    };
  
    setSending(true); // Show modal
  
    axios.post('http://localhost:3001/mail/send', data)
      .then(response => {
        console.log('Email sent successfully');
        setErrors({});
        setSending(false);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error sending email:', error);
        setSending(false);
        window.location.reload();
      });
  };
  

  return (
    <div className="container mx-auto px-4">
      <form onSubmit={handleSubmit} className="bg-gray-50 w-full mx-auto bg-white shadow-md rounded-lg p-6 mt-10 border border-solid border-gray-300 rounded">
        <h2 className="text-2xl font-semibold mb-4">Send Mail</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select User Types
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="donor"
              name="userType"
              value="donor"
              checked={selectedType === 'donor'}
              onChange={() => handleSelectType('donor')}
              className="mr-2"
            />
            <label htmlFor="donor" className="text-gray-700">All Donors</label>
            <input
              type="radio"
              id="organization"
              name="userType"
              value="organization"
              checked={selectedType === 'organization'}
              onChange={() => handleSelectType('organization')}
              className="ml-4 mr-2"
            />
            <label htmlFor="organization" className="text-gray-700">All Organizations</label>
          </div>
          {errors.selectedType && <p className="text-red-500 text-sm">{errors.selectedType}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            placeholder='Subject Here..'
          />
          {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Message
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 "
            placeholder='Type message here..'
          />
          {errors.text && <p className="text-red-500 text-sm">{errors.text}</p>}
        </div>

        <div className="flex items-center ">
          <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-14 rounded focus:outline-none focus:shadow-outline">
            Send Mail
          </button>
        </div>

        <div className="mb-4 mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Recipients
          </label>
          <div className="flex flex-wrap">
            {emailAddresses.map((email, index) => (
              <div key={index} className="bg-gray-200 rounded-lg p-2 mr-2 mb-2 flex items-center">
                <span className="mr-2">{email}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveEmail(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 6.293a1 1 0 011.414 1.414L10 11.414l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 11-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          {errors.emailAddresses && <p className="text-red-500 text-sm">{errors.emailAddresses}</p>}
        </div>
      </form>
      {sending && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg">
            <p>Emails Sending...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendAlert;
