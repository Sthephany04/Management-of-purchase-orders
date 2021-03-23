import React from 'react';

const DetailItem = ({title, text}) => {
  return(
    <div className="containerItems">
      <h5>{title} </h5> 
      <p>{text}</p>
    </div>
  )
} 

export default DetailItem;
