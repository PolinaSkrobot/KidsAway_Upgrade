import React, { useState, useEffect } from "react";
import axios from "axios";
import PreviousOrderItem from "./PreviousOrderItem";


export default function PreviousOrderList(props) {
  // const [state, setState] = useState({
  
  //   previous: []
  // });
 
  // useEffect(()=>{
  //   return axios.get('/favourites', { params: { user_id: 1 } })
  //               .then((res)=>{
  //                 console.log("iii", res);
  //                 setState((prev)=>({...prev, previous: res.data}))
  //               })
  // },[setState.fav]);
  const filtered = props.orders.filter((order)=> order.status === 'completed')
    .sort((a,b)=> {return new Date(b.date) - new Date(a.date);});

  const previousOrders = filtered.map((order) => {
    return (
      <PreviousOrderItem
        id={order.sitter_id}
        date={order.date.slice(0,10)}
        name={order.sitter_name}
        photo={order.sitter_photo}
        comment={order.comment_about_sitter}
        rate={order.rate}
      />
    );
  });
  return (
    <div >
      {previousOrders}
    </div>
  )

};