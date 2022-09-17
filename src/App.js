import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Pagination from './Pagination';
import PokemonList from './PokemonList';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancel
    const fetchData = async () => {
      try {
        setLoading(true)
        let response = await axios.get(currentPageUrl, {
          cancelToken: new axios.CancelToken(c => cancel = c)
        })
        setLoading(false)
        setNextPageUrl(response.data.next)
        setPrevPageUrl(response.data.previous)
        setPokemon(response.data.results.map(p => p.name))
        // console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();

    return () => cancel()

  }, [currentPageUrl])

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }


  if (loading) return "Loading......"
  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </> 
  );
}

export default App;
