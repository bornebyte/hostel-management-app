"use client";

import * as React from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addOrUpdateMenuFeedback } from "@/app/actions";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const StudentFoodFeedbackFormComponent = ({
    cookieid, // This is the user ID
    menuData,
}) => {
    const [menuId, setMenuId] = useState("");
    const [rating, setRating] = useState(0);
    const [comments, setComments] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!menuId) {
            toast.warning("Please select a meal.");
            return;
        }
        if (rating < 1 || rating > 5) {
            toast.warning("Please select a rating between 1 and 5");
            return;
        }

        const userId = cookieid;

        setIsSubmitting(true);
        try {
            await addOrUpdateMenuFeedback({ menuId, userId, rating, comments });
            toast.success("Feedback submitted successfully!");
            setComments("");
            setRating(0);
            setMenuId("");
        } catch (error) {
            console.error("Failed to submit feedback:", error);
            toast.error("Failed to submit feedback. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedMenu = menuData.find(menu => menu.id.toString() === menuId);

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Food Feedback</h1>
            {menuData.length === 0 ? (
                <p className="text-center text-gray-500">No menu available for today to give feedback.</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Select Meal</label>
                        <Select value={menuId} onValueChange={setMenuId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a meal to give feedback" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Today&apos;s Meals</SelectLabel>
                                    {menuData.map((menu) => (
                                        <SelectItem key={menu.id} value={menu.id.toString()} className="capitalize">
                                            {menu.meal_time}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {selectedMenu && (
                        <div className="pt-2">
                            <p className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-200">Items for {selectedMenu.meal_time}:</p>
                            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                                    {selectedMenu.items.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium mb-1">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <Button
                                    key={num}
                                    type="button"
                                    variant={rating === num ? "default" : "outline"}
                                    onClick={() => setRating(num)}
                                >
                                    {num} ★
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Comments</label>
                        <Textarea
                            placeholder="Write your comments here..."
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Submitting..." : "Submit Feedback"}
                    </Button>
                </form>
            )}
        </div>
    );
};

export default StudentFoodFeedbackFormComponent;
