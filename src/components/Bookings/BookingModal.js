import React from 'react';
import './Booking.scss';


// Modal for booking creation.
export const BookingModal = (props) => {
    return (
        <div style={{display: (props.creatingBooking ? 'block' : 'none')}} className='bookingModalContainer'>
            <div ref={props.reference} className='bookingCreatorWrapper'>
                <h2>Create booking</h2>
                <form className='bookingForm' method="post" onSubmit={(ev) => {
                    ev.preventDefault();
                    props.submitBooking(ev)
                    
                }}>
                    <div className='bookingFormInputs'>
                        <div className='leftSideCreator'>

                            <label>
                                Name
                                <input 
                                    name='Name'
                                    type='text'
                                    onChange={(ev)=> {props.setName(ev.target.value)}}
                                    required
                                />
                            </label>

                            <label>
                                Email
                                <input 
                                    name='Email'
                                    type='text'
                                    onChange={(ev)=> {props.setEmail(ev.target.value)}}
                                    required

                                />
                            </label>

                            <label>
                                Street_Address
                                <input 
                                    name='Street_Address'
                                    type='text'
                                    onChange={(ev)=> {props.setStreetAddress(ev.target.value)}}
                                    required
                                />
                            </label>

                            <label>
                                City
                                <input 
                                    name='City'
                                    type='text'
                                    onChange={(ev)=> {props.setCity(ev.target.value)}}
                                    required
                                />
                            </label>
                            <div className='halfInputsWrapper'>
                                <label>
                                    State
                                    <input 
                                        name='State'
                                        type='text'
                                        className='halfInput'
                                        onChange={(ev)=> {props.setState(ev.target.value)}}
                                        required
                                    />
                                </label>

                                <label>
                                    Zip Code
                                    <input 
                                        name='Zip_Code'
                                        type='text'
                                        className='halfInput'
                                        onChange={(ev)=> {props.setZipCode(ev.target.value)}}
                                        required
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='rightSideCreator'>

                            <label>
                                Booking Type
                                <select
                                    required
                                    name='Booking_Type'
                                    className='arrows'
                                    onChange={(ev)=> {props.setType(ev.target.value)}}
                                >
                                    <option value=''>Select a Service</option>
                                    <option value='Housekeeping'>Housekeeping</option>
                                    <option value='Dog Walk'>Dog Walk</option>
                                </select>
                            </label>

                            <label>
                                Booking Date
                                <input 
                                    name='Booking_Date'
                                    type='text'
                                    onChange={(ev)=> {props.setDate(ev.target.value)}}
                                    required
                                />
                            </label>

                            <label>
                                Booking Time
                                <input 
                                    name='Booking_Time'
                                    type='text'
                                    onChange={(ev)=> {props.setTime(ev.target.value)}}
                                    required
                                />
                            </label>

                        </div>
                    </div>
                    <div className='creatorButtonMove'>
                        <button className='creatorButton'>Create boooking</button>
                    </div>
                </form>
                
            </div>
        </div>
    )
}