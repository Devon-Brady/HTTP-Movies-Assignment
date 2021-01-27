import React, {useState, useEffect} from 'react';
import {Route,useHistory, useParams} from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = () => {
    const {push} = useHistory();
    const {id} = useParams();
    const [mov, setMov] = useState({});
useEffect(() => {
    axios
    .get(`http://localhost:5000/api/movies/${id}`)
    .then(res =>{
        setMov(res.data);
    })
    .catch(err =>{
        console.log(err);
    })
},[])
   console.log(mov)
   const handleChange = (e)=> {
    e.persist();
     setMov({...mov,[e.target.name]:e.target.value})
   }
   const handleSubmit = (e)=>{
       e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`,mov)
        .then(res => {
            console.log(res);
            push(`/movies/${id}`) 
        })
        .catch(err =>{
            console.log(err);
        })
        
   }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='title'>Movie Title
                <input type='text' name='title' value={mov.title} onChange={handleChange}/>
            </label>
            <label htmlFor='director'>Director
                <input type='text' name='director' value={mov.director} onChange={handleChange}/>
            </label>
            <button>Submit</button>
        </form>
    )
}
export default UpdateMovie