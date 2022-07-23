import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = () => {
  const { orders, loading, error } = useSelector((state) => state.orderList)
  const { userInfo } = useSelector((state) => state.userLogin)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // preventing from showing this page for anybody except admin
    if (!userInfo && !userInfo.isAdmin) {
      navigate('/login')
    } else {
      dispatch(listOrders())
    }
  }, [dispatch, navigate, userInfo])

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}
export default OrderListScreen
