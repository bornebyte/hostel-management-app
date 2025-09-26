"use client"

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar } from "@/components/ui/calendar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon, Trash2, Pencil, Utensils, Info } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { deleteMenu } from '@/app/actions'
import { toast } from 'sonner'

const mealOrder = ['breakfast', 'lunch', 'snacks', 'dinner'];

const StudentViewMenu = ({ initialMenuData, initialDate }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [date, setDate] = useState(new Date(initialDate))
  const [open, setOpen] = useState(false)

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate)
    setOpen(false)
    const dateString = selectedDate.toLocaleDateString('en-CA')
    startTransition(() => {
      router.push(`/dashboard/canteen-manager/view-menu?date=${dateString}`)
    })
  }

  const handleDelete = async (menuId, mealTime) => {
    if (confirm(`Are you sure you want to delete the ${mealTime} menu?`)) {
      try {
        await deleteMenu(menuId)
        toast.success(`${mealTime.charAt(0).toUpperCase() + mealTime.slice(1)} menu deleted successfully!`)
        startTransition(() => {
          router.refresh()
        })
      } catch (error) {
        toast.error("Failed to delete menu.")
        console.error(error)
      }
    }
  }

  const handleEdit = (mealTime) => {
    const dateString = date.toLocaleDateString('en-CA');
    router.push(`/dashboard/canteen-manager/add-menu?date=${dateString}&mealTime=${mealTime}`);
  }

  const sortedMenuData = [...initialMenuData].sort((a, b) => mealOrder.indexOf(a.meal_time) - mealOrder.indexOf(b.meal_time));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">View Menu</h1>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-48 justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? date.toLocaleDateString() : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {isPending ? (
        <div className="text-center p-8">Loading...</div>
      ) : sortedMenuData.length > 0 ? (
        <Accordion type="single" defaultValue={sortedMenuData.map(m => m.meal_time)}>
          {sortedMenuData.map((menu) => (
            <AccordionItem value={menu.meal_time} key={menu.id}>
              <AccordionTrigger className="text-xl capitalize font-semibold">
                {menu.meal_time}
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent className="pt-6">
                    <ul className="space-y-2 list-disc list-inside">
                      {menu.items.map((item, index) => (
                        <li key={index} className="text-base">{item}</li>
                      ))}
                    </ul>
                    <div className="flex gap-2 mt-4 justify-end">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(menu.meal_time)}><Pencil className="h-4 w-4 mr-2" />Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(menu.id, menu.meal_time)}><Trash2 className="h-4 w-4 mr-2" />Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center text-gray-500 py-10 flex flex-col items-center gap-4">
          <Info className="h-12 w-12 text-gray-400" />
          <p className="text-lg">No menu found for {new Date(initialDate).toLocaleDateString()}.</p>
          <Button onClick={() => router.push('/dashboard/canteen-manager/add-menu')}>Add a Menu</Button>
        </div>
      )}
    </div>
  )
}

export default StudentViewMenu