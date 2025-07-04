import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

// Main component for the Algorithm Visualizer
const AlgorithmVisualizer = () => {
    // State to hold the array of numbers to be sorted
    const [array, setArray] = useState([40, 30, 20, 50, 10]);
    // State to track if a sorting algorithm is currently running
    const [sorting, setSorting] = useState(false);
    // State for the size of the array (number of elements)
    const [arraySize, setArraySize] = useState(10);
    // State for the speed of the sorting animation (in milliseconds)
    const [sortSpeed, setSortSpeed] = useState(300);

    // Function to generate a new random array of a given size
    const generateRandomArray = (size = arraySize) => {
        // Creates an array of random numbers between 1 and 100
        const newArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
        setArray(newArray);
    };

    // Function to calculate the delay between sorting steps based on array size
    const getSortDelay = (size) => {
        // Ensures the delay is at least 10ms, but decreases as the array gets larger
        return Math.max(10, 1000 / size);
    };

    // Bubble Sort algorithm with animation
    const bubbleSort = async () => {
        setSorting(true); // Disable controls while sorting
        const arr = [...array]; // Make a copy of the array to sort
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements if they are in the wrong order
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]); // Update the state to trigger a re-render
                    // Wait for the specified sort speed before continuing
                    await new Promise(resolve => setTimeout(resolve, sortSpeed));
                }
            }
        }
        setSorting(false); // Re-enable controls after sorting
    };

    // Selection Sort algorithm with animation
    const selectionSort = async () => {
        setSorting(true);
        const arr = [...array];
        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i;
            // Find the index of the minimum element in the unsorted part
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            // Swap the found minimum element with the first unsorted element
            if (minIndex !== i) {
                [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
                setArray([...arr]);
                await new Promise(resolve => setTimeout(resolve, sortSpeed));
            }
        }
        setSorting(false);
    };

    // Insertion Sort algorithm with animation
    const insertionSort = async () => {
        setSorting(true);
        const arr = [...array];
        for (let i = 1; i < arr.length; i++) {
            let key = arr[i];
            let j = i - 1;
            // Move elements of arr[0..i-1] that are greater than key to one position ahead
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

    // Render the UI
    return (
        <div className="flex flex-col items-center space-y-6 p-8">
            {/* Slider to change the size of the array */}
            <input
                type="range"
                min="5"
                max="100"
                value={arraySize}
                onChange={(e) => {
                    const newSize = parseInt(e.target.value);
                    setArraySize(newSize); // Update array size state
                    setSortSpeed(getSortDelay(newSize)); // Adjust sort speed for new size
                    generateRandomArray(newSize); // Generate a new random array
                }}
                className="w-64 mb-4"
            />
            {/* Visual representation of the array as bars */}
            <div className="flex space-x-2">
                {array.map((value, index) => (
                    <div
                        key={index}
                        className="bg-blue-500 w-4 text-center text-white p-2 rounded-lg"
                        style={{ height: `${value * 3}px` }} // Height proportional to value
                    >
                        {value}
                    </div>
                ))}
            </div>
            {/* Button to generate a new random array */}
            <Button onClick={() => generateRandomArray(arraySize)} disabled={sorting} className="bg-green-500">
                Generate New Array
            </Button>
            {/* Buttons to trigger each sorting algorithm */}
            <Button onClick={bubbleSort} disabled={sorting} className="bg-blue-500">
                Bubble Sort
            </Button>
            <Button onClick={selectionSort} disabled={sorting} className="bg-purple-500">
                Selection Sort
            </Button>
            <Button onClick={insertionSort} disabled={sorting} className="bg-red-500">
                Insertion Sort
            </Button>
        </div>
    );
};

export default AlgorithmVisualizer;
