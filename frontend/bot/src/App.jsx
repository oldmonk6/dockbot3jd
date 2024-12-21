import { useState } from 'react'

import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import { HomePage } from './components/homepage'
import { Chatbot } from './components/chatbot'
import { Upload } from './components/documentupload'
import { Signin } from './components/signin'
import { Signup } from './components/signup'
import { Landing } from './components/landing'

function App() {
 return <div>
       <BrowserRouter>
       <Routes>
       <Route path='/' element={<Landing/>}/>
       <Route path='/signin' element={<Signin/>}/>
       <Route path='/signup' element={<Signup/>}/>
        <Route path='/homepage' element={<HomePage/>}/>
        <Route path='/chat' element={<Chatbot/>}/>
        <Route path='/upload' element={<Upload/>}/>

       
       </Routes>
       </BrowserRouter>
 </div>
}

export default App
