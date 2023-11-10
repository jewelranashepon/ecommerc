import React from 'react'

const FormatPrice = ({price}) => {
  return Intl.NumberFormat("en-BD",{
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price/100);
  
}

export default FormatPrice