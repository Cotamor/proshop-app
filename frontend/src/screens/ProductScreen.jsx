import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useParams, useNavigate, Link } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Meta from '../components/Meta'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { addToCart } from '../actions/cartActions'

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const { product, error, loading } = useSelector(
    (state) => state.productDetails
  )
  const { userInfo } = useSelector((state) => state.userLogin)
  const {
    error: errorProductReview,
    loading: loadingProductReview,
    success: successProductReview,
  } = useSelector((state) => state.productCreateReview)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    if (successProductReview) {
      alert('Review Submitted')
      setRating(0)
      setComment('')
    }

    dispatch(listProductDetails(id))
  }, [dispatch, id, successProductReview])

  // Fix solution from Q&A
  const addToCartHandler = () => {
    // navigate(`/cart/${id}?qty=${qty}`)
    dispatch(addToCart(product._id, qty))
    navigate('/cart')
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(createProductReview(id, { rating, comment }))
  }

  return (
    <>
      <BackButton url='/' />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />

          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Stock:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? 'In Stock'
                            : 'Out of Stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button
                        type='button'
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successProductReview && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingProductReview && <Loader />}
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group className='mb-3' controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          required
                          as='textarea'
                          rows={3}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <div className='d-grid'>
                        <Button
                          disabled={loadingProductReview}
                          type='submit'
                          variant='primary'
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
export default ProductScreen
