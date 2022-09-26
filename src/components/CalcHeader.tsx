import React from 'react'

type CompProps = {
    sumValue: number;
    handelAddRow: any;
}

const CalcHeader: React.FC<CompProps> = ({ sumValue, handelAddRow }) => {
    return (
        <div className='calc_header'>
            <div className='h3'>RESULT:  <span>{sumValue}</span></div>
            <button type="button" className='btn btn-warning' onClick={handelAddRow}>Add row</button>
        </div>
    )
}

export default CalcHeader