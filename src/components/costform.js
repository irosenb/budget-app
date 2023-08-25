
const CostForm = ({categories}) => {
  // Filter out empty category names, sort alphabetically
  const names = categories.map(category => {
    return category.get('Name')
  }).filter( Boolean ).sort()

  return (
    <form className='mt-10'>
    <h1 className='text-3xl font-bold'>Cost Form</h1>
    <select>
      {
        names.map(name => {
          return <option value={name}>{name}</option>
        })
      }
    </select>
    <input type="number" placeholder="Enter Cost"></input>
    </form>
  )
}

export default CostForm