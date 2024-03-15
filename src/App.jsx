import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './Components/Header/Header'
import ArticleList from './Components/ArticleList/ArticleList'
import ArticleData from './Components/ArticleData/ArticleData'
import UserList from './Components/Users/UserList'
import UserContext from './Components/Contexts/User'

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "Guest",
    name: "Guest1",
    avatar_url: "https://t3.ftcdn.net/jpg/06/03/30/74/360_F_603307418_jya3zntHWjXWn3WHn7FOpjFevXwnVP52.jpg"
  })


  return (
    <UserContext.Provider value={{loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser}}>
    <Header/>
    <Routes>
      <Route path = "/" element={<ArticleList/>}/>
      <Route path="/articles/:article_id" element={<ArticleData/>}/>
      <Route path="/articles/topic/:topic" element={<ArticleList/>}/>
      <Route path="/users" element={<UserList/>}/>
      
    </Routes>
    </UserContext.Provider>
  )
}

export default App
