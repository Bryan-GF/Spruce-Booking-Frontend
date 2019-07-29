import React, {useState, useEffect, useRef, useReducer} from 'react';
import {BookingHeader} from './BookingHeader';
import {BookingList} from './BookingsList';
import {BookingModal} from './BookingModal';
import axios from 'axios';

import './Booking.scss';

// Initial state of the local booking data retrieval reducer.
const initialState = {
    bookings: [],
    gettingBookings: 2, // Indicators: 0 = Failure 1 = Success, 2 = Processing  
    currPage: 1,
    totalPages: 1
}

// Local reducer, to handle all changes when retrieving booking data.
const reducer = (state, action) => {
    switch (action.type) {
      case 'GETTING_BOOKINGS': 
        return { ...state, gettingBookings: 2, currPage: action.payload};
      case 'GETTING_BOOKINGS_SUCCESS': 
        return { ...state, 
                        gettingBookings: 1,
                        bookings: action.payload.bookings,
                        totalPages: action.payload.totalPages
                };
      case 'GETTING_BOOKINGS_FAILURE': 
        return { ...state, gettingBookings: 0};
      default: return state;
    }
};

const apiBaseURL = 'https://spruce-api.herokuapp.com';

//Functional component for all booking sub components.
const Bookings = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    // Filter Value
    const [filterValue, setFilterValue] = useState('');

    // Modal display control
    const [creatingBooking, setCreatingBooking] = useState(false);

    // New Booking Content (Chose to break them up, to remove the expense of cloning and unecessary updating).
    const [Email, setEmail] = useState('');
    const [Name, setName] = useState('');

        //Address Info
        const [Street_Address, setStreetAddress] = useState('');
        const [City, setCity] = useState('');
        const [State, setState] = useState('');
        const [Zip_Code, setZipCode] = useState('');

    const [Type, setType] = useState('');
    const [BookingDate, setBookingDate] = useState(null);
    const [Time, setTime] = useState(null);

    const node = useRef();

    // Converts input date from the modal and converts it into mysql readable timestamp.
    const getDate =() => {
        let dateArr = BookingDate.split('/');
        let timeArr = Time.split(/[ :]+/)
        let hours = timeArr[2] === 'PM' ? `${parseInt(timeArr[0]) + 12}` : (parseInt(timeArr[0]) > 9 ? timeArr[0] : `0${timeArr[0]}`);
        let date = `${dateArr[2]}-${dateArr[0]}-${dateArr[1]} ${hours}:${timeArr[1]}:00`;
        return date;
    }


    // Takes in event object as a parameter. Submits the input data from the modal to the API. Closes Modal.
    const submitBooking = (ev) => {
        ev.preventDefault();
        setCreatingBooking(!creatingBooking);
        let Booking_Time = getDate();
        axios.post(apiBaseURL + '/createBooking', 
        {Email, Name, Street_Address, City, State, Zip_Code, Booking_Type: Type, Booking_Time}
        ).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })      
    }


    // Takes in event object as a parameter. Checks location of each click, for click away handling. If outside of creator modal will set creatingBooking to false.
    const handleClick = e => {
        if (node.current.contains(e.target)) {
          // inside click
          return;
        }
        setCreatingBooking(false);
      };


    // Takes in the index value of the new page. Makes call to API to retrieve booking data according to the active page. 
    const getBookings = async(newPage) => {
        dispatch({ type: 'GETTING_BOOKINGS', payload: newPage });

        const params ={
            page: newPage,
            limit: 20,
            filter: filterValue
        }

        axios.get(apiBaseURL + '/getBookings', {params})
        .then(res => {
            dispatch({ type: 'GETTING_BOOKINGS_SUCCESS', payload: 
                { 
                    bookings: res.data.results,
                    totalPages: res.data.totalPages,              
                } 
            });
        }).catch(err=> {
            // Use zero as an indicator of failure.
            dispatch({ type: 'GETTING_BOOKINGS_FAILURE' });
        })
    }

    // Takes in the timestamp for the booking. Format the booking timestamp for bookings in the booking card component.
    const formatDate = (timestamp) => {
        let date = new Date(timestamp).toLocaleDateString(undefined, {
            day:'numeric',
            month: 'long',
            year: 'numeric',
        })
    
        let time = new Date(timestamp).toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: '2-digit'
        })
        
        return date + ' at ' + time;
    }


    useEffect(() => {
        getBookings(state.currPage);

        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
                
    }, []);


    return (
        <div className='bookingMainContainer'>
            <BookingHeader 
                setCreatingBooking={setCreatingBooking}
                setFilterValue={setFilterValue}
                filterValue={filterValue}
                getBookings={getBookings}
            />
            {state.gettingBookings === 2 ?
                <div>Loading</div>
                :
                (state.gettingBookings === 1 ?
                    <BookingList bookings={state.bookings} formatDate={formatDate}/>
                    :
                    <div>Failed to retrieve bookings.</div>
                )   
            }
            <div className='paginationButtonsWrapper'>
                {state.currPage > 1 ?
                    <div className='paginationButton' onClick={() => getBookings(state.currPage - 1)}>
                        <div class="arrow-left"></div>
                    </div>
                :
                    null
                }
                {state.currPage < state.totalPages ? 
                    <div className='paginationButton' onClick={() => getBookings(state.currPage + 1)}>
                        <div class="arrow-right"></div>
                    </div>
                :
                    null
                }
            </div>
            <BookingModal 
                creatingBooking={creatingBooking} 
                reference={node}
                submitBooking={submitBooking}
                setEmail={setEmail}
                setName={setName}
                setStreetAddress={setStreetAddress}
                setCity={setCity}
                setState={setState}
                setZipCode={setZipCode}
                setType={setType}
                setDate={setBookingDate}
                setTime={setTime}
            />
        </div>
    )
}

export default Bookings;