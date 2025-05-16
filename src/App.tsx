import { AuthProvider } from './context/AuthContext'
import Auth from './components/Auth'
import { Container } from '@mui/material'

function App() {
  
  return (
    <>
      <AuthProvider>
        <Container><Auth /></Container>
      </AuthProvider>
    </>
  )
}

export default App
