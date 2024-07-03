import { useState, useEffect } from 'react';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const useFirstLaunch = (): [boolean, () => void] => {
    const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(false);

    useEffect(() => {
        const checkFirstLaunch = async () => {
            const hasLaunched = storage.getBoolean('hasLaunched');

            if (!hasLaunched) {
                setIsFirstLaunch(true);
                storage.set('hasLaunched', true);
            } else {
                setIsFirstLaunch(false);
            }
        };

        checkFirstLaunch();
    }, []);

    const resetFirstLaunch = () => {
        storage.set('hasLaunched', false);
        setIsFirstLaunch(true);
    };

    return [isFirstLaunch, resetFirstLaunch];
};

export default useFirstLaunch;
