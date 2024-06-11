import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import axios from "axios";
import { toast } from 'react-toastify';

import { useParams, useNavigate } from "react-router-dom";

function EditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/listings/edit/${id}`
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/listings/edit/${id}`,
        formData
      );
      if (response.status === 200) {
        // alert("Listing updated successfully");
        toast.success('Listing updated successfully');
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      // alert("Failed to update listing");
      toast.error('Failed to update listing');
    }
  };

  return (
    <div className="row">
      <div className="col-8 offset-2">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label><b>Edit Movie Name</b></Form.Label>
            <Form.Control type="text" placeholder="Enter Movie Name" 
             name="title"
             value={formData.title}
             onChange={handleChange} />
            <Form.Text className="text-muted">
              Add The New Movie in Database.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label><b>Edit Description</b></Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter the Description of the Movie"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={8} 
              cols={50} 
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label><b>Edit the Image URL</b></Form.Label>
            <Form.Control type="url" placeholder="Upload the Movie Image"
            name="image"
            value={formData.image}
            onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
        
      </div>
    </div>
  );
}

export default EditForm;
