import React from 'react';
import "./ItemFav.scss"
import { FavoriteBorderOutlined , EmailOutlined } from '@mui/icons-material';

export default function ItemFavourites(props) {
return (
  <main className='item_fav'>
    <div className='fav'>
    <header className='head_item_fav'>
      {props.name}
    </header>
    <div className='middle_item_fav'>
      <div >
        <img src={props.photo} className='photo'></img>
      </div>
      <div>
      <EmailOutlined color="secondary" fontSize="large" />
      <FavoriteBorderOutlined color="secondary" fontSize="large" />
      </div>
    </div>
    </div>
</main>
)
}