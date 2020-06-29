import React from 'react';
import './form-input.styles.css';

const FormInput = ({label,handleChange,...otherProps}) => (
    <div className='form-input'>
        <label className='formlabel'>{label}</label>
        <br/>
        <input className='forminput' {...otherProps} onChange={handleChange}/>
    </div>
)

export default FormInput;