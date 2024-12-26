import React from "react";
import { createContext, useContext, useState } from "react";

const checkDates = createContext();
function CheckDates( {children} ){
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    

    // const [InDate, setInDate] = useState(null);
    // const [OutDate, setOutDate] = useState(null);
    const [InDate, setInDate] = useState(today);
    const [OutDate, setOutDate] = useState(tomorrow);

    // const SetCheckDates = ( checkInDate, checkOutDate ) => {
    //     setInDate(checkInDate);
    //     setOutDate(checkOutDate);
    // }

    const SetCheckDates = ( checkInDate, checkOutDate ) => {
        let adjustDate;
        if(!checkOutDate || checkOutDate <= checkInDate){
            adjustDate = new Date(checkInDate);
            adjustDate.setDate(adjustDate.getDate() + 1);
        }else{
            adjustDate = checkOutDate
        }
        setInDate(checkInDate);
        setOutDate(checkOutDate);
    };

    return (
        <>
        <checkDates.Provider value={{InDate, OutDate, SetCheckDates}}>
            {children}
        </checkDates.Provider>
        </>
    )
};
export default CheckDates;
export const useCheckDates = () => useContext(checkDates);

