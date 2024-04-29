import React, { useReducer, useCallback, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const combinedCounterReducer = (state, action) => {
  switch (action.type) {
    case 'SetCount':
      return { ...state, count: action.count };
    case 'IncrementCount':
      return { ...state, count: state.count + 1 };
    case 'DecrementCount':
      return { ...state, count: state.count - 1 };
    case 'SetMyCount':
      return { ...state, My_Count: action.My_Count };
    case 'IncrementMyCount':
      return { ...state, My_Count: state.My_Count + 1 };
    case 'DecrementMyCount':
      return { ...state, My_Count: state.My_Count - 1 };
    default:
      return state;
  }
};


const CounterContext = React.createContext();


const Home = () => {
  const { state } = useContext(CounterContext);

  return (
    <div>
      <h1>Counter Value: {state.count}</h1>
      <h1>My_Counter Value: {state.My_Count}</h1>
      <Link to="/counter">Counter</Link>
      <br/>
      <Link to="/myCounter">MyCounter</Link>
    </div>
  );
};

const Counter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const fetchCounter = useCallback(async () => {
    try {
      const response = await axios.get('https://hook-react.vercel.app/api/counter');
      dispatch({ type: 'SetCount', count: response.data.count });
    } catch (err) {
      console.error('Error fetching counter:', err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCounter();
  }, [fetchCounter]);

  const incrementCounter = useCallback(async () => {
    try {
      await axios.post('https://hook-react.vercel.app/api/counter/increment');
      dispatch({ type: 'IncrementCount' });
    } catch (err) {
      console.error('Error incrementing counter:', err);
    }
  }, [dispatch]);

  const decrementCounter = useCallback(async () => {
    try {
      await axios.post('https://hook-react.vercel.app/api/counter/decrement');
      dispatch({ type: 'DecrementCount' });
    } catch (err) {
      console.error('Error decrementing counter:', err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {state.count}</p>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};


const MyCounter = () => {
  const { state, dispatch } = useContext(CounterContext);
  const navigate = useNavigate();

  const fetchMyCounter = useCallback(async () => {
    try {
      const response = await axios.get('https://hook-react.vercel.app/api/counter');
      dispatch({ type: 'SetMyCount', My_Count: response.data.count1 });
    } catch (err) {
      console.error('Error fetching MyCounter:', err);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMyCounter();
  }, [fetchMyCounter]);

  const incrementMyCounter = useCallback(async () => {
    try {
      await axios.post('https://hook-react.vercel.app/api/counter/my-increment');
      dispatch({ type: 'IncrementMyCount' });
    } catch (err) {
      console.error('Error incrementing MyCounter:', err);
    }
  }, [dispatch]);

  const decrementMyCounter = useCallback(async () => {
    try {
      await axios.post('https://hook-react.vercel.app/api/counter/my-decrement');
      dispatch({ type: 'DecrementMyCount' });
    } catch (err) {
      console.error('Error decrementing MyCounter:', err);
    }
  }, [dispatch]);

  return (
    <div>
      <h2>MyCounter</h2>
      <p>My_Count: {state.My_Count}</p>
      <button onClick={incrementMyCounter}>Increment</button>
      <button onClick={decrementMyCounter}>Decrement</button>
      <button onClick={() => navigate('/')}>Go Back to Home</button>
    </div>
  );
};


const App = () => {
  const [state, dispatch] = useReducer(combinedCounterReducer, { count: 0, My_Count: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/counter">Counter</Link>
              </li>
              <li>
                <Link to="/myCounter">MyCounter</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/counter" element={<Counter />} />
            <Route path="/myCounter" element={<MyCounter />} />
          </Routes>
        </div>
      </Router>
    </CounterContext.Provider>
  );
};

export default App;
