import Header from '../components/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cards from '../components/Cards'
import Loading from '../components/Loading'
const Series = (props) => {
  const [isLoading,setIsLoading] = useState(true);

  const apiKey=process.env.REACT_APP_API_KEY;
  return(
  <div>
    <Header emojiSelected={props.emojiSelected} setEmojiSelected={props.setEmojiSelected}/>
    <div className='movie-grid'>
      {props.resultat.filter((element)=> element.description.includes('–')).map(element => (
        <Cards
          title={element.title}
          poster={element.image}
          description={element.description}
        />
      ))}
    </div>
    {console.log(props.resultat)}
    {isLoading?<Loading />:""}
  </div>
  )
}

export default Series
