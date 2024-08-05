
import { useState, useEffect } from 'react';
import Shake from 'shake.js';

const Counter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        setupShakeEvent();
                    }
                })
                .catch(console.error);
        } else {
            // Non-iOS devices or older iOS versions
            setupShakeEvent();
        }

        function setupShakeEvent() {
            const myShakeEvent = new Shake({ threshold: 9, timeout: 100 });
            myShakeEvent.start();

            const handleShake = () => {
                setCount((prevCount) => prevCount + 1);
            };

            window.addEventListener('shake', handleShake, false);

            return () => {
                myShakeEvent.stop();
                window.removeEventListener('shake', handleShake, false);
            };
        }
    }, []);


    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Shake to Increase Count</h1>
            <p>Shake your phone to increase the count:</p>
            <h2>{count}</h2>
        </div>
    );
};

export default Counter;
