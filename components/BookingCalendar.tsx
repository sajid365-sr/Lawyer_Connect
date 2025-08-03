'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { TimeSlot, Booking } from '@/types';
import { format, addDays, isSameDay, isAfter, startOfDay } from 'date-fns';

interface BookingCalendarProps {
  lawyerId: string;
  lawyerName: string;
  hourlyRate: number;
  availableSlots: TimeSlot[];
  onBookingSelect: (slot: TimeSlot, duration: number) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  lawyerId,
  lawyerName,
  hourlyRate,
  availableSlots,
  onBookingSelect
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [duration, setDuration] = useState<number>(60);

  // Filter slots for selected date
  const slotsForDate = availableSlots.filter(slot => 
    isSameDay(new Date(slot.date), selectedDate) && slot.isAvailable && !slot.isBooked
  );

  // Generate time slots for the next 30 days
  const generateTimeSlots = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const timeSlots = [
      '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    timeSlots.forEach((time, index) => {
      const endTime = timeSlots[index + 1] || '18:00';
      slots.push({
        id: `${format(date, 'yyyy-MM-dd')}-${time}`,
        lawyerId,
        date: format(date, 'yyyy-MM-dd'),
        startTime: time,
        endTime,
        isAvailable: Math.random() > 0.3, // 70% availability
        isBooked: false
      });
    });

    return slots;
  };

  // Get available slots for selected date (mock data)
  const getAvailableSlotsForDate = (date: Date) => {
    if (isAfter(startOfDay(date), startOfDay(new Date()))) {
      return generateTimeSlots(date);
    }
    return [];
  };

  const availableSlotsForDate = getAvailableSlotsForDate(selectedDate);

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = () => {
    if (selectedSlot) {
      onBookingSelect(selectedSlot, duration);
    }
  };

  const calculateCost = () => {
    return (hourlyRate * duration) / 60;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Book a Session with {lawyerName}
        </h3>
        <p className="text-gray-600">
          Select a date and time for your consultation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">Select Date</h4>
          <Calendar
            onChange={(date) => setSelectedDate(date as Date)}
            value={selectedDate}
            minDate={new Date()}
            maxDate={addDays(new Date(), 30)}
            className="w-full border rounded-lg"
            tileClassName={({ date }) => {
              const hasSlots = getAvailableSlotsForDate(date).some(slot => slot.isAvailable);
              return hasSlots ? 'bg-blue-50 hover:bg-blue-100' : '';
            }}
          />
        </div>

        {/* Time Slots */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Available Times - {format(selectedDate, 'MMMM d, yyyy')}
          </h4>
          
          {availableSlotsForDate.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No available slots for this date
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-6">
              {availableSlotsForDate.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => handleSlotSelect(slot)}
                  disabled={!slot.isAvailable}
                  className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                    selectedSlot?.id === slot.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : slot.isAvailable
                      ? 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                      : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  }`}
                >
                  {slot.startTime}
                </button>
              ))}
            </div>
          )}

          {/* Duration Selection */}
          {selectedSlot && (
            <div className="mb-6">
              <h5 className="text-md font-medium text-gray-900 mb-3">Session Duration</h5>
              <div className="space-y-2">
                {[30, 60, 90, 120].map((mins) => (
                  <label key={mins} className="flex items-center">
                    <input
                      type="radio"
                      name="duration"
                      value={mins}
                      checked={duration === mins}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="mr-3 text-blue-600"
                    />
                    <span className="text-gray-700">
                      {mins} minutes - ${((hourlyRate * mins) / 60).toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Booking Summary */}
          {selectedSlot && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Booking Summary</h5>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Date: {format(selectedDate, 'MMMM d, yyyy')}</p>
                <p>Time: {selectedSlot.startTime}</p>
                <p>Duration: {duration} minutes</p>
                <p className="font-medium text-gray-900">
                  Total: ${calculateCost().toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {/* Book Button */}
          {selectedSlot && (
            <button
              onClick={handleBooking}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Book Session - ${calculateCost().toFixed(2)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;