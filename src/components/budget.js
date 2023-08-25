import Airtable from 'airtable';
import { useState } from 'react';

const base = new Airtable({apiKey: process.env.REACT_APP_AIRTABLE_KEY}).base(process.env.REACT_APP_AIRTABLE_BASE)

const Budget = () => {
  const [categories, setCategories] = useState()

  return (
    <div>
      <h1>Budget App</h1>
    </div>
  )
}

export default Budget