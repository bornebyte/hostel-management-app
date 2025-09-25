import React from 'react'
import CanteenManagerBroadCastMessageForm from './Form'
import { cookies } from 'next/headers'

const CanteenManagerBroadCastMessage = async () => {
    const id = (await cookies()).get("id")?.value
    return (
        <div>
            <CanteenManagerBroadCastMessageForm id={id} />
        </div>
    )
}

export default CanteenManagerBroadCastMessage