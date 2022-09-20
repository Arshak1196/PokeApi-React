import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from './Header';
import Pagination from './Pagination';
import PokemonList from './PokemonList';
import './style.css'

function App() {
  console.log(process.env.POKEAPI)
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState(process.env.REACT_APP_POKEAPI)
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
        setPokemon(response.data.results)
        console.log(response)
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
  function gotoFirstPage(){
    setCurrentPageUrl(process.env.REACT_APP_POKEAPI)
  }


  if (loading) return "Loading......"
  return (
    <>
      <Header gotoFirstPage={gotoFirstPage} />
      <PokemonList pokemon={pokemon} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
