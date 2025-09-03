import React from 'react'

export default function page() {
  
  return (
    <div>
      <form>
        <input type="text" name="title" placeholder="عنوان آگهی" required />
        <textarea name="content" placeholder="توضیحات" required />
        <input type="number" name="price" placeholder="قیمت" />
      <select name="category">
        
      </select>
      <button type="submit">ثبت آگهی</button>
      </form>
    </div>
  )
}

