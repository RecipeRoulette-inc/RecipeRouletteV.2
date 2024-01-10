import React, {useState, useEffect } from "react";
const { DropDownTreeComponent } = require('@syncfusion/ej2-react-dropdowns');
const ReactDOM = require('react-dom');
import './dropdown.css'
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1JpQXxbf1xzZFdMYFRbQXVPIiBoS35RdURjW3dfdHRdQ2NYVEN1');



function DropDown() {
    const [inputs, setInputs] = useState([]);

    const handleDropDownChange = (args) => {
        setInputs(args.value); // Update the state with selected values
        console.log(inputs)
    };

    // const updateAllergies = () => {
        
    // }

    // useEffect(() => {
    //     handleDropDownChange();
    //   }, []);


    let data = [
        { id: 1, name: 'Dairy' },
        { id: 2, name: 'Egg' },
        { id: 3, name: 'Gluten' },
        { id: 4, name: 'Grain' },
        { id: 5, name: 'Peanut' },
        { id: 6, name: 'Seafood' },
        { id: 7, name: 'Sesame' },
        { id: 8, name: 'Shellfish' },
        { id: 9, name: 'Soy' },
        { id: 10, name: 'Sulfite' },
        { id: 11, name: 'Tree Nut' },
        { id: 12, name: 'Wheat' },
    ];
    let fields = { dataSource: data, value: 'id', text: 'name' };
    return (
        <DropDownTreeComponent id="dropdowntree" fields={fields} showCheckBox={true} value={inputs} change={handleDropDownChange} placeholder='Select allergy intolerances' />
    )
}

export default DropDown;
