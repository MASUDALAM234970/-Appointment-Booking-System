import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function MyAppointments() {
  const { token, doctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/user/appointments",

        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);

        // Attach doctor data manually if missing
        const updatedAppointments = data.appointments.map((appointment) => {
          const doctor = doctors.find((doc) => doc._id === appointment.docId);
          return { ...appointment, docData: doctor || {} };
        });
        setAppointments(updatedAppointments.reverse());
        console.log("Updated Appointments:", updatedAppointments);
        console.log(data.appointments);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token, doctors]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My Appointments
      </p>
      <div>
        {appointments.slice(0, 3).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32  bg-indigo-50"
                src={item?.docData?.image}
                alt=""
              />
            </div>
            <div className="flex-1  text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item?.docData?.name}
              </p>
              <p>{item?.docData?.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1 ">Address:</p>
              <p className="text-lg">{item?.docData?.address?.line1}</p>
              <p className="text-lg ">{item?.docData?.address?.line2}</p>

              <p className="text-lg mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>
                {item.slotDate} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white translate-all duration-500">
                Pay online
              </button>
              <button className="text-sm text-stone-500 text-center mt-2 sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white translate-all duration-500">
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
