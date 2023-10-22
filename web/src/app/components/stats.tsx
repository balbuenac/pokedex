'use client'
import useDataState from '@/store/data-store';
import React from 'react';

function Stats() {

    const data = useDataState(state => state.data)

    return (<><h1>Stats</h1>
           <div>
                {data ? data.abilities.map(ability =>
                    <div>{ability.ability.name}</div>
                ) : null}
           </div></>)
}

export default Stats