import Cookie from 'js-cookie';
import Head from 'next/Head';
import { useRouter } from 'next/Router';
import { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';

const Studentlogin = () => {
    const initialState = {id: ' '}
    const [studentData , setStudentData] = useState(initialState)
    const {id} = studentData

    const [state , dispatch] = useContext(DataContext)
    const { auth } = state

    const router = useRouter()

    const handleChangeInput = e => {
              const { name , value } = e.target
              setStudentData({...studentData, [name]: value}) 
              dispatch({ type: 'NOTIFY', payload: {} })
    }

    const handleSubmit = async e => {
              e.preventDefault()

            dispatch({ type: 'NOTIFY', payload: {loading: true}})

            const res = await postData('auth/studentlogin' , studentData)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err}});
            dispatch({ type: 'NOTIFY', payload: {success: res.msg}});

            console.log(res)

            dispatch({ type: 'AUTH', payload: {
              token: res.access_token,
              student: res.student,
              role: res.student.role
            }})

            Cookie.set('refreshtoken', res.refresh_token, {
              path: 'api/auth/accessToken',
              expires: 7
            })
          

            localStorage.setItem('firstLogin', true)

            console.log(auth.student)


            router.push('/result')


    }


    return (
        <div>
        <Head> 
         <title>Student sign in Page </title>
       </Head>
          

          <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">ID</label>
                <input type="id" className="form-control" name="id" value={id} onChange={handleChangeInput}/>
            </div>
            <button type="submit" className="btn btn-dark w-100" >Submit</button>
          </form>
     </div>
    )
}

export default Studentlogin