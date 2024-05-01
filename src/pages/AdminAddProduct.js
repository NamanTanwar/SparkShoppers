import React from 'react'
import AddProductForm from '../components/core/AdminAddProduct/AddProductForm'

const AdminAddProduct=()=>{
    return (
        <div>
            <div className='flex flex-row'>
                <h1 className="">Add Product</h1>
                <button>Add Product</button>
            </div>
            {/* form */}
            <AddProductForm />
        </div>
    )
}

export default AdminAddProduct