'use client'
import useDataState from '@/store/data-store';
import Image from 'next/image'

function Viewer() {

    const pokemon_name = useDataState(state => state.name)
    var image_name  = pokemon_name.charAt(0).toUpperCase() + pokemon_name.substring(1)

    //console.log("Carlos" + pokemon_name)
    //console.log(image_name)

    return (pokemon_name ? <Image
                src={"/images/" + image_name + "/0.jpg"}
                width={500}
                height={500}
                alt="A Pokemon Picture"
            /> : null)
}

export default Viewer