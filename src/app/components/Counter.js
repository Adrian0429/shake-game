import { useState, useEffect } from 'react';
import Shake from 'shake.js';
import Image from 'next/image';
import logo from "../../../public/shakeLogo.jpeg";

const Counter = () => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const requestPermissionAndSetupShakeEvent = () => {
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                DeviceMotionEvent.requestPermission()
                    .then(permissionState => {
                        if (permissionState === 'granted') {
                            setupShakeEvent();
                        } else {
                            alert('Permission to access device motion was denied.');
                        }
                    })
                    .catch(error => {
                        console.error('Error requesting DeviceMotionEvent permission:', error);
                    });
            } else {
                // For devices that do not require permission (non-iOS or iOS < 13)
                setupShakeEvent();
            }
        };

        const setupShakeEvent = () => {
            const myShakeEvent = new Shake({ threshold: 10, timeout: 150 });
            myShakeEvent.start();

            const handleShake = () => {
                setCount((prevCount) => prevCount + 1);
            };

            window.addEventListener('shake', handleShake, false);

            // Cleanup
            return () => {
                myShakeEvent.stop();
                window.removeEventListener('shake', handleShake, false);
            };
        };

        // Check for DeviceMotionEvent support and request permission if needed
        if (window.DeviceMotionEvent) {
            requestPermissionAndSetupShakeEvent();
        } else {
            console.warn('DeviceMotionEvent is not supported on this device.');
        }
    }, []);

    return (
        <div className='border h-screen flex flex-col justify-center items-center text-center'>
            <h1 className='font-bold text-2xl'>Shake to Increase Count</h1>
            <p>Shake your phone to increase the count:</p>
            <h2 className='mt-2 text-4xl'>{count}</h2>
            <Image className="mx-auto mt-5" src={logo} alt="Shake" width={450} height={450} />
        </div>
    );
};

export default Counter;
