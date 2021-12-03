import React from "react";
import PreviousOrderItemSitter from "./PreviousOrderItemSitter";


export default function PreviousOrderListSitter(props) {

  const completed = props.orders.filter((order)=> order.status === 'completed')//display only completed orders in DESC order
    .sort((a,b)=> {return new Date(b.date) - new Date(a.date);});

  const previousOrders = completed.map((order) => {
    return (
      <PreviousOrderItemSitter
      id={order.id}
        date={order.date.slice(0,10)}
        name={order.parent_name}
        comment={order.comment_about_parent}
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