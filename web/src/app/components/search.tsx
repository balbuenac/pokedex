'use client'
import useDataState from '@/store/data-store';
import { FormEvent } from 'react'

function Search() {

    const changeData = useDataState(state => state.changeData)
    const changeName = useDataState(state => state.changeName)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const form_values = Object.fromEntries(formData);
        var pokemon_name = form_values.name;
        if (pokemon_name == null || pokemon_name == "") {
            pokemon_name = "ditto";
        }
        const res = await fetch('http://127.0.0.1:8000/pokemon/?name=' + pokemon_name);
		const data = await res.json();
        changeData(data);
        changeName(pokemon_name);
		console.log(data);
    }

    return (<form onSubmit={onSubmit}>
                <div className="grid grid-cols-1 gap-4">
                    <div className="..."><input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Pikachu" name="name" /></div>
                    <div className="..."><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" type="submit">Buscar</button></div>
                </div>
           </form>)
}

export default Search