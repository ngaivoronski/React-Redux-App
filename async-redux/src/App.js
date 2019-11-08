import React from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import axios from 'axios';
import './App.scss';


function App(props) {

  // NEW REDUX HOOKS CODE
  const dispatch = useDispatch();
  
  const getdata = () => {
    dispatch({type:"FETCHING_DATA"})
    axios.get(`https://dog.ceo/api/breed/${props.breed}/images/random/${props.amount}`)
    .then(response => {
      console.log(response);
      dispatch({type: "FETCH_SUCCESS", payload: response.data.message})
    })
    .catch(error => {
      console.log("this is the error:", error.response);
      dispatch({ type: "FETCH_FAIL", payload: error.response.data.message})
    })
  };

  const breedChange = event => {
    event.preventDefault();
    dispatch({ type: "BREED_CHANGE", payload: event.target.value})
  }

  const amountChange = event => {
    event.preventDefault();
    dispatch({ type: "AMOUNT_CHANGE", payload: event.target.value})
  }

  return (
    <div className="App">
      <h1>Dog Breed Visualiser</h1>
      <div className="dog-form">
        <label htmlFor="breed">Enter the breed: </label>
        <input name="breed" type="text" value={props.breed} onChange={breedChange} className="dog-input"></input>
        <label htmlFor="amount">Enter the amount: </label>
        <input name="amount" type="text" value={props.amount} onChange={amountChange} className="dog-input"></input>
        <button onClick={() => getdata()} className="dog-button">Get Images!</button>
      </div>
      {props.isFetching && <div>⏰</div>}
      {props.error && <p className="error">{props.error}</p>}
      <div className="dog-images">
        {props.images.map(image => (
          <img src={image} className="dog-img"></img>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  images: state.images,
  error: state.error,
  breed: state.breed,
  amount: state.amount,
  isFetching: state.isFetching,
});

export default connect(
  mapStateToProps,
)(App);
