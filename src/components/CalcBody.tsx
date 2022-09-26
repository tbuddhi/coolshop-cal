import React, { useState, useRef } from 'react'
import CalcHeader from './CalcHeader';

interface inputArrayType {
    operator: string;
    value: number;
    status: boolean;
}

const initValues: inputArrayType[] = [
    { operator: '+', value: 0, status: true },
    { operator: '+', value: 0, status: true }
]

const CalcBody = () => {
    const [inputArray, setInputArray] = useState(initValues)
    const totalCalc = useRef(0)

    // Handle input and option onChange event
    const handleOnChange = (index: number, operator: string, value: number) => {
        let newArray = [...inputArray]
        newArray[index].operator = operator
        newArray[index].value = Number(operator + Math.abs(value))

        setInputArray(newArray)
        totalCalc.current = calcTotal(newArray, 'value')
    }

    // Calculate the total
    const calcTotal = (items: any, prop: any) => {
        return items.filter((item: any) => item.status === true).reduce((a: any, b: any) => {
            return a + b[prop];
        }, 0);
    }

    // Handle adding new row item
    const handelAddRow = () => {
        setInputArray([...inputArray, { operator: '+', value: 0, status: true }])
    }

    // Handle deleting row item
    const handleDelete = (index: number) => {
        let newArray = inputArray.filter((_item, idx) => idx !== index)

        setInputArray(newArray)
        totalCalc.current = calcTotal(newArray, 'value')
    }

    // Handle disabled input element
    const handleDisable = (index: number) => {
        let newArray = [...inputArray]
        let disabledItemIndex = inputArray.findIndex((_item, idx) => idx === index)
        newArray[disabledItemIndex].status = !newArray[disabledItemIndex].status

        setInputArray(newArray)
        totalCalc.current = calcTotal(newArray, 'value')
    }

    return (
        <div className="row">
            <h1>Simple React Calculator</h1>
            <div className="calc_wrapper ">

                <CalcHeader sumValue={totalCalc.current} handelAddRow={handelAddRow} />

                <div className="calc_body">
                    <ul>
                        {inputArray && inputArray.map((val, index) => (
                            <li key={index} id={'id' + index}>
                                <div className="row mb-3 mb-md-2">
                                    <div className="col-sm-2">
                                        <select
                                            className="form-select"
                                            defaultValue={val.operator}
                                            onChange={e => handleOnChange(index, e.target.value, val.value)}
                                        >
                                            <option>+</option>
                                            <option>-</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <input
                                            min={0}
                                            className="form-control"
                                            disabled={!val.status}
                                            type="number"
                                            value={Math.abs(val.value)}
                                            onChange={e => handleOnChange(index, val.operator, Number(e.target.value))}
                                        />
                                    </div>
                                    <div className="col-sm-4 calc_btn-wrapper btn-group">
                                        <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                                        <button
                                            className={`btn btn-secondary ${!val.status ? 'inactive' : ''}`}
                                            onClick={() => handleDisable(index)}
                                        >
                                            {val.status ? 'Disable' : 'Enable'}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CalcBody