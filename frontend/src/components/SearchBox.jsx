import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('submit')
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} className='d-flex my-2'>
      <Form.Control
        type='text'
        name='q'
        // value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Product'
        className='me-sm-2 ms-sm-5'
      ></Form.Control>
      <Button type='submit' className='p-2' variant='outline-success'>
        Search
      </Button>
    </Form>
  )
}
export default SearchBox
