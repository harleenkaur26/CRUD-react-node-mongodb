import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

function CreateForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/listings/new', formData);
      if (response.status === 201) {
        toast.success('Listing created successfully');
        navigate("/");
        setFormData({
          title: '',
          description: '',
          image: ''
        });
      }
    } catch (error) {
      console.error('Error creating listing:', error);
      toast.error('Failed to create listing');
    }
  };




  return (

    <div className="row">
      <div className="col-8 offset-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Enter Movie Name</b></Form.Label>
            <Form.Control 
              type="text" 
              name="title" 
              placeholder="Enter Movie Name" 
              value={formData.title} 
              onChange={handleChange} 
              required
            />
            <Form.Text className="text-muted">
              Add The New Movie in Database.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label><b>Description</b></Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter The Description Of The Movie"
              name="description"
              value={formData.description} 
              onChange={handleChange} 
              rows={8} 
              cols={50} 
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label><b>Upload the Image URL</b></Form.Label>
            <Form.Control 
              type="url" 
              placeholder="Paste The Movie Image URL Here" 
              name="image" 
              value={formData.image} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateForm;
