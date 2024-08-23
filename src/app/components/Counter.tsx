"use client";
import Image from 'next/image';
import Header from './Navigation/Header';
import logo from "../../../public/ShakeNoBg.png";
import NormalVids from './Normal';

interface CounterProps {
    count: number;
    energy: { current: number; max: number };
    frenzy: { isActive: boolean; count: number };
    frenzyBar: number;
    increment: number;
    handleShake: () => void;
    VideoComponent: React.FC;
}

const Counter = ({
    count,
    energy,
    frenzy,
    frenzyBar,
    handleShake,
    VideoComponent,
}: CounterProps) => {

    return (
        <div className='w-full h-full'>
            <Header curEnergy={energy.current} maxEnergy={energy.max} />
            <div className={`h-[calc(100vh-9rem)] mt-5 flex items-center`}>
                <div className='w-full'>
                    <div className='flex flex-col text-center items-center gap-y-3'>
                        <h1 className='w-full font-bold text-2xl'>Shake to Increase Count</h1>
                        <p>Shake your phone to increase the count:</p>
                        <h2 className='mt-2 text-4xl'>{count}</h2>
                    </div>
                    <div className='w-[90%] mx-auto'>
                        <div id='frenzybar' className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mt-5">
                            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full" style={{ width: `${frenzy.count / frenzyBar * 100}%` }}></div>
                        </div>
                    </div>
                    <VideoComponent />
                </div>
            </div>
        </div>
    );
};

export default Counter;
