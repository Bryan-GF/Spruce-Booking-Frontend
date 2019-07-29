import React from 'react';

// Header for the booking component, controls filter input and booking creator modal display.
export const BookingHeader = (props) => {
    return (
        <div className='bookingHeaderContainer'>
            <h2>Bookings</h2>
            <div className='headerInputs'>
                <form onSubmit={(ev) => {
                    ev.preventDefault();
                    props.getBookings(1)}}>
                    <input placeholder='Search by booking type...' value={props.filterValue} onChange={(ev) => {props.setFilterValue(ev.target.value)}}/>
                    <button>Search</button>
                </form>
                <button className='creatorButton' onClick={props.setCreatingBooking}>Create booking</button>
            </div>
        </div>
    )
}