'use client'
import useDataState from '@/store/data-store';
import React from 'react';

function Info() {
    const data = useDataState(state => state.data)

    return (<><h1>Basic Info</h1>
           <div>
                <div>
                    <div>{data.name}</div>
                    <div>{data.height}</div>
                    <div>{data.rder}</div>
                </div>
           </div></>)
}

export default Info