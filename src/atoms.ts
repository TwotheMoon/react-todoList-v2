import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { TodosData } from "./common/interface/interface";


export const refrashAtom = atom({
  key: "refrash",
  default: 0
})

export const enterAtom = atom({
  key: "enter",
  default: false
})

export const initCategoryStateAtom = atom<string[]>({
  key: "initCategory",
  default: []
})

export const categoryStateAtom = atom({
  key: "category",
  default: "TODO",
})

const { persistAtom:todoPersist } = recoilPersist({
  key: 'todoStore',
  storage: localStorage,
  });

export const todoStateAtom = atom<TodosData[]>({
  key: "todoState",
  default: [],
  effects_UNSTABLE:[todoPersist]
});;

export const todoStateSelector = selector({
  key:"todoStateSelector",
  get: ({get}) => {
    const toDos = get(todoStateAtom);
    const category = get(categoryStateAtom);
    
    return toDos.filter((todo) => todo.category === category);
  }
});

export const modalOpenAtom = atom({
  key: "modalOpen",
  default: false
});