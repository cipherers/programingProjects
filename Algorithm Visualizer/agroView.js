import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const AlgorithmVisualizer = () => {
    const [array, setArray] = useState([40, 30, 20, 50, 10]);
    const [sorting, setSorting] = useState(false);
    const [arraySize, setArraySize] = useState(10);
    const [sortSpeed, setSortSpeed] = useState(300);

    const generateRandomArray = (size = arraySize) => {
        const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
        setArray(newArray);
    };

    const getSortDelay = (size) => {
        return Math.max(10, 1000 / size);
    };

    const bubbleSort = async () => {
        setSorting(true);
        const arr = [...array];
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]);
                    await new Promise(resolve => setTimeout(resolve, sortSpeed));
                }
            }
        }
        setSorting(false);
    };

    const selectionSort = async () => {
        setSorting(true);
        const arr = [...array];
        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                setArray([...arr]);
                await new Promise(resolve => setTimeout(resolve, sortSpeed));
            }
        }
        setSorting(false);
    };

    const insertionSort = async () => {
        setSorting(true);
        const arr = [...array];
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
                setArray([...arr]);
                await new Promise(resolve => setTimeout(resolve, sortSpeed));
            }
            arr[j + 1] = key;
            setArray([...arr]);
            await new Promise(resolve => setTimeout(resolve, sortSpeed));
        }
        setSorting(false);
    };

    return (
        <div className="flex flex-col items-center space-y-6 p-8">
            <input
                type="range"
                min="5"
                max="100"
                value={arraySize}
                onChange={(e) => {
                    const newSize = parseInt(e.target.value);
                    setArraySize(newSize);
                    setSortSpeed(getSortDelay(newSize));
                    generateRandomArray(newSize);
                }}
                className="w-64 mb-4"
            />
            <div className="flex space-x-2">
                {array.map((value, index) => (
                    <div key={index} className="bg-blue-500 w-4 text-center text-white p-2 rounded-lg" style={{ height: `${value * 3}px` }}>{value}</div>
                ))}
            </div>
            <Button onClick={() => generateRandomArray(arraySize)} disabled={sorting} className="bg-green-500">Generate New Array</Button>
            <Button onClick={bubbleSort} disabled={sorting} className="bg-blue-500">Bubble Sort</Button>
            <Button onClick={selectionSort} disabled={sorting} className="bg-purple-500">Selection Sort</Button>
            <Button onClick={insertionSort} disabled={sorting} className="bg-red-500">Insertion Sort</Button>
        </div>
    );
};

export default AlgorithmVisualizer;
