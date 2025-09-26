"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useState } from 'react'
import { sendBroadcastMessage } from '@/app/actions'
import { toast } from 'sonner'

const CanteenManagerBroadCastMessageForm = ({ id, role }) => {
    const [message, setMessage] = useState({
        subject: '',
        message: ''
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!id || !id) {
            toast.error("User not authenticated.");
            return;
        }
        const result = await sendBroadcastMessage(message.subject, message.message, id, role);
        if (result) {
            toast.success("Message broadcasted successfully!");
            setMessage({ subject: '', message: '' });
        } else {
            toast.error("Failed to broadcast message.");
        }
    }
    return (
        <div className='w-full max-w-6xl mx-auto px-4 py-8'>

            <h1 className="text-3xl font-bold text-center mb-8">Broadcast Message to Students</h1>
            <div className="max-w-2xl mx-auto shadow-md rounded-lg p-6">
                <form className="space-y-4">
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium">
                            Subject
                        </label>
                        <Input
                            type="text"
                            id="subject"
                            name="subject"
                            className="mt-1 block w-full rounded-md"
                            placeholder="e.g., Important Announcement, Menu Change"
                            value={message.subject}
                            onChange={(e) => setMessage({ ...message, subject: e.target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium">
                            Message
                        </label>
                        <Textarea
                            id="message"
                            name="message"
                            rows="8"
                            className="mt-1 block w-full rounded-md shadow-sm"
                            placeholder="Type your message here..."
                            value={message.message}
                            onChange={(e) => setMessage({ ...message, message: e.target.value })}
                        ></Textarea>
                    </div>
                    <Button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                        onClick={handleSubmit}
                    >
                        Broadcast Message
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CanteenManagerBroadCastMessageForm