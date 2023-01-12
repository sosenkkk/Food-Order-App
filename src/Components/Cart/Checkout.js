import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const Checkout = (props) => {
  const [formInputValidity, setformInputValidity] = useState({
    name:true,
    street: true,
    city: true,
    postal: true
  });
  const nameInputRef= useRef();
  const nameStreetRef= useRef();
  const namePostalRef= useRef();
  const nameCityRef= useRef();

  const isEmpty=(value)=>value.trim()==='';
  const isFiveChars=value=>value.trim().length ===6;
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName= nameInputRef.current.value;
    const enteredCity= nameCityRef.current.value;
    const enteredPostal= namePostalRef.current.value;
    const enteredStreet= nameStreetRef.current.value;
    
    const enteredNameIsValid= !isEmpty(enteredName);
    const enteredCityIsValid= !isEmpty(enteredCity);
    const enteredPostalisValid= isFiveChars(enteredPostal);
    const enteredStreetisValid= !isEmpty(enteredStreet);

    setformInputValidity({
      name:enteredNameIsValid,
      street:enteredStreetisValid,
      city:enteredCityIsValid,
      postal:enteredPostalisValid,
    });
   

    const formisValid= enteredCityIsValid && enteredNameIsValid && enteredPostalisValid && enteredStreetisValid;
    if(!formisValid){
      return;
    }
    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      city:enteredCity,
      postal: enteredPostal
    });
  }
    const nameClasses= `${classes.control} ${formInputValidity.name ? '': classes.invalid}`;
    const cityClasses= `${classes.control} ${formInputValidity.city ? '': classes.invalid}`;
    const streetClasses= `${classes.control} ${formInputValidity.street ? '': classes.invalid}`;
    const postalClasses= `${classes.control} ${formInputValidity.postal ? '': classes.invalid}`;
    
    

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid Name.</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street'  ref={nameStreetRef} />
        {!formInputValidity.street && <p>Please enter a valid Street.</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal'  ref={namePostalRef}/>
        {!formInputValidity.postal && <p>Please enter a valid Postal Code.</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city'  ref={nameCityRef} />
        {!formInputValidity.city && <p>Please enter a valid City.</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;