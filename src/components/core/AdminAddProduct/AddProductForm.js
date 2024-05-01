import React,{useState,useEffect} from 'react'
import {ColorPicker,useColor} from 'react-color-palette'
import "react-color-palette/css";
import { useDispatch } from 'react-redux';
import { getSuperCategories } from '../../../services/operations/categoryAPI';
import { useSelector } from 'react-redux';
import ImageUpload from './ImageUpload';
import { createProduct } from '../../../services/operations/productAPI';


const AddProductForm=()=>{
    
    const dispatch=useDispatch()

    const [formData,setFormData]=useState({
        name: '',
        description: '',
        category: '',
        superCategory: '',
        cost: 0,
        quantity: 0,
        brand: '',
        sizeOption: [],
        weightOption: [],
        gender: null,
        colorOption: [],
        images: [],
    })

    const {superCategories}=useSelector((state)=>state.category)

    const [selectedImages,setSelectedImages]=useState([])
    const [loading,setLoading]=useState(false)
    const [color,setColor]=useColor('')
    const [colorList,setColorList]=useState([])
    const [size,setSize]=useState('')
    const [sizeList,setSizeList]=useState([])
    const [weight,setWeight]=useState('')
    const [weightList,setWeightList]=useState([])
    const [isGenderApplicable,setIsGenderApplicable]=useState(false)
    const [gender, setGender] = useState(null); 
    const [selectedCategory,setSelectedCategory]=useState(null)

    const handleSuperCategoryChange=(e)=>{
        setSelectedCategory(e.target.value)
        setFormData((prevData)=>({
            ...prevData,
            superCategory: e.target.value
        }))
    }

    const fetchSuperCategories=async ()=>{
        dispatch(getSuperCategories())
        return
     }
  
     useEffect(()=>{
        fetchSuperCategories()
     },[])


    const handleGenderChange = (gender) => {
        setGender(gender);
      };
    
      const handleGenderApplicability = (isApplicable) => {
        setIsGenderApplicable(isApplicable);
      };
    

    const handleWeightChange=(e)=>{
        setWeight(e.target.value)
    }

    const addToWeightList=(e)=>{
        e.preventDefault()
        if(weight!=='' && !weightList.includes(weight)){
            setWeightList((prevList)=>[...prevList,weight])
            setWeight('')
        }
    }

    const removeFromWeightList=(idx)=>{
        setWeightList((prevList)=>prevList.filter((_,i)=>i!==idx))
        setFormData((prevData)=>({
            ...prevData,
            weightOption: weightList
        }))
    }


    const handleSizeChange=(e)=>{
       // console.log(e.target.value)
        setSize(e.target.value)
    }

    const addColor=(e)=>{
       e.preventDefault()
        console.log(color)
        let newColor=color.hex
        console.log(newColor)
        if(!colorList.includes(newColor)){
            setColorList((prevList)=>[...prevList, newColor])
        }
       setFormData((prevData)=>({
        ...prevData,
        colorOption: colorList
       }))
    }

    const addToSizeList=(e)=>{
        e.preventDefault()
        //console.log(size)
        if(size!==''){
            let inputSize=size.trim().toUpperCase()
            console.log(inputSize)
            setSizeList(prevSizeList => [...prevSizeList, inputSize])
        }
        setSize('')
        setFormData((prevData)=>({
            ...prevData,
            sizeOption: sizeList
        }))
    }

    const removeFromSizeList=(idx)=>{
        setSizeList((prevList)=>prevList.filter((_,i)=>i!==idx))
        setFormData((prevData)=>({
            ...prevData,
            sizeOption: sizeList
        }))
    }

    const handleSubmit=async (e)=>{

        e.preventDefault()

        // const productOptions={
        //     sizeOption: sizeList,
        //     colorOption: colorList,
        //     weightOption: weightList,
        //     genderOption: gender,
        // }

        // console.log('Product options here:',productOptions)

        // console.log('Selected Images here:',selectedImages)

        // setFormData((prevData) => ({
        //     ...prevData,
        //     images: selectedImages,
        //     productOptions: { ...productOptions },
        // }), () => {
        //     console.log('formData updated:', formData); // Access the updated formData here
        //     // Perform actions based on the updated formData
        // });

        console.log('Form Data in handle Submit:',formData)

        setLoading(true)
        try{
            const productResponse=await createProduct(formData)
            console.log('Product response:',productResponse)
            
            setFormData({
                name: '',
                description: '',
                category: '',
                superCategory: '',
                cost: 0,
                quantity: 0,
                brand: '',
            })

        }catch(err){
            console.log('Error  in Submitting Product', err)
        }
        finally{
            setLoading(false)
        }
    }

    const handleChange=(e)=>{
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    }
 
    return (
        //Form for product addition
        <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md'>
            <div className='flex flex-col mb-4'>
                <div className='flex flex-col'>
                    <h2 className='text-lg font-bold mb-2'>General Information</h2>
                    {/*Product Name */}
                    <label htmlFor='name' className='block text-gray-700 text-sm mb-2'>Name Product</label>
                    <input 
                        type='text'
                        name='name'
                        id='name'
                        value={formData.name}
                        placeholder='Enter  product name...'
                        onChange={handleChange}
                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded"
                    />
                </div>

                <div className='flex flex-col mb-4'>
                    {/*Product Description */}
                    <label htmlFor='description' className='block text-gray-700 text-sm mb-2'>Product Description:</label>
                    <textarea 
                        name="description"
                        id="description"
                        rows={5}
                        onChange={handleChange}
                        value={formData.description}
                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded"
                    />
                </div>

                <div className='flex flex-col mb-4'>
                    {/*Product Category */}
                    <label htmlFor='category'>Enter Category:</label>
                    <input 
                        type='text'
                        name='category'
                        id='category'
                        placeholder='Enter Category...'
                        onChange={handleChange}
                        value={formData.category}
                        className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded"
                    />
                </div>

                <div className='flex flex-col mb-4'>
                {/*Product SuperCategory */}
                <label className="block text-gray-700 text-sm mb-2">Select Supercategory:</label>
                    <select onChange={handleSuperCategoryChange} value={formData.superCategory} className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded">
                        {
                            superCategories.map((superCategory,idx)=>{
                                return (
                                    <option key={superCategory._id} value={superCategory._id} name='superCategory'>{superCategory.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className='flex flex-row mb-4'>
                    {/*Product Pricing and stock*/}
                    <h2 className="text-lg font-bold mb-2">Pricing And Stock</h2>
                    <div className="flex flex-col w-1/2 mr-4">
                        {/*Product base Pricing */}
                        <label htmlFor='cost' className="block text-gray-700 text-sm mb-2">Base Pricing:</label>
                        <input 
                            type='number'
                            name='cost'
                            id='cost'
                            value={formData.cost}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="flex flex-col w-1/2">
                        {/*Total product stock */}
                        <label htmlFor='quantity' className="block text-gray-700 text-sm mb-2">Stock:</label>
                        <input 
                            type='number'
                            name='quantity'
                            id='quantity'
                            value={formData.quantity}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col mb-4">
                <div>
                    {/*Upload Image */}
                    <ImageUpload selectedImages={selectedImages} setSelectedImages={setSelectedImages} formData={formData} setFormData={setFormData}/>
                </div>

                <div className='flex flex-col mb-4'>
                    <div>
                        {/*Product Brand Name */}
                        <label htmlFor='brand' className="block text-gray-700 text-sm mb-2">Brand Name:</label>
                        <input 
                            type='text'
                            name='brand'
                            id='brand'
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded"
                        />
                    </div>
                    <div className='flex flex-col'>
                        {/*Product options: */}
                        <h2>Options:</h2>
                        {/*Sizes option*/}
                        <div>
                            <h3>Sizes</h3>
                            <input 
                                type='text'
                                name='size'
                                id='size'
                                value={size}
                                placeholder='Enter Size (e.g. S,M,L,XL,15,16,etc)'
                                onChange={handleSizeChange}
                                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded"
                            />
                            <button onClick={addToSizeList} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Size</button>
                            <ul className='flex flex-col space-x-2'>
                                {/*Rendering list of sizes */}                               
                                {
                                    sizeList.map((size,idx)=>(
                                        <li key={idx}>
                                            <span>{size}</span>
                                            <button onClick={() => removeFromSizeList(idx)}>Remove</button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        {/*Color option*/}
                        <div>
                            <h3>Colors</h3>

                            <ColorPicker color={color} onChange={setColor}/>
                            <button onClick={addColor}>Add Color</button>
                            {/*Rendering list of colors*/}
                            <div className='flex flex-row space-x-4'>
                                {
                                    colorList.length > 0 && (
                                        colorList.map((color,idx)=>{
                                            return (
                                                <div key={idx} className='bg-red-900 h-10 w-10 rounded-full'></div>
                                            )
                                        })
                                    )
                                }
                            </div>

                        </div>

                        <div>
                            {/*Weight Options */}
                            <h3>Weight:</h3>
                            <input 
                                type='text'
                                name='weight'
                                id='weight'
                                value={weight}
                                placeholder='Enter Weight (e.g. S,M,L,XL,15,16,etc)'
                                onChange={handleWeightChange}
                                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded"
                            />
                            <button onClick={addToWeightList} className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Size</button>
                            <ul className='flex flex-col space-x-2'>
                                {/*Rendering list of weights*/}
                                {
                                    weightList.map((weight,idx)=>(
                                        <li key={idx}>
                                            <span>{weight}</span>
                                            <button onClick={() => removeFromWeightList(idx)}>Remove</button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        {/*Gender applicable section*/}
                        <div>
                            <h3>Gender</h3>
                            <label>
                                <input 
                                    type='checkbox'
                                    checked={isGenderApplicable}
                                    onChange={(e) => handleGenderApplicability(e.target.checked)}
                                />
                                Is gender applicable
                            </label>
                            {isGenderApplicable && (
            <div>
              <label>
                <input
                  type="radio"
                  name='gender'
                  value='male'
                  checked={gender ==='male'}
                  onChange={(e) => handleGenderChange(e.target.value)}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => handleGenderChange(e.target.value)}
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  value="unisex"
                  checked={gender === 'unisex'}
                  onChange={(e) => handleGenderChange(e.target.value)}
                />
                Unisex
              </label>
            </div>
          )}
                        </div>

                    </div>
                </div>

            </div>

            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Product</button>

        </form>
    )
}

export default AddProductForm