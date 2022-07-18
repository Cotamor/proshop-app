import { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const { shippingAddress } = useSelector((state) => state.cart)
  const navigate = useNavigate()
  if (!shippingAddress) {
    navigate('/shipping')
  }

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='payment'>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            /> */}
          </Col>
        </Form.Group>

        <div className='d-grid'>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  )
}
export default PaymentScreen
