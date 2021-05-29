import CounterDisplay from './counterDisplay';
import './counter.css';

const Counter = ({isUpdateLoader,counterValue,handleInputChange,doIncrement,doDecrement}) =>{
    return(
        <div className='counter-container'>
            {isUpdateLoader ? <span className='counter-loading'>saving counter value...</span>: null}
            <div className='counter-details'>
                <div className='counter-button-left' onClick={() => doDecrement(counterValue)}>
                    <p>-</p>
                </div>
                <div className='counter-input'>
                    <input type='text' value={counterValue} onChange={(e) => handleInputChange(e)}/>
                </div>
                <div className='counter-button-right' onClick={() => doIncrement(counterValue)}>
                    <p>+</p>
                </div>
            </div>
            <CounterDisplay counterValue={counterValue}/>
        </div>
    )
}

export default Counter;