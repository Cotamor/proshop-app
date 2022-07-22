import axios from 'axios'
import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import BackButton from '../components/BackButton'
import { listProductDetails, updateProduct } from '../actions/productActions'
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_RESET,
} from '../constants/productConstants'

const ProductEditScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  )
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { id } = params

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      dispatch({ type: PRODUCT_DETAILS_RESET })
      navigate('/admin/productlist')
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id))
      } else {
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
      }
    }
  }, [dispatch, navigate, product, id, successUpdate])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    // Update Product
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
      })
    )
  }

  return (
    <>
      <BackButton url='/admin/productlist' />
      <FormContainer>
        <h2>Edit Product</h2>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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

            <Form.Group controlId='price' className='mb-3'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='description' className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='image' className='mb-3'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control
                type='file'
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand' className='mb-3'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='category' className='mb-3'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='countInStock' className='mb-3'>
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type='number'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <div className='d-grid'>
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  )
}
export default ProductEditScreen
