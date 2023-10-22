import {create} from 'zustand';

interface DataState {
    name: "",
    data: "",
    changeData: (value: string) => void
}

const useDataState = create<DataState>()((set) => ({
    name: "",
    data: "",
    changeData: (value: string) => {
        set({data: value});
    },
    changeName: (value: string) => {
        set({name: value});
    },
}))

export default useDataState