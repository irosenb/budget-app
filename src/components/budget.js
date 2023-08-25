import Airtable from 'airtable';
import { useEffect, useState } from 'react';

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE)

const Budget = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const records = await base('Budget').select({
      fields: ['Name', 'Cost'],
    }).all()
  
    console.log(records);

    setCategories(records)
  } 

  return (
    <div className='container'>
      <h1 className='text-3xl font-bold'>Budget App</h1>
      <BudgetTotals categories={categories}/>
    </div>
  )
}

function BudgetTotals({categories}) {
  // Retrieve costs from categories
  const costsArray = categories.map(category => {
    return category.get('Cost')
  })

  const sum = calculateSum(costsArray)

  // Formatted in USD
  const formattedAmount = sum.toLocaleString('en-US', {
    style: 'currency', 
    currency: 'USD'
  })

  return (
    <h1>Total Costs: {formattedAmount}</h1>
  )
}

function calculateSum(costs) {
  // filter undefined values from costs
  const filteredCosts = costs.filter(value => value !== undefined)

  // Sum costs
  return filteredCosts.reduce((accumulator, value) => accumulator + value, 0)
}

export default Budget