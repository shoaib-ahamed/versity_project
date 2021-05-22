import Head from 'next/Head';
import { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import Result from './result';


const Profile = () => {
    const initialState = {course_id: ' ', id: ' ',quiz: ' ',mid: ' ' ,final: ' ' , attendance_mark: ' ', project_mark: ' ' , assignment_mark: ' ' , grade: ' ', clo: ' '}
    const [studentData , setStudentData] = useState(initialState)
    const { course_id, id,quiz  , mid , final , attendance_mark ,project_mark, assignment_mark, grade, clo} = studentData;

    const  [ state, dispatch ]  = useContext(DataContext)

    const { auth } = state

    const role= [auth.role]
    

    const handleChangeInput = e => {
        const { name , value } = e.target
        setStudentData({...studentData, [name]: value}) 
        dispatch({ type: 'NOTIFY', payload: {} })
}

const handleSubmit = async e => {
    e.preventDefault()

    dispatch({ type: 'NOTIFY', payload: {loading: true}})

    const res = await postData('profile/updated' , studentData)

    if (res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err}});

    return dispatch({ type: 'NOTIFY', payload: {success: res.msg}});

    
}

    return (
       

        <div>
             <Head> 
              <title>Profile</title>
            </Head>
            <h1>STUDENT GRADE SHEET</h1>

            { role == 'teacher'?
                <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Course ID</label>
                    <input type="section_name" className="form-control" name="course_id" value={course_id} onChange={handleChangeInput}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">ID</label>
                    <input type="section_name" className="form-control" name="id" value={id} onChange={handleChangeInput}/>
                </div>

                <div className="mb-3">
            
                    <label htmlFor="exampleInputPassword1" className="form-label">quiz</label>
                    <input type="quiz" className="form-control" name="quiz" value={quiz} onChange={handleChangeInput}/> 
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">mid</label>
                    <input type="mid" className="form-control" name="mid" value={mid} onChange={handleChangeInput}/> 
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">final</label>
                    <input type="final" className="form-control" name="final" value={final} onChange={handleChangeInput}/> 
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Attendance Mark</label>
                    <input type="final" className="form-control" name="attendance_mark" value={attendance_mark} onChange={handleChangeInput}/> 
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Project Mark</label>
                    <input type="final" className="form-control" name="project_mark" value={project_mark} onChange={handleChangeInput}/> 
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Assignment Mark</label>
                    <input type="final" className="form-control" name="assignment_mark" value={assignment_mark} onChange={handleChangeInput}/> 
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Enter Grade</label>
                    <input type="final" className="form-control" name="grade" value={grade} onChange={handleChangeInput}/> 
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">CLO</label>
                    <input type="final" className="form-control" name="clo" value={clo} onChange={handleChangeInput}/> 
                </div>

                <button type="submit" className="btn btn-dark w-100">Submit</button>
        </form>
        :  
        <Result/>
        
        }
        </div>

        
    )
}

export default Profile