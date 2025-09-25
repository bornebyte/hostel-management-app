"use client"
import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { addOrUpdateMenu } from "@/app/actions"

const CanteenManagerAddMenuForm = () => {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState(undefined)
    const [mealTime, setMealTime] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [fields, setFields] = useState([""])

    // Add new input field
    const addField = () => {
        if (fields[fields.length - 1].trim() === "") {
            toast.info("Please fill the current field before adding a new one.")
            return
        }
        setFields([...fields, ""])
    }

    // Remove a specific field
    const removeField = (index) => {
        setFields(fields.filter((_, i) => i !== index))
    }

    // Update input value
    const handleChange = (index, value) => {
        const newFields = [...fields]
        newFields[index] = value
        setFields(newFields)
    }

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!mealTime) {
            toast.warning("Please select a meal time.")
            return
        }
        if (!date) {
            toast.warning("Please select a date.")
            return
        }

        const menuItems = fields.filter((field) => field.trim() !== "")
        if (menuItems.length === 0) {
            toast.warning("Please add at least one menu item.")
            return
        }

        // Convert JS Date -> YYYY-MM-DD string for PostgreSQL DATE
        // const formattedDate = date.toISOString().split("T")[0]
        // ✅ Correct (IST / Indian local date)
        const formattedDate = date.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

        const formData = { date: formattedDate, mealTime, menuItems }

        setIsSubmitting(true)
        try {
            await addOrUpdateMenu(formData)
            toast.success("Menu has been submitted successfully!")
            setFields([""]) // reset fields
            setMealTime("")
            setDate(undefined)
        } catch (error) {
            console.error("Failed to submit menu:", error)
            toast.error("Failed to submit menu. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold">Add Menu</h2>

            {/* Meal Time + Date Selectors */}
            <div className="flex justify-center gap-3">
                <Select value={mealTime} onValueChange={setMealTime}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="breakfast">Breakfast</SelectItem>
                            <SelectItem value="lunch">Lunch</SelectItem>
                            <SelectItem value="snacks">Snacks</SelectItem>
                            <SelectItem value="dinner">Dinner</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date"
                            className="w-48 justify-between font-normal"
                        >
                            {date ? date.toLocaleDateString() : "Select date"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(d) => {
                                setDate(d)
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* Dynamic Menu Fields */}
            <Card className="max-w-full mx-auto mt-10 shadow-lg rounded-2xl">
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <Input
                                    type="text"
                                    placeholder={`Field ${index + 1}`}
                                    value={field}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => removeField(index)}
                                    disabled={fields.length === 1}
                                >
                                    ✕
                                </Button>
                            </div>
                        ))}

                        <div className="flex gap-2">
                            <Button
                                type="button"
                                onClick={addField}
                                variant="secondary"
                            >
                                + Add Field
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default CanteenManagerAddMenuForm
