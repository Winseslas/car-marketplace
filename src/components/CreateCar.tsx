import React from 'react'

export default function CreateCar() {
    return (
        <div>
            <div className="bg-white p-4 text-surface dark:bg-neutral-700 dark:text-white dark:shadow-black/30 rounded-xl shadow"
                style={{ backgroundColor: '#e6edf7' }}>
                <div className="overflow-hidden">
                    <div className="w-[565px] md:w-full text-start text-sm font-light text-surface dark:text-white">
                        <div className="flex items-center justify-between bg-white border-gray-200 px-4 py-3 sm:px-6">
                            {/* <p className="text-2xl font-bold">Create Car</p> */}
                            Create Car
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
