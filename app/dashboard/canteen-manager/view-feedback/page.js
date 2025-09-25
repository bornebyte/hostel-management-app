import React from 'react';
import { getMenuFeedback } from '@/app/actions';
import FeedbackView from '../FeedbackView';

const ViewFeedbackPage = async () => {
  const feedbackData = await getMenuFeedback();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Student Food Feedback</h1>
      <FeedbackView feedbackData={feedbackData} />
    </div>
  );
};

export default ViewFeedbackPage;