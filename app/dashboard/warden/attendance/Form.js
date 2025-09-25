"use client";
import { useState, useEffect } from "react";
import { markAttendance } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const WardenDashboardAttendanceForm = ({ students, wardenId, attendance: initialAttendance }) => {
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    if (initialAttendance) {
      const presentStudents = initialAttendance.present || [];
      const newAttendanceState = {};
      students.forEach(student => {
        newAttendanceState[student.application_id] = presentStudents.includes(student.name);
      });
      setAttendance(newAttendanceState);
    } else {
      // If no initial attendance, mark all as absent by default
      const newAttendance = {}; // This variable name is fine here as it's local to the else block
      students.forEach(student => {
        newAttendance[student.application_id] = false;
      });
      setAttendance(newAttendance);
    }
  }, [initialAttendance, students]);

  const handleCheckboxChange = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId], // Toggle the value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const presentStudents = [];
    const absentStudents = [];

    students.forEach((student) => {
      if (attendance[student.application_id]) {
        presentStudents.push(student.name);
      } else {
        absentStudents.push(student.name);
      } 
    });

    try {
      await markAttendance(presentStudents, absentStudents, wardenId);
      toast.success("Attendance marked successfully!");
    } catch (error) {
      toast.error("Failed to mark attendance.");
      console.error(error);
    }
  };

  const markAll = (isPresent) => {
    const newAttendance = {};
    students.forEach(student => {
      newAttendance[student.application_id] = isPresent;
    });
    setAttendance(newAttendance);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-4 mb-4">
        <Button type="button" onClick={() => markAll(true)}>Mark All Present</Button>
        <Button type="button" onClick={() => markAll(false)}>Mark All Absent</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {students.map((student) => (
          <div key={student.application_id} className="flex items-center space-x-2 border p-2 rounded-md">
            <input
              type="checkbox"
              id={student.application_id}
              checked={!!attendance[student.application_id]} // Ensure it's a boolean
              onChange={() => handleCheckboxChange(student.application_id)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <label htmlFor={student.application_id} className="text-lg">
              {student.name} ({student.application_id})
            </label>
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-4">Submit Attendance</Button>
    </form>
  );
};

export default WardenDashboardAttendanceForm;