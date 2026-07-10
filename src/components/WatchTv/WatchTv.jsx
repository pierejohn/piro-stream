import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { requesMoviesOrTvDetails } from '../../api';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner'; // Import your spinner

export default function WatchTv() {

    let parms = useParams();
    const [tvDetails, setTvDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getDetails() {
        setLoading(true);
        try {
            const { data } = await axios.get(requesMoviesOrTvDetails(parms.id, 'tv'));
            setTvDetails(data); // Store the whole object
            console.log(data);
            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        getDetails();
    }, [parms.id]); 

    // 1. Show Spinner while loading
    if (loading) {
        return <div className="h-screen flex items-center justify-center"><Spinner /></div>;
    }

    // 2. Prevent crash if details is still null for some reason
    if (!tvDetails) {
        return <div className="pt-20 text-white text-center">Movie not found.</div>;
    }

    return (
        <div className='text-accent w-screen h-screen pt-20 app-container'>
            {/* Now tvDetails is guaranteed to exist */}
            <h1 className="text-4xl font-bold">{tvDetails.name}</h1>
            <p className="mt-4 text-gray-400">{tvDetails.overview}</p>
        </div>
    )
}
