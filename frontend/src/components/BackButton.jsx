import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const BackButton = ({ url }) => {
  return (
    <Link to={url} className='btn btn-light my-3'>
      <FaArrowAltCircleLeft /> Go Back
    </Link>
  )
}
export default BackButton
