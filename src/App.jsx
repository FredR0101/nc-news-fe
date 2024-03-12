import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header'
import ArticleList from './Components/ArticleList/ArticleList'
import ArticleData from './Components/ArticleData/ArticleData'

function App() {


  return (
    <>
    <Header/>
    <Routes>
      <Route path = "/" element={<ArticleList/>}/>
      <Route path="/articles/:article_id" element={<ArticleData/>}/>
    </Routes>
    </>
  )
}

export default App
