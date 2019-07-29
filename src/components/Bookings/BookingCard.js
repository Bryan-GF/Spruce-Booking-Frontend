import React from 'react';

// Display card for the booking list component.
export const BookingCard = (props) => {
    return (
        <div className='bookingCard'>
           <p className='customer'>{props.bookingInfo.Name}</p>
            <p className='email'>{props.bookingInfo.Email}</p>
            {props.bookingInfo.Address ? 
                <p className='address'>{props.bookingInfo.Address}</p>
                :
                <div className='address'>
                    <p>{props.bookingInfo.Street_Address}</p>
                    <p>{props.bookingInfo.City}, {props.bookingInfo.State}, {props.bookingInfo.Zip_Code}</p>
                </div>  
            }
            <p className='bookingType'>{props.bookingInfo.Booking_Type}</p>
            <p className='bookingDateTime'>{props.bookingInfo.Booking_Time ? props.formatDate(props.bookingInfo.Booking_Time) : 'Booking Date/Time'}</p>
        </div>
    )
}