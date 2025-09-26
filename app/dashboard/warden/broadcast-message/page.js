import React from 'react'
import CanteenManagerBroadCastMessageForm from './Form'
import { cookies } from 'next/headers'

const CanteenManagerBroadCastMessage = async () => {
    const id = (await cookies()).get("id")?.value
    const role = (await cookies()).get("role")?.value
    return (
        <div>
            <CanteenManagerBroadCastMessageForm id={id} role={role} />
        </div>
    )
}

export default CanteenManagerBroadCastMessage