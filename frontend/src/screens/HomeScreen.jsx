import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useEffect } from 'react'
import { useParams} from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

const HomeScreen = () => {
  const dispatch = useDispatch()
  const { products, loading, error, pages, page } = useSelector(
    (state) => state.productList
  )
  const params = useParams()
  // const { keyword, pageNumber } = params
  const keyword = params.keyword
  const pageNumber = params.pageNumber || 1

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <h1>Latest Product</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}
export default HomeScreen
