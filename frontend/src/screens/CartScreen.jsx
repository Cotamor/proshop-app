import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useLocation } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { addToCart } from '../actions/cartActions'

const CartScreen = () => {
  const { cartItems } = useSelector((state) => state.cart)
  console.log(cartItems)

  const params = useParams()
  const productId = params.id
  const location = useLocation()
  const qty = Number(new URLSearchParams(location.search).get('qty'))
  const dispatch = useDispatch()

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  return (
    <div>
      id:{productId} qty:{qty}
    </div>
  )
}
export default CartScreen
