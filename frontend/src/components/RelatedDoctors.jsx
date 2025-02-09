import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function RelatedDoctors({ speciality, docId }) {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium ">
        Top Doctors To Book Your Appointment
      </h1>
      <p className="sm:w-1/3 text-center text-sm ">
        Simply browe through our extensive list of doctors and book your
        appointment.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gay-y-6 px-3 sm:px-0 ">
        {relDoc.slice(0, 5).map((item, index) => {
          return (
            // <-- Add return here
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0); // This ensures the page scrolls to the top
              }}
              className="border border-blue-200 rounded-xl overflow-hidden  cursor-pointer hover:translate-y-[-10px] translate-all duration-500"
              key={index}
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-500 text-sm ">{item.speciality}</p>{" "}
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        See More
      </button>
    </div>
  );
}
