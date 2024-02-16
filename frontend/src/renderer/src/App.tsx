import { Link } from 'react-router-dom';
import './css/app.css';

function App(): JSX.Element {

  return (
    <>
      <Link to={"auth/login"}>
        <h1>Hello World!</h1>
      </Link>
    </>
  )
}

export default App
