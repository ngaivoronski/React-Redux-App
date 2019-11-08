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
      <input name="breed" type="text" value={props.breed} onChange={breedChange}></input>
      <input name="amount" type="text" value={props.amount} onChange={amountChange}></input>
      <button onClick={() => getdata()}>Get Images!</button>
      {props.error && <p className="error">{props.error}</p>}
      <div>
        {props.images.map(image => (
          <img src={image}></img>
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
});

export default connect(
  mapStateToProps,
)(App);
