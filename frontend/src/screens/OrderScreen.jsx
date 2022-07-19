import { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = () => {
  const orderDetails = useSelector((state) => state.orderDetails)
  const { loading, orderItems, shippingAddress } = orderDetails
  const dispatch = useDispatch()
  const params = useParams()
  const { id } = params

  useEffect(() => {
    dispatch(getOrderDetails(id))
  }, [dispatch, id])
  return (
    <>
      <h1>Order Details</h1>
  
    </>
  )
}
export default OrderScreen
