import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { AuthProvider } from './context/AuthContext'
import Auth from './components/Auth'
import { Container } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider>
        <Container><Auth /></Container>
      </AuthProvider>
    </>
  )
}

export default App
