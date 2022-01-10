import Header from '../components/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cards from '../components/Cards'
import Loading from '../components/Loading'
const Series = (props) => {
  const [isLoading,setIsLoading] = useState(true);

  const apiKey = 'k_0nug4wnp'//'k_gcprl00i'
  const titleType = 'tv_series'
  const [resultat, setResultat] = useState([])
  useEffect(()=>{
    axios.get(`https://imdb-api.com/API/AdvancedSearch/${apiKey}?title_type=${titleType}&genres=${props.emojiSelected.correspondance}&count=100`)
      .then((response)=>response.data)
      .then((data)=>{setResultat(data.results);
        setIsLoading(false);});
  },[])
  return(
  <div>
    <Header emojiSelected={props.emojiSelected} setEmojiSelected={props.setEmojiSelected}/>
    <div className='movie-grid'>
      {resultat.map(element => (
        <Cards
          title={element.title}
          poster={element.image}
          description={element.description}
        />
      ))}
    </div>
    {isLoading?<Loading />:""}
  </div>
  )
}

export default Series
