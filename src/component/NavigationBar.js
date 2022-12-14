import React from 'react';
import './navigationBar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

function NavigationBar() {
    return (
      <div className="navBar">
       
            <div className='logo-div'>
                <ShoppingCartIcon className='logo' />
                <label>upGard E-shop</label>
            </div>
            <div className="search-div">
              <div class="form-group has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input type="text" class="form-control" placeholder="Search"/>
            </div> 
            </div>

            <div>
              <ul>
                  <li>
                    <a href='#'>Home</a>
                  </li>
                  <li>
                    <a href='#'>Add Product</a>
                  </li>
                  <li>
                    <button className='login'>LOGIN</button>
                  </li>
              </ul>
            </div>

      </div>
    );
  }
  
  export default NavigationBar;