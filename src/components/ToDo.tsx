import styled from "@emotion/styled";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { initCategoryStateAtom, todoStateAtom } from "../atoms";
import { TodosData } from "../common/interface/interface";

const DeleteImg = styled.img`
    height: 20px;
    z-index: 99;
    margin: auto 0;
    cursor: pointer;    
`;

function ToDo({ text, category, id }: TodosData) {
    const setTodos = useSetRecoilState(todoStateAtom);
    const cateArr = useRecoilValue(initCategoryStateAtom); 

    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        const {  currentTarget: {name} } = e;
       
        setTodos((oldTodos => {
            const targetIndex = oldTodos.findIndex(todo => todo.id === id);
            const newTodo = { text, id, category:name as any}
            
            return [...oldTodos.slice(0, targetIndex), newTodo, ...oldTodos.slice(targetIndex + 1)];
        }));
    };
    
    const deleteTodo = (id:number) => {

        setTodos((oldTodos => {
            const targetIndex = oldTodos.findIndex(todo => todo.id === id);
            let updateTodo = [...oldTodos];
            updateTodo.splice(targetIndex, 1);
            
            return updateTodo;
        }));
    }

    const style = {
        width: '100%',
        bgcolor: 'background.paper',
        color: "black"
      };

    
    return (
        <List sx={style} component="nav" aria-label="mailbox folders">
            <ListItem>
                <ListItemText primary={text} />
                <DeleteImg onClick={() => deleteTodo(id)} src={require("../common/Img/trash-bin.png").default} alt="delete" />
            </ListItem>
            <Divider />
            {cateArr.map((cate) => (
                <>
                    {category !== cate && <Button size="small" variant="outlined" name={cate} onClick={onClick}>{cate}</Button>}
                </>
            ))}
        </List>
    );
}

export default ToDo;