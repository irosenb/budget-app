import Airtable from "airtable";
import { useState } from "react";

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE)

const CostForm = ({categories}) => {
  const [cost, setCost] = useState(0)

  function submitCost(e) {
    e.preventDefault()
    
    // Get fields from form
    const form = new FormData(e.target)
    const entries = Object.fromEntries(form.entries())
    // Create expense object
    const expense = {Cost: parseInt(entries.Cost), Category: entries.Category}

    console.log(expense)
    
    // Create Expense in Airtable 
    base('Expenses').create(expense, function(err, records) {
      if (err) {
        console.error(err)
        return
      }
    })
  }

  // Filter out empty category names, sort alphabetically
  const names = categories.map(category => {
    return category.get('Category')
  }).filter( Boolean ).sort()

  return (
    <form className='mt-10' onSubmit={submitCost}>
      <h2 className='text-3xl mb-10 font-bold'>Enter Expense</h2>
      <div>
        <select name='Category' className="form-select">
          {
            names.map((name, index) => (<option key={index} value={name}>{name}</option>))
          }
        </select>
        <input className="form-input" name='Cost' type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder="Enter Cost"></input>
      </div>
      <div className="mt-10">
        <button className="rounded-lg font-bold text-lg px-6 py-6 text-white bg-purple-500  w-full md:w-1/2" type="submit">Submit</button>
      </div>
    </form>
  )
}

export default CostForm