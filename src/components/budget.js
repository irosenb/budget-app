import Airtable from 'airtable';
import { useEffect, useState } from 'react';
import CostForm from './costform';

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE)

const Budget = () => {
  const [categories, setCategories] = useState([])
  const [spent, setSpent] = useState(0)

  useEffect(() => {
    fetchCategories()
    fetchSpent()
  }, [])

  const fetchCategories = async () => {
    const records = await base('Categories').select({
      fields: ['Category', 'Budget'],
    }).all()
  
    console.log(records);

    setCategories(records)
  } 

  const fetchSpent = async () => {
    const expensesRecords = await base('Expenses').select({
      fields: ['Cost', 'Category']
    }).all()

    const expenses = expensesRecords.map(expense => expense.get('Cost'))

    const sum = expenses.reduce((partialSum, a) => partialSum + a, 0)

    console.log(sum)

    setSpent(sum)
  }

  return (
    <div className='container md:text-center w-3/4 mx-auto pt-10'>
      <h1 className='text-4xl md:text-7xl font-bold'>Budget App</h1>
      <Totals categories={categories} spent={spent}/>
      <CostForm categories={categories}/>
    </div>
  )
}

function Totals({categories, spent}) {
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

  const formattedSpent = spent.toLocaleString('en-US', {
    style: 'currency', 
    currency: 'USD'
  })

  const remaining = sum - spent

  const formattedRemaining = remaining.toLocaleString('en-US', {
    style: 'currency', 
    currency: 'USD'
  })

  return (
    <div className='pt-10'>
      <h2 className='text-2xl font-semibold'>Total Budget: {formattedAmount}</h2>
      <h2 className='text-2xl font-semibold'>Spent: {formattedSpent}</h2>
      <h2 className='text-2xl font-semibold'>Remaining: {formattedRemaining}</h2>
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