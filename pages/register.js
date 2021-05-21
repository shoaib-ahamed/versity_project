import Head from 'next/Head';
import Link from 'next/Link';
import { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import valid from './../utils/valid';

const Register = () => {
    const initialState = {id: ' ' , password: ' ' , cf_password: ' '}
    const [teacherData , setTeacherData] = useState(initialState)
    const { id, password , cf_password ,  } = teacherData;

    const  [state, dispatch]  = useContext(DataContext)

    const handleChangeInput = e => {
        const { name, value } = e.target
        setTeacherData({...teacherData, [name]: value}) 
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const errMsg = valid(id , password, cf_password)
        if(errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg}})

        dispatch({ type: 'NOTIFY', payload: {loading: true}})

        const res = await postData('auth/register' , teacherData)

       if (res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err}});

       return dispatch({ type: 'NOTIFY', payload: {success: res.msg}});
    }

    return (
        <div>
             <Head> 
              <title>Register Page </title>
            </Head>
           

            <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">ID</label>
                        <input type="id" className="form-control" name='id' value={id} onChange={handleChangeInput}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={password} onChange={handleChangeInput}/> 
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm password</label>
                        <input type="password" className="form-control" name='cf_password' value={cf_password} onChange={handleChangeInput}/> 
                    </div>
                    <button type="submit" className="btn btn-dark w-100">Submit</button>
                    <p className="my-2">You can Login now.
                        <Link href="/"><a style={{color: 'crimson'}}> Login now.</a></Link>
                    </p>
            </form>
          </div>
    )
}

export default Register