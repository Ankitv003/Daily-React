import React from 'react';
import ReactDOM from 'react-dom/client';
import Product from "./Product"
import productsData from "./data"

function App() {
  const [count, setCount] = React.useState(0)
  const [sort, setSort] = React.useState(false)

  function increment() {
    setCount(prevCount => prevCount + 1)
  }

  function decrement() {
    setCount(prevCount => prevCount - 1)
  }
  /**
   * NOTE: I recommend opening the dev tools performance tab and throttling
   * to a 6x slowdown to help highlight the delays that are happening with
   * the expensive "sort" method call on each render.
   */
  // Comment these 4 lines out when testing your solution below
  // const startTime1 = Date.now()
  // const sortedProducts = [...productsData].sort(
  //   (a, b) => a.name.localeCompare(b.name)
  // )
  // const endTime1 = Date.now()
  // console.log(`Took ${endTime1 - startTime1}ms`)

  const startTime2 = Date.now()

  const sortedProducts = React.useMemo(() => {
    return [...productsData].sort(
      (a, b) => a.name.localeCompare(b.name)
    )
  }, [productsData])

  const endTime2 = Date.now()
  console.log(`Took ${endTime2 - startTime2}ms`)

  const visibleProducts = sort ? sortedProducts : productsData

  return (
    <>
      <h1>The current count is {count}</h1>
      <button className="button" onClick={decrement}>-</button>
      <button className="button" onClick={increment}>+</button>
      <br />
      <br />
      <button
        className="button"
        onClick={() => setSort(prev => !prev)}
      >
        {sort ? "Unsort" : "Sort"}
      </button>
      <br />
      <br />
      <div className="products-list">
        {
          visibleProducts.map(product => (
            <Product key={product.id} product={product} />
          ))
        }
      </div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);