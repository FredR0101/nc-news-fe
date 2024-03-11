import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header'
import ArticleList from './Components/ArticleList/ArticleList'

function App() {


  return (
    <>
    <Header/>
    <Routes>
      <Route path = "/" element={<ArticleList/>}/>
    </Routes>
    </>
  )
}

export default App
