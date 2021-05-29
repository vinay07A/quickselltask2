import './components/Counter/counter.css';
import React,{useState,useEffect}from 'react';
import Counter from './components/Counter/counter';

const App = () =>{
  const [counterValue,setCounterValue] = useState(null);
  const [isDataReady,setIsDataReady] = useState(false);
  const [isUpdateLoader,setIsUpdateLoader] = useState(false);
  const MAX_VALUE=20;
  const MIN_VALUE=1;

  useEffect(()=>{
    console.log("call get counter api");
    fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counterValue.json')
      .then(response => response.json())
      .then(data => {
        data !=null ? setCounterValue(data) : setCounterValue(1);
        setIsDataReady(true);
      });
  },[])

  async function updateValue(value){
    setIsUpdateLoader(true)
    await fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json',{
      method:'put',
      headers:{'Content-Type': 'application/json'},
      body:JSON.stringify({counterValue:value})
    })
    .then(response => response.json())
    .then(data => {
      console.log("data",data.counterValue)
      setIsUpdateLoader(false);
      setCounterValue(data.counterValue);
    });

  }

  const handleInputChange = (evt)=>{
    let value = evt.target.value;
    if(isNaN(value)){
      alert("Input must be a number")
    }else if(parseInt(value) > MAX_VALUE){
      alert(`counterValue must be lessthan or equal to ${MAX_VALUE}`)
    }else{
      setCounterValue(evt.target.value)
      updateValue(evt.target.value);
    }
  }

  const doIncrement = (value) =>{
    if(++value > MAX_VALUE){
      alert(`counterValue must be lessthan or equal to ${MAX_VALUE}`)
      setCounterValue(--value)
      return;
    }else{
      updateValue(value)
    }
  }

  const doDecrement = (value) =>{
      if(--value < MIN_VALUE){
        alert(`counterValue must be greater then or equal to ${MIN_VALUE}`)
        setCounterValue(++value)
        return;
      }else{
        updateValue(value)
      }
  }

  return(
    isDataReady?
      <div className='container'>
        <Counter  
          isUpdateLoader={isUpdateLoader}
          counterValue={counterValue}
          handleInputChange={handleInputChange}
          doIncrement={doIncrement}
          doDecrement={doDecrement}
        />
      </div>
    :
      <div className='container'>Loading....</div>
  );
}

export default App;
