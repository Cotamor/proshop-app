import { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const { user, loading, error } = useSelector((state) => state.userDetails)
  const { userInfo } = useSelector((state) => state.userLogin)
  const { success } = useSelector((state) => state.userUpdateProfile)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [navigate, userInfo, user, dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('update')
    dispatch(updateUserProfile({ id: user._id, name, email, password }))
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {success && <Message variant='info'>Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='email' className='mb-3'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='password' className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='mb-3'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <div className='d-grid'>
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </div>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>Your Orders</h2>
      </Col>
    </Row>
  )
}
export default ProfileScreen
