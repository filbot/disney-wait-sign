import { useState, useEffect } from 'react';
import { formatAMPM } from '../utils/dateUtils';

export const useDisneyData = () => {
    const [attractions, setAttractions] = useState([]);
    const [parkHours, setParkHours] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [attractionResponse, parkHoursResponse] = await Promise.all([
                    fetch('https://corsproxy.io/?https://api.themeparks.wiki/preview/parks/DisneylandResortMagicKingdom/waittime'),
                    fetch('https://corsproxy.io/?https://api.themeparks.wiki/preview/parks/DisneylandResortMagicKingdom/calendar')
                ]);

                const attractionData = await attractionResponse.json();
                const parkHoursData = await parkHoursResponse.json();

                setAttractions(attractionData);

                const todaysParkHours = {
                    opening: formatAMPM(parkHoursData[0].openingTime),
                    closing: formatAMPM(parkHoursData[0].closingTime)
                };
                setParkHours(todaysParkHours);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return { attractions, parkHours, loading, error };
};
