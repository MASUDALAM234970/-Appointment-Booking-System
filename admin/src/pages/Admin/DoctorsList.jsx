import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

export default function DoctorsList() {
  const { doctors, atoken, getAllDoctors } = useContext(AdminContext);
  console.log(doctors);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  if (!doctors) {
    return <div>Loading...</div>; // Show loading message if doctors data is not available
  }

  return (
    <div className="m-5 p-1 max-h-[90vh] overflow-y-scroll ">
      <h1 className="text-lg font-medium ">
        All <span className="text-red-400">DOCTORS</span>
      </h1>
      <div className="w-full flex flex-wrap gap-4 pt-4 gap-y-6 ">
        {doctors && doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
              key={index}
            >
              <img
                className="bg-indigo-50 group-hover:bg-primary translate-all duration-500"
                src={item.image}
                alt=""
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-zinc-400 text-sm">{item.speciality}</p>
              </div>
              <div className="mt-1 flex items-center gap-1 text-sm">
                <input type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
            </div>
          ))
        ) : (
          <p>No doctors found.</p> // Show a message when there are no doctors
        )}
      </div>
    </div>
  );
}
