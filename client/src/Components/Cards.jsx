import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import './style.css';
import { toast } from "react-toastify";

function Cards() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
      const fetchListings = async () => {
          try {
              const response = await axios.get('http://localhost:8080/listings'); 
              setListings(response.data);
          } catch (error) {
              console.error('Error fetching listings:', error);
          }
      };

      fetchListings();
  }, []);

  
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };
 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/listings/${id}`);
      // Remove the deleted listing from the state
      setListings(listings.filter(listing => listing._id !== id));
      toast.success('Listing deleted successfully');
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Failed to delete listing');
    }
  };

  return (
    <div className="row row-cols-lg-4 row-cols-md-3 row-cols-lg-2" id="outer-div">
      {listings.map((eachData, index) => (
        <div className=" card row listing-card">
          {/* <Link to="/show" style={{textDecoration:'none'}}> */}
          <Card className="crd-body" id="card-mobile">
            <Card.Img  style={{height:'54vh',width:'50px',objectFit:'cover'}} id="cardimg" variant="top" src={eachData.image} />
            <Card.Body>
              <Card.Title><b>{eachData.title}</b></Card.Title>
              <Card.Text><i> {eachData.description} </i></Card.Text>
              <div className="btns">
              <Button variant="success" onClick={() => handleEdit(eachData._id)}>Edit</Button>{'    '}
              <Button variant="danger" onClick={() => handleDelete(eachData._id)}>Delete</Button>
              </div>
            </Card.Body>
            
          </Card>
          {/* </Link> */}
        </div>
      ))}
    </div>
  );
}

export default Cards;



