import React from 'react'
import CanteenManagerBroadCastMessageForm from './Form'
import { cookies } from 'next/headers'

const StudentFeedbackComponent = async () => {
  const id = (await cookies()).get("id")?.value
    return (
        <div className='w-full'>
            <CanteenManagerBroadCastMessageForm id={id} />
        </div>
    )
}

export default StudentFeedbackComponent