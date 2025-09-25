import React from 'react'
import StudentFoodFeedbackFormComponent from './Form'
import { cookies } from 'next/headers';
import { getMenuForDate } from '@/app/actions';

const StudentFoodFeedbackComponent = async () => {
  const cookieid = (await cookies()).get("id")?.value;
  const today = new Date().toLocaleDateString('en-CA');
  const menuData = await getMenuForDate(today);

  return (
    <div>
        <StudentFoodFeedbackFormComponent cookieid={cookieid} menuData={menuData} />
    </div>
  )
}

export default StudentFoodFeedbackComponent