"use client";
import Header from '@/components/Header';
import SearchResult from '@/components/SearchResult';
import { useSupabase } from '@/lib/hooks/useSupabase';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const SearchPage = () => {
    const { query } = useParams()
    const { filteredData, getFilteredData } = useSupabase();

    useEffect(() => {
        getFilteredData(query.toString())
    }, [])

    return (
        <div className="text-black">
            <Header />
            <SearchResult filteredData={filteredData} />
        </div>
    )
}

export default SearchPage;
