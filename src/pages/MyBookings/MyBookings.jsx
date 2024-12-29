import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

import Swal from 'sweetalert2';
import { FaCalendarAlt, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { GiConfirmed } from 'react-icons/gi';
import useAxios from '../../hooks/useAxios';


const MyBookings = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const axiosSecure = useAxios()

  useEffect(() => {
    fetchCounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCounts = async () => {
    try {
      const { data } = await axiosSecure.get(`/add-count/${user?.email}`);
      setCounts(data);
    } catch (error) {
      toast.error('Error fetching bookings:', error);
    }
  };

  const handleCancelBooking = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Cancel Booking',
        text: 'Are you sure you want to cancel this booking?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      });

      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/booking-status-update/${id}`, { bookingStatus: 'canceled' });
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!!',
            text: 'Your booking has been canceled.',
            icon: 'success',
          });
          fetchCounts();
        } else {
          Swal.fire('Error!', 'Unable to cancel the booking. Please try again.', 'error');
        }
      }
    } catch (error) {
      toast.error('An error occurred while canceling the booking.');
    }
  };

  const handleConfirmBooking = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Confirm Booking',
        text: 'Are you sure you want to confirm this booking?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        const { data } = await axiosSecure.patch(`/booking-status-update/${id}`, { bookingStatus: 'confirmed' });
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Confirmed!',
            text: 'Your booking has been confirmed.',
            icon: 'success',
          });
          fetchCounts();
        } else {
          Swal.fire('Error!', 'Unable to confirm the booking. Please try again.', 'error');
        }
      }
    } catch (error) {
      toast.error('An error occurred while confirming the booking.');
    }
  };

  const handleModifyDate = (booking) => {
    setSelectedBooking(booking);
    setStartDate(new Date(booking.bookingDate));
    setEndDate(new Date(booking.endDate));
    setShowModal(true);
  };

  const handleSaveDateChanges = async () => {
    if (startDate && endDate) {
      try {
        const updatedBooking = { ...selectedBooking, startDate, endDate };
        const { data } = await axiosSecure.patch(`/update-booking-date/${selectedBooking._id}`, updatedBooking);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!!',
            text: 'Your booking dates have been updated.',
            icon: 'success',
          });
          fetchCounts();
          setShowModal(false);
        } else {
          Swal.fire('Error!', 'Unable to update the booking. Please try again.', 'error');
        }
      } catch (error) {
        toast.error('An error occurred while updating the booking.');
      }
    }
  };

  // Prepare data for Recharts
  const chartData = counts?.map((count) => ({
    name: count?.carModel,
    price: count?.price,
    date: new Date(count?.bookingDate).toLocaleDateString('en-GB').replace(/\//g, '-'),
  }));

  return (
    <div className="p-4">
      <Helmet>
        <title>My Bookings | Car Rental</title>
      </Helmet>
      <h2 className="text-2xl text-center font-semibold mb-4">My Bookings</h2>
      {counts.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-lg font-semibold">You have no bookings yet.</p>
          {/* Link to available cars */}
          <Link
            to="/available-cars"
            className="inline-block text-white bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg text-center mt-4"
          >
            Available Cars
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-center">
                  <th className="py-3 px-4 border-b">Car Image</th>
                  <th className="py-3 px-4 border-b">Car Model</th>
                  <th className="py-3 px-4 border-b">Booking Date</th>
                  <th className="py-3 px-4 border-b">End Date</th>
                  <th className="py-3 px-4 border-b">Total Price</th>
                  <th className="py-3 px-4 border-b">Booking Status</th>
                  <th className="py-3 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {counts?.map((count) => (
                  <tr key={count?._id} className="border-b hover:bg-gray-50 text-center">
                    <td className="py-3 px-4">
                      <img
                        src={count?.carImage}
                        alt={count?.carModel}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="py-3 px-4">{count?.carModel}</td>
                    <td className="py-3 px-4">
                      {new Date(count?.bookingDate).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }).replace(",", "")}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(count?.endDate).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }).replace(",", "")}
                    </td>
                    <td className="py-3 px-4">${count?.price}</td>
                    <td className="py-3 px-4">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${count?.bookingStatus?.status === 'pending' && ' bg-yellow-100/60 text-yellow-500'
                          } ${count?.bookingStatus?.status === 'confirmed' && ' bg-green-100/60 text-green-500'
                          } ${count?.bookingStatus?.status === 'canceled' && ' bg-red-100/60 text-red-500'}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${count?.bookingStatus?.status === 'pending' && 'bg-yellow-500'
                            } ${count?.bookingStatus?.status === 'confirmed' && 'bg-green-500'
                            } ${count?.bookingStatus?.status === 'canceled' && 'bg-red-500'}`}
                        ></span>
                        <h2 className="text-sm font-normal ">{count?.bookingStatus?.status}</h2>
                      </div>
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        className={`flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ${count?.bookingStatus?.status === 'confirmed' ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        onClick={() => handleCancelBooking(count?._id)}
                        disabled={count?.bookingStatus?.status === 'confirmed'}
                      >
                        <FaTrash />
                        Cancel
                      </button>
                      {count?.bookingStatus?.status !== 'confirmed' && count?.bookingStatus?.status !== 'canceled' && (
                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
                          onClick={() => handleConfirmBooking(count?._id)}
                        >
                          <GiConfirmed />
                          Confirm
                        </button>
                      )}
                      <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                        onClick={() => handleModifyDate(count)}
                      >
                        <FaCalendarAlt />
                        Modify Date
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-center mb-4">Daily Rental Prices</h3>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis dataKey="price" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Modal for modifying dates */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl text-center font-semibold mb-4">Modify Booking Dates</h3>
            <div className="mb-4">
              <label htmlFor="start-date" className="block mb-2">Start Date</label>
              <DatePicker
                id="start-date"
                selected={startDate}
                onChange={setStartDate}
                className="w-full p-2 border border-gray-300 rounded-md"
                dateFormat="dd-MM-yyyy"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="end-date" className="block mb-2">End Date</label>
              <DatePicker
                id="end-date"
                selected={endDate}
                onChange={setEndDate}
                className="w-full p-2 border border-gray-300 rounded-md"
                dateFormat="dd-MM-yyyy"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSaveDateChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
