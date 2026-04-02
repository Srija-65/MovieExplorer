import {useState,useEffect} from "react"
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import "./fetch.css"

function Fetchh(){
    const[data,setData]=useState([]);
    const[btnId,setBtnId]=useState(null);
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState(false);
    const[search,setSearch]=useState("")

    useEffect(()=>{
        setLoading(true);
        axios("https://api.tvmaze.com/shows")
        .then(
            res=>{setData(res.data);
            setLoading(false)
        }
        )
        .catch(()=>{
            setLoading(false);
            setError(true)}
        )
    },[])
    function Conditional(){
        if(loading){
             return  <div className="msg">
                             <p>items are loading.please wait ....</p>
                     </div>
        }
        else if(error){
             return  <div className="msg">
                             <p>there is an error ....</p>
                     </div>
        }
        else if(btnId){
            return <div className="ifContainer">
                <button className="backBtn" onClick={() => setBtnId(null)}>
                <FaArrowLeft />
               </button>
                <img src={btnId.image?.medium} alt="movie "></img>
                <div className="alldetails">
                <h2>movie:{btnId.name}</h2>
               <h3>Language:{btnId.language}</h3>
                <h4>Rating:{btnId.rating?.average}</h4>
                {/* summary:{btnId.summary} */}
                 <div className="description" dangerouslySetInnerHTML={{ __html: btnId.summary }}></div>
                </div>
            </div>
        }
        else{
               let matching= data.filter(da=>da.name.toLowerCase().includes(search.trim().toLowerCase()))
                if(matching.length==0&&search.trim().length!=0){
                  return  <div className="msg">
                          <p>no matches found</p>
                  </div>
                }
                 else{
                return matching.map((d)=>(
               <div key={d.id} className="container">
                 <img src={d.image?.medium} alt="movie "></img>
                 <h2>movie:{d.name}</h2>
                 <h3>Language:{d.language}</h3>
                 <h4>Rating:{d.rating?.average}</h4>
                 <button className="viewBtn" onClick={
                 ()=>{setBtnId(d)}}>view more</button>
                </div>
                 ))  
                }
                
             
        }
        }



        return(
        <div className="parent">
           <input placeholder="enter the movie name" onChange={(e)=>{setSearch(e.target.value)}}/>
            {Conditional()}
        </div>     
        )
    }
export default Fetchh