import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EventModal = ({ isOpen, onClose }) => {

  if (!isOpen) return null;

  const userEmail=useSelector((state)=> state.sign.email);

  const navigate=useNavigate();

  const [formstate, setFormstate]=useState({
    title: "",
    description: "",
    date: "",
    location: "",
  })

  const formHandler=(e)=>
  {
    setFormstate({...formstate, [e.target.name]: e.target.value});
  }

  const createEvent=(e)=>
  {
    e.preventDefault();

    let newEventarr;
    let newObj={email : userEmail, arr: [{title: formstate.title, description: formstate.description,date: formstate.date, 
        location: formstate.location}]};

    if(localStorage.getItem("eventArr")===null)
    {
            localStorage.setItem('eventArr', JSON.stringify([newObj]));
    }
    else
    {
        let alleventsArr=JSON.parse(localStorage.getItem("eventArr"));
        let flag=0;

        for(let element of alleventsArr)
        {
            
            if(element.email==userEmail)
            {
              newEventarr=element.arr;
              let newarrele={title: formstate.title, description: formstate.description,date: formstate.date, 
                location: formstate.location};
              newEventarr.push(newarrele); 
              element={...element, arr: newEventarr}
              flag=1;
            }

           localStorage.setItem('eventArr', JSON.stringify(alleventsArr));
           if(flag===1)
           break;
        }

        if(flag===0)
        {
            let newalleventsArr=alleventsArr;
            newalleventsArr.push(newObj);
            localStorage.setItem("eventArr", JSON.stringify(newalleventsArr));
        }
    }
    onClose();
    navigate('/dashboard');
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-purple-800">Create Event</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={(e)=>createEvent(e)}>
          <div className="space-y-4">
            {/* Event Title */}
            <div>
              <label
                htmlFor="eventTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Event Title
              </label>
              <input value={formstate.email} onChange={(e)=> formHandler(e)}
                type="text"
                name="title"
                id="eventTitle"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Event Description */}
            <div>
              <label
                htmlFor="eventDescription"
                className="block text-sm font-medium text-gray-700"
              >
                Event Description
              </label>
              <textarea value={formstate.description} onChange={(e)=> formHandler(e)}
              name="description"
                id="eventDescription"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
                placeholder="Enter event description"
                required
              />
            </div>

            {/* Event Date */}
            <div>
              <label
                htmlFor="eventDate"
                className="block text-sm font-medium text-gray-700"
              >
                Event Date
              </label>
              <input
                type="date" value={formstate.date} onChange={(e)=> formHandler(e)}
                name="date"
                id="eventDate"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
                required
              />
            </div>

            {/* Event Location */}
            <div>
              <label
                htmlFor="eventLocation"
                className="block text-sm font-medium text-gray-700"
              >
                Event Location
              </label>
              <input
                type="text" name="location" value={formstate.location} onChange={(e)=> formHandler(e)}
                id="eventLocation"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-800"
                placeholder="Enter event location"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button 
              type="submit" 
              className="w-full px-4 py-2 bg-purple-800 text-yellow-300 font-medium rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-500"
            >
                Create Event
           </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
