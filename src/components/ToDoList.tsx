
import styled from "@emotion/styled";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryStateAtom, initCategoryStateAtom, todoStateSelector } from "../atoms";
import CreateaToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Section = styled(Container)`
    
`;

function ToDoList() {
    const toDos = useRecoilValue(todoStateSelector);
    const [category, setCategory] = useRecoilState(categoryStateAtom)
    const [cateArr, setCateArr] = useRecoilState(initCategoryStateAtom); 
	const onInput = (e:React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value);
    }

    const setDefaultCategory = () => {
		if(!localStorage.getItem("todoCate")){
			const initCate = ["TODO", "DOING", "DONE"];
			localStorage.setItem("todoCate", JSON.stringify(initCate));
			setCateArr([...initCate]);
		} else {
			const localCate = localStorage.getItem("todoCate");
			if(localCate !== null){
				setCateArr([...JSON.parse(localCate)])
			}
		}
	}

    useEffect(() => {
        setDefaultCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Section >
            <h1>ToDo List</h1>
            <hr />
            <select value={category} onInput={onInput}>
				{cateArr?.map(cate => (
					<option value={cate}>{cate}</option>
				))}
            </select>

            <CreateaToDo />
            
            {toDos.map(todo => (
                <ToDo {...todo}/>
            ))}
        </Section >
    );
}

export default ToDoList;