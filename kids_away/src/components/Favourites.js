import React, { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import axios from "axios";
import ItemFavourites from "./ItemFavourites";
import "./ItemFav.scss"
import Navbar from './Navbar'


export default function Favourites(props) {
  const [state, setState] = useState({
  
    fav: []
  });
  const cookies=new Cookies()
  const user = cookies.get('user_id');
  console.log("User:", user);
  useEffect(()=>{
    return axios.get('/favourites', { params: { user_id: "1" } })
                .then((res)=>{
                  console.log("iii", res);
                  setState((prev)=>({...prev,fav: res.data}))
                })
  },[setState.fav]);

  const arr = state.fav.map((sitter) => {
    return (
      <ItemFavourites
        key={sitter.id}
        name={sitter.first_name}
        photo={sitter.photo}
      />
    );
  });
  return (
    <div>  
      <Navbar/>
    <div className='container_fav'>
      
      {arr}
    </div>
    </div>
  )

};