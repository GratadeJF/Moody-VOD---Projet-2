import Cards from '../components/Cards'
import Header from '../components/Header'
import { useEffect, useState } from 'react'
import './Catalogue.css'
import Footer from '../components/Footer'
import Loading from '../components/Loading'
import axios from 'axios'
import useModal from '../components/useModale'
import CardFilm from '../components/CardFilm'

const Catalogue = props => {
  const { isShowing, toggle } = useModal()

  const [isLoading, setIsLoading] = useState(false)
  const apiKey = process.env.REACT_APP_API_KEY
  const titleType = 'movies&tv_series'
  
  const [isActive, setIsActive] = useState(false)
  const retourFunc = () => {
    toggle()
    setIsActive(!isActive)
  }
  const [getProps, setGetProps] = useState([])
  const [getDetails, setGetDetails] = useState({})

  let dataAPI = [] 

  /***************** APPEL API GENERAL *******************/
  useEffect(() => {
    const appelAPI = () => {
      setIsLoading(true)
      console.log('test correspondance 1', props.emojiSelected.correspondance);
      axios
        .get(
          `https://api.themoviedb.org/3/discover/movie?api_key=430fd4a9e11f41d3009ea74bba3edc1a&with_genres=${props.emojiSelected.correspondance}&language=fr-FR&page=1`
        )
        .then(response => response.data)
        .then(data => {
          props.setResultat(data.results)
          setIsLoading(false)
        })
      console.log('BAITED')
      
    }
    appelAPI()
  }, [props.emojiSelected.correspondance])


  /*************** Appel API Details Film ****************************/
  useEffect(() => {
    const appelAPIFilm = () => {
        fetch(`https://api.themoviedb.org/3/movie/${getProps.id}?api_key=430fd4a9e11f41d3009ea74bba3edc1a&language=fr-FR`)
        .then(res => res.json())
        .then(res => {
          setGetDetails(res)
        })
    }
    isShowing && appelAPIFilm()
  }, [isShowing])

  return (
    <div className='catalogPage'>
      <div className='catalogContainer'>
        <CardFilm
          getProps={getProps}
          isShowing={isShowing}
          hide={toggle}
          retourFunc={retourFunc}
          getDetails={getDetails}
        />

        <Header
          className='headerband'
          emojiSelected={props.emojiSelected}
          setEmojiSelected={props.setEmojiSelected}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <div className={isActive ? 'none' : 'movie-grid'}>
            {props.resultat.map(element => (
              <Cards
                key={element.key}
                toggle={toggle}
                isShowing={isShowing}
                setIsActive={setIsActive}
                setGetProps={setGetProps}
                getProps={getProps}
                data={element}
              />
            ))}
          </div>
        )}

        <Footer />
      </div>
    </div>
  )
}  

export default Catalogue
