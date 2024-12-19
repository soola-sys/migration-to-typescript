import Loader from './loader';
import { getEnv } from '../../types/index';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = getEnv(process.env.API_URL);
        const apiKey = getEnv(process.env.API_KEY);
        super(apiUrl, {
            apiKey,
        });
    }
}

export default AppLoader;
