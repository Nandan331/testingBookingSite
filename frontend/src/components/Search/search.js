import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.css"
import "./search.css"
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import { useCheckDates } from "../../context/CheckDates";

function Search(){
    const {SetCheckDates, InDate, OutDate} = useCheckDates();
    const navigate = useNavigate();
    const [search, setSearch] = useState('')

    const HandlerTransfer = (e) => {
        e.preventDefault();
        navigate(`/hotelDetails/${search}`);
    }

    return (
        <>
        <div className="container formDivision" style={{display:'flex', justifyContent: 'center', width:'100%', maxWidth:'600px'}}>
            <form className="from-control d-flex flex-column align-items-center fromControls" onSubmit={HandlerTransfer}>
                <div className="input-group mb-3 mt-3">
                    <input 
                         className="form-control me-2 wide-search-input"
                         type="text" 
                         placeholder="Enter a destination" 
                         value={search}
                         onChange={ (e) => {
                            setSearch(e.target.value);
                         }}
                         required
                    />
                    <button className="btn btn-primary" type="submit">Search</button>
                </div>
                <div className="row g-2 mb-3" style={{display:'flex', justifyContent: "center", maxWidth:'600px'}}>
                    <div className="col">
                        <DatePicker
                           className="form-control"
                           selected={InDate}
                           onChange={(date) => {
                            const nextDay = new Date(date)
                            nextDay.setDate(nextDay.getDate() + 1);
                            SetCheckDates(date, OutDate && OutDate > date ? OutDate : nextDay)
                           }}
                           selectsStart
                           startDate={InDate}
                           endDate={OutDate}
                           minDate={new Date()}
                           placeholderText = 'CheckIn'
                           required

                        />
                    </div>
                    <div className="col">
                        <DatePicker
                           className="form-control"
                           selected={OutDate}
                           onChange={(date) => {
                            SetCheckDates(InDate, date)
                           }}
                           selectsEnd
                           startDate={InDate}
                           endDate={OutDate}
                           minDate={InDate || new Date()}
                           placeholderText = 'CheckOut'
                           disabled = {!InDate}
                           required
                        />
                    </div>
                </div>
            </form>
        </div>
        </>
    )
};
export default Search;