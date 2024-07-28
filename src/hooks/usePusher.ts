import { pusher } from '@/config/PusherConfig';
import { useEffect, useState } from 'react';

const usePusher = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const channel = pusher.subscribe("notifications");
        channel.bind("notice", (data: any) => {
            setCount(prevCount => (
                prevCount + 1
            ));
        });
        
    }, []);
    
    return count;
};

export default usePusher;