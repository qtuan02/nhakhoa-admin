"use client"
import { pusher } from '@/config/PusherConfig';
import { INotification } from '@/interfaces/INotification';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addNotification, countNotification, getNotification } from '@/redux/reducers/notificationReducer';
import { useEffect } from 'react';

const usePusher = () => {
    const dispatch = useAppDispatch();
    const notification = useAppSelector(getNotification);

    useEffect(() => {
        const channel = pusher.subscribe("notifications");
        channel.bind("notice", (data: INotification) => {
            dispatch(countNotification());
            dispatch(addNotification(data));
        });
    }, [dispatch]);
    
    return notification.count;
};

export default usePusher;