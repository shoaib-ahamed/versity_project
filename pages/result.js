import { useContext } from 'react';
import { DataContext } from '../store/GlobalState';

const Result = () => {
    const  [ state, dispatch ]  = useContext(DataContext)

    const {auth} = state

    

    return(
            <div>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">course_id</th>
                        <th scope="col">quiz</th>
                        <th scope="col">mid</th>
                        <th scope="col">final</th>
                        <th scope="col">grade</th>
                        <th scope="col">clo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{auth.student.course_id}</td>
                        <td>{auth.student.quiz}</td>
                        <td>{auth.student.mid}</td>
                        <td>{auth.student.final}</td>
                        <td>{auth.student.grade}</td>
                        <td>{auth.student.clo}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    )
}

export default Result;