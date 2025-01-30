import React, { useContext, useEffect, useState } from 'react';
import { signContext } from '../App';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import EventModal from '../components/EventModal';

const Dashboard = () => {

   const {signstate, setSign}=useContext(signContext);
   const navigate=useNavigate();

   const useremail=useSelector((state)=> state.sign.email);


   const [eventArr, setEventArr]=useState([]);

   const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

   const flag=true;

   useEffect(() => {
    if (!signstate) {
      navigate('/signin');
    }
  }, [signstate, navigate]);

   useEffect(()=>
{
 if(localStorage.getItem("eventArr")!==null)
        {
         // [{email: "mailid",arr: [{title: "", description: "",date: "", location: ""}]}]
 
         let alleventsArr=JSON.parse(localStorage.getItem("eventArr"));
 
         for(let eventObj of alleventsArr)
         {
             let email=eventObj.email;
 
             if(email===useremail)
             {
                 setEventArr(eventObj.arr);
                 break;
             }
         }
        }
},[useremail,localStorage.getItem("eventArr")]);

       
    

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Heading */}
      <h1 className="text-4xl font-semibold text-purple-800 mb-8">Your Events</h1>


    {!eventArr.length &&  <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-semibold text-purple-800 mb-4">
          No Events Scheduled Yet
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          You currently don't have any upcoming events. Start by creating your first event!
        </p>
        <button onClick={openModal} className="px-6 py-3 bg-yellow-300 text-gray-800 rounded-lg hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500">
          Create an Event
        </button>

        <EventModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div> }

      {/* Event Card Section */}
       <div className="space-y-8">
        {/* Example Event Card */}
       {eventArr.map((event)=> {return <div className="bg-white p-6 rounded-lg shadow-md max-w-full lg:max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-x-6 md:space-y-0">
         

            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-semibold text-purple-800 mb-2">{event.title}</h2>
              <p className="text-lg text-gray-700 mb-4">{event.description}</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="px-4 py-2 text-sm font-medium text-yellow-800 bg-yellow-300 rounded-full">Date: {event.date}</span>
                <span className="px-4 py-2 text-sm font-medium text-yellow-800 bg-yellow-300 rounded-full">Location: {event.location}</span>
              </div>
              <button className="px-6 py-3 bg-purple-800 text-white rounded-lg w-full md:w-auto hover:bg-purple-700 focus:ring-4 focus:ring-purple-500">
                View Event Details
              </button>
            </div>
          </div>
        </div>})
        }

        {/* Create Event Button */}
      {eventArr.length && <div className="text-center">
          <button onClick={openModal} className="px-6 py-3 bg-yellow-300 text-gray-800 rounded-lg hover:bg-yellow-400 focus:ring-4 focus:ring-yellow-500">
            Create a New Event
          </button>

          <EventModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    }
      </div>
    </div>
  );
};

export default Dashboard;
