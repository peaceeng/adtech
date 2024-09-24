import { Link, useLocation } from 'react-router-dom';
import './NavLinks.css'

const RoutesForCustomer = () => {
    return (
        <ul className="nav">
            <li className='nav-link'><Link to="/">Home</Link></li> 
            <li className='nav-link'><Link to="/shop">Shop</Link> </li>
            <li className='nav-link'><Link to="/category/men">Men</Link></li> 
            <li className='nav-link'><Link to="/category/women">Women</Link></li> 
            <li className='nav-link'><Link to="/category/kids">Kids</Link></li>
        </ul>
    )
}

const RoutesForAdmin = () => {
    return (
        <ul className="nav">
            <li className='nav-link'><Link to="/">Home</Link></li> 
            <li className='nav-link'><Link to="/inventory">Inventory</Link></li> 
            <li className='nav-link selected'><Link to="/orders">Orders</Link> </li>
            <li className='nav-link'><Link to="/users">Users</Link></li>
        </ul>
    )
}

const NavLinks = () => {
    const location = useLocation();

    return ( 
            <nav className="nav__bottom__container">
                <div className="bottom__container">
                    {
                        location.pathname.startsWith("/admin") ? <RoutesForAdmin/> : <RoutesForCustomer/>
                    }
                </div>
            </nav>
     );
}
 
export default NavLinks;