import Head from 'next/Head';
import { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';


const Plomapping = () => {
    const initialState = {plo: ' ',clo1: ' ',clo2: ' ', clo3: ' ', clo4: ' ', clo5: ' ', clo6: ' '}
    const [ploMappingData , setPloMappingData] = useState(initialState)
    const {plo ,clo1, clo2, clo3, clo4, clo5, clo6} = ploMappingData;

    const  [state, dispatch]  = useContext(DataContext)

    const {auth} = state


    const handleChange = async e => {
        const { name, value } = e.target
        setPloMappingData({...ploMappingData, [name]: value}) 
    }



    const handleSubmit = async e => {
        e.preventDefault();
         console.log(ploMappingData)
        
         dispatch({ type: 'NOTIFY', payload: {loading: true}})

         const res = await postData('postplodata' , ploMappingData)
 
        if (res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err}});
 
        return dispatch({ type: 'NOTIFY', payload: {success: res.msg}});

    }

    return(
        <div>

            <Head> 
              <title>PLO MAPPING PAGE </title>
            </Head>
            
           <form className="mx-auto my-4" style={{maxWidth: '500px'}} onSubmit={handleSubmit}> 

           {/* <select className="form-select" aria-label="Default select example">
                <option selected>Select section from here</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select> */}

                <h3>for PLO 1 : {plo}</h3>

                 <div className="form-check form-switch">

                    <label className="form-check-label clo" htmlFor="flexSwitchCheckDefault" >CLO1</label>
                    <br></br>
                    <input type="plo" className="form-control"   name='clo1' value={clo1} onChange={handleChange}/>
                </div>

                <div className="form-check form-switch">
                    <label className="form-check-labe clol" htmlFor="flexSwitchCheckChecked">CLO2</label>
                    <br></br>
                    <input type="plo" className="form-control"  placeholder="enter yes"  name='clo2' value={clo2} onChange={handleChange}/>
                </div>

                <div className="form-check form-switch">
                    <label className="form-check-label clo" htmlFor="flexSwitchCheckDefault" >CLO3</label>
                    <br></br>
                    <input type="plo" className="form-control"  placeholder="enter yes" name='clo3' value={clo3} onChange={handleChange}/>
                </div>

                <div className="form-check form-switch">
                    <label className="form-check-label clo" htmlFor="flexSwitchCheckDefault" >CLO4</label>
                    <br></br>
                    <input type="plo" className="form-control"  placeholder="enter yes" name='clo4' value={clo4} onChange={handleChange}/>
                </div> 

                <div className="form-check form-switch">
                    <label className="form-check-label clo" htmlFor="flexSwitchCheckDefault" >CLO5</label>
                    <br></br>
                    <input type="plo" className="form-control"  placeholder="enter yes"  name='clo5' value={clo5} onChange={handleChange}/>
                </div> 
                
                <div className="form-check form-switch">
                    <label className="form-check-label clo" htmlFor="flexSwitchCheckDefault" >CLO6</label>
                    <br></br>
                    <input type="plo" className="form-control"  placeholder="enter yes" name='clo6' value={clo6} onChange={handleChange}/>
                </div> 

                <br></br>

                <button type="submit" className="btn btn-dark w-100">Submit</button>

           </form>

                
        </div>
    )
}

export default Plomapping 

