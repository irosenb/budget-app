
const CostForm = ({categories}) => {
  function submitCost(e) {
    e.preventDefault()
    console.log("Submitted!");
  }

  // Filter out empty category names, sort alphabetically
  const names = categories.map(category => {
    return category.get('Category')
  }).filter( Boolean ).sort()

  return (
    <form className='mt-10' onSubmit={submitCost}>
      <h2 className='text-3xl mb-10 font-bold'>Enter Expense</h2>
      <div>
        <select className="form-select">
          {
            names.map((name, index) => (<option key={index} value={name}>{name}</option>))
          }
        </select>
        <input className="form-input" type="number" placeholder="Enter Cost"></input>
      </div>
      <div className="mt-10">
        <button className="rounded-lg font-bold text-lg px-6 py-6 text-white bg-purple-500  w-full md:w-1/2" type="submit">Submit</button>
      </div>
    </form>
  )
}

export default CostForm