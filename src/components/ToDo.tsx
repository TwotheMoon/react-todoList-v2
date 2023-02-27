import { useSetRecoilState } from "recoil";
import { todoStateAtom } from "../atoms";
import { TodosData } from "../common/interface/interface";

function ToDo({ text, category, id }: TodosData) {
    const setTodos = useSetRecoilState(todoStateAtom);

    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        const {  currentTarget: {name} } = e;
       
        setTodos((oldTodos => {
            const targetIndex = oldTodos.findIndex(todo => todo.id === id);
            const newTodo = { text, id, category:name as any}
            
            return [...oldTodos.slice(0, targetIndex), newTodo, ...oldTodos.slice(targetIndex + 1)];
        }));
    }

    return (
        <li>
            <span>{text}</span>
            {category !== "DOING" && <button name="DOING" onClick={onClick}>Doing</button>}
            {category !== "TODO" && <button name="TODO" onClick={onClick}>To Do</button>}
            {category !== "DONE" && <button name="DONE" onClick={onClick}>Done</button>}
        </li>
    );
}

export default ToDo;