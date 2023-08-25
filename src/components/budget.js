import Airtable from 'airtable';
import { useEffect, useState } from 'react';

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE)

const Budget = () => {
  const [categories, setCategories] = useState()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const records = await base('Budget').select({
      fields: ['Name', 'Cost']
    }).all()
  
    console.log(records);

    setCategories(records)
  } 

  return (
    <div>
      <h1 className='text-3xl font-bold'>Budget App</h1>
    </div>
  )
}

export default Budget