import Cookie from 'js-cookie';
import Head from 'next/Head';
import Link from 'next/Link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';

function Signin() {
    const initialState = {id: '' , password: ''}
    const [teacherData , setTeacherData] = useState(initialState)
    const {id, password} = teacherData

    const [state , dispatch] = useContext(DataContext)
    const { auth } = state

    const router = useRouter()

    const handleChangeInput = e => {
              const { name , value } = e.target
              setTeacherData({...teacherData, [name]: value}) 
              dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleSubmit = async e => {
              e.preventDefault()

            dispatch({ type: 'NOTIFY', payload: {loading: true}})

            const res = await postData('auth/login' , teacherData)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err}});
            dispatch({ type: 'NOTIFY', payload: {success: res.msg}});


            router.push('profile')

            dispatch({ type: 'AUTH', payload: {
              token: res.access_token,
              teacher: res.teacher,
              role: res.teacher.role
            }})
            
            Cookie.set('refreshtoken', res.refresh_token, {
              path: 'api/auth/accessToken',
              expires: 7
            })
          

            localStorage.setItem('firstLogin', true)
    }

    useEffect(() => {
      if(Object.keys(auth).length !== 0) router.push("/")
    }, [auth])

    return (
       <div>
             <Head> 
              <title>Sign in Page </title>
            </Head>
           

            <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">ID</label>
                        <input type="id" className="form-control" name="id" value={id} onChange={handleChangeInput}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={handleChangeInput}/> 
                    </div>
                    <button type="submit" className="btn btn-dark w-100">Submit</button>
                    <p className="my-2">You dont have any account yet? 
                        <Link href="/register"><a style={{color: 'crimson'}}>  Register now.</a></Link>
                    </p>
            </form>
          </div>
    );
}

export default Signin;
