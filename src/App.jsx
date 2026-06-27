import { BrowserRouter,Routes,Route,Navigate } from "react-router-dom";
import {useEffect,useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import CadastroVeiculo from './pages/CadastroVeiculo/CadastroVeiculo';
import Estoque from './pages/Estoque/Estoque';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';
const Private=({children,user})=> user? children:<Navigate to='/login'/>;
export default function App(){
 const [user,setUser]=useState(JSON.parse(localStorage.getItem('usuarioLogado')));
 const [veiculos,setVeiculos]=useState([]); const [veiculoEditando,setVeiculoEditando]=useState(null);
 useEffect(()=>{ if(user){setVeiculos(JSON.parse(localStorage.getItem('veiculos_'+user.email)||'[]'))}},[user]);
 useEffect(()=>{ if(user){localStorage.setItem('veiculos_'+user.email,JSON.stringify(veiculos))}},[veiculos,user]);
 return <BrowserRouter>{user && <Navbar/>}<Routes>
 <Route path='/login' element={<Login onLogin={setUser}/>}/>
 <Route path='/cadastro-usuario' element={<Register/>}/>
 <Route path='/' element={<Private user={user}><Home/></Private>}/>
 <Route path='/cadastro' element={<Private user={user}><CadastroVeiculo veiculos={veiculos} setVeiculos={setVeiculos} veiculoEditando={veiculoEditando} setVeiculoEditando={setVeiculoEditando}/></Private>}/>
 <Route path='/estoque' element={<Private user={user}><Estoque veiculos={veiculos} setVeiculos={setVeiculos} setVeiculoEditando={setVeiculoEditando}/></Private>}/>
 </Routes></BrowserRouter>
}
