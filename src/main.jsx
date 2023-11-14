import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import '../src/styles/index.css'

import Home from './pages/Home';
import CadastrarMateria from './pages/CadastrarMateria';
import CadastrarProfessor from './pages/CadastrarProfessor';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cadastrar-materia",
    element: <CadastrarMateria />,
  },
  {
    path: "/cadastrar-professor",
    element: <CadastrarProfessor />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
