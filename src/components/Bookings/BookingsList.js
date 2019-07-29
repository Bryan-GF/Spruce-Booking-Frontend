import React from 'react';
import {BookingCard} from './BookingCard';

// Booking list display.
export const BookingList = (props) => {

    return (
        <div className='bookingListContainer'>
            <div className='bookingListHeader'>
                <BookingCard bookingInfo={{Name: 'Customer', Email: 'Email', Address: 'Address', Booking_Type: 'Booking Type', Time: 'Booking Date/Time' }}/>
            </div>
            {props.bookings.length > 0 ? 
                props.bookings.map(booking => {
                    return (
                        <BookingCard key={booking.Id} bookingInfo={booking} formatDate={props.formatDate}/>
                    )
                    })
                :
                <div>No bookings found.</div>
            }
        </div>
    )
}