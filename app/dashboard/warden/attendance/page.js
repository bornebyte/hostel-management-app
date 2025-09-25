import { getStudents, getAttendanceForDate } from "@/app/actions";
import WardenDashboardAttendanceForm from "./Form";
import { cookies } from "next/headers";

const WardenDashboardAttendance = async () => {
  const students = await getStudents();
  const cookieStore = await cookies();
  const wardenId = cookieStore.get("id")?.value;
  const today = new Date().toISOString().slice(0, 10);
  const attendance = await getAttendanceForDate(today);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>
      <WardenDashboardAttendanceForm students={students} wardenId={wardenId} attendance={attendance} />
    </div>
  );
};

export default WardenDashboardAttendance;
