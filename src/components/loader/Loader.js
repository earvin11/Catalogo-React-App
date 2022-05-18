import { Spinner } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import './loader.css'

export const Loader = () => {
  return (
    <div className="divPadre">
      <div className="divHijo">
        <Spinner color='primary' />
      </div>
    </div>
  )
}
