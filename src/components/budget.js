import Airtable from 'airtable';
import { useEffect, useState } from 'react';
import CostForm from './costform';

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE)

const Budget = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const records = await base('Categories').select({
      fields: ['Category', 'Budget'],
    }).all()
  
    console.log(records);

    setCategories(records)
  } 

  return (
    <div className='container md:text-center w-3/4 mx-auto pt-10'>
      <h1 className='text-4xl md:text-7xl font-bold'>Budget App</h1>
      <Totals categories={categories}/>
      <CostForm categories={categories}/>
    </div>
  )
}

function Totals({categories}) {
  // Retrieve costs from categories
  const costsArray = categories.map(category => {
    return category.get('Budget')
  })

  const sum = calculateSum(costsArray)

  // Formatted in USD
  const formattedAmount = sum.toLocaleString('en-US', {
    style: 'currency', 
    currency: 'USD'
  })

  return (
    <div className='pt-10'>
      <h2 className='text-2xl font-semibold'>Total Budget: {formattedAmount}</h2>
      <h2 className='text-2xl font-semibold'>Spent: </h2>
    </div>
  )
}

function calculateSum(costs) {
  // filter undefined values from costs
  const filteredCosts = costs.filter(value => value !== undefined)

  // Sum costs
  return filteredCosts.reduce((accumulator, value) => accumulator + value, 0)
}

export default Budget