import React from 'react'
import CanteenManagerViewMenuChild from './View'
import { getMenuForDate } from '@/app/actions'

const WordenManagerViewMenu = async ({ searchParams }) => {
  // Fetch menu for the selected date, or default to today's date in 'YYYY-MM-DD' format
  const selectedDate = searchParams.date || new Date().toLocaleDateString('en-CA')
  const menuData = await getMenuForDate(selectedDate)

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <CanteenManagerViewMenuChild initialMenuData={menuData} initialDate={selectedDate} />
    </div>
  )
}

export default WordenManagerViewMenu