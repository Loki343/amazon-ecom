import React from 'react'
import ProductCard from './ProductCard'

const SearchResult = ({ filteredData }) => {
    return (
        <div className='w-[80%] mx-auto'>
            <div className='mt-10'>
                <div>
                    <h1 className='font-bold text-2xl'>Results : {filteredData.length}</h1>
                    <p>Price and other details may vary based on product size and colour.</p>
                </div>
                <div className='grid grid-cols-4 gap-2'>
                    {
                        filteredData.map((prod, idx) => {
                            return (
                                <div key={idx}>
                                    <ProductCard product={prod} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default SearchResult
