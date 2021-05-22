import Cookie from 'js-cookie';
import Link from 'next/Link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { DataContext } from '../store/GlobalState';

const Navbar = () => {
   const router = useRouter()
   const [state, dispatch] = useContext(DataContext)

   const { auth } = state



   const handleLogout = () => {
      Cookie.remove('refreshtoken', {path: 'api/auth/accessToken'})
      localStorage.removeItem('firstLogin')
      dispatch({ type: 'AUTH', payload: {} })
      dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} })
      return router.push('/')
  }


   const loggedRouter = () => {
      return(
          <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               menu      
          </a>

             {
                auth.role=='teacher' ?
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link href="/profile">
                    <a className="dropdown-item">Profile</a>
                </Link>
                <Link href="/plomapping">
                   <a className="dropdown-item">Plo mappping</a>
                </Link>

                 <button className="dropdown-item" onClick={handleLogout}>Logout</button>
           </div> 
           :   <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
               <Link href="/result">
                     <a className="dropdown-item">Profile</a>
               </Link>
               <button className="dropdown-item" onClick={handleLogout}>Logout</button>
               </div> 
             }
          </li>
      )
  }

    return (
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link  href="/">
               <a className="navbar-brand">Versity</a>
            </Link>

            <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown" style= {{justifyContent: 'end'}}>
               <ul className="navbar-nav p-1">
                  {
                        Object.keys(auth).length === 0 
                        ? <li className="nav-item">
                           <Link href="/signin">
                              <a className={"nav-link"}>
                                    <i className="fas fa-student" aria-hidden="true"></i> Faculty sign in
                              </a>
                           </Link>
                           <Link href="/studentLogin">
                              <a className={"nav-link"}>
                                    <i className="fas fa-student" aria-hidden="true"></i>Student sign in
                              </a>
                           </Link>
                        </li>
                        : loggedRouter()
                  }
               </ul>
            </div>

      </nav>
    )
}

export default Navbar