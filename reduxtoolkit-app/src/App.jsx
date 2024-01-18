import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount } from './store/slices/counter'
import reactLogo from './assets/react.svg'
// eslint-disable-next-line import/no-absolute-path
import viteLogo from '/vite.svg'
import './App.css'

function App () {
  const { counter } = useSelector(state => state.counter)
  const dispatch = useDispatch()

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>
        count is {counter}
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className='card'>
          <button onClick={() => dispatch(increment())}>
            Increment
          </button>
        </div>
        <div className='card'>
          <button onClick={() => dispatch(decrement())}>
            Decrement
          </button>
        </div>
        <div className='card'>
          <button onClick={() => dispatch(incrementByAmount(10))}>
            Increment by 10
          </button>
        </div>
      </div>
    </>
  )
}

export default App
