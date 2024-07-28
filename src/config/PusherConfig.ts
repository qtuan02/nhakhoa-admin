import Pusher from 'pusher-js';
import { appConfig } from './AppConfig';

export const pusher = new Pusher(appConfig.PUSHER_APP_KEY, {
    cluster: appConfig.PUSHER_APP_CLUSTER,
});