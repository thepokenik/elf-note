import { Link } from 'react-router-dom';
import './css/app.css';
import TextEditor from './screen/components/TextEditor';

function App(): JSX.Element {

  return (
    <>
      <TextEditor />
      <Link to={"auth/login"}>
        <h1> Opaa </h1>
      </Link>
    </>
  )
}

export default App
