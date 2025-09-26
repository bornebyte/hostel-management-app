"use client";

import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const FeedbackView = ({ feedbackData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filteredFeedback = useMemo(() => {
    if (!selectedDate) return feedbackData;
    const dateString = format(selectedDate, 'yyyy-MM-dd');
    return feedbackData.filter(fb => format(new Date(fb.date), 'yyyy-MM-dd') === dateString);
  }, [selectedDate, feedbackData]);

  const chartData = useMemo(() => {
    const mealRatings = {
      breakfast: { total: 0, count: 0 },
      lunch: { total: 0, count: 0 },
      snacks: { total: 0, count: 0 },
      dinner: { total: 0, count: 0 },
    };

    filteredFeedback.forEach(fb => {
      if (mealRatings[fb.meal_time]) {
        mealRatings[fb.meal_time].total += fb.rating;
        mealRatings[fb.meal_time].count += 1;
      }
    });

    return Object.keys(mealRatings).map(mealTime => ({
      name: mealTime.charAt(0).toUpperCase() + mealTime.slice(1),
      "Average Rating": mealRatings[mealTime].count > 0
        ? (mealRatings[mealTime].total / mealRatings[mealTime].count).toFixed(2)
        : 0,
    }));
  }, [filteredFeedback]);

  const comments = useMemo(() => {
    return filteredFeedback.filter(fb => fb.comments && fb.comments.trim() !== '');
  }, [filteredFeedback]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Feedback Overview</CardTitle>
          <CardDescription>Average meal ratings and comments for the selected date.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4 items-start">
          <div>
            <label className="block text-sm font-medium mb-1">Select Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[280px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Meal Ratings</CardTitle>
          <CardDescription>
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "All Time"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFeedback.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Average Rating" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 py-10">No feedback data for the selected date.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
          <CardDescription>
            {selectedDate ? `Feedback comments for ${format(selectedDate, "MMMM d, yyyy")}` : "All feedback comments"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {comments.length > 0 ? (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {comments.map((fb) => (
                <div key={fb.id} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold capitalize">{fb.user_name} on {fb.meal_time}</p>
                    <p className="text-sm text-gray-500">{new Date(fb.created_at).toLocaleString()}</p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{fb.comments}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-500">{'★'.repeat(fb.rating)}</span>
                    <span className="text-gray-400">{'★'.repeat(5 - fb.rating)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-10">No comments for the selected date.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackView;