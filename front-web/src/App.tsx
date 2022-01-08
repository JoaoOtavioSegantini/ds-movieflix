import './core/assets/styles/custom.scss'
import './app.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Routes from './Routes'

function App() {
  return (
    <div data-testid="App">
      <Routes />
      <ToastContainer />
    </div>
  )
}

export default App
