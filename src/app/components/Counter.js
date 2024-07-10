
import { useState, useEffect } from 'react';
import Shake from 'shake.js';

const Counter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const myShakeEvent = new Shake({ threshold: 15 });
        myShakeEvent.start();

        const handleShake = () => {
            setCount((prevCount) => prevCount + 1);
        };

        window.addEventListener('shake', handleShake, false);

        return () => {
            myShakeEvent.stop();
            window.removeEventListener('shake', handleShake, false);
        };
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
