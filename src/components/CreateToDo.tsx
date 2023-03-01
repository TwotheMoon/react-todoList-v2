import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryStateAtom, todoStateAtom } from "../atoms";
import { FormData } from "../common/interface/interface";


function CreateaToDo() {
    const setTodos = useSetRecoilState(todoStateAtom);
    const category = useRecoilValue(categoryStateAtom);
    const { register, handleSubmit, setValue } = useForm<FormData>()
    const handleValid = ({todo}: FormData) => {
        setTodos((prev) => [{text: todo, id: Date.now(), category}, ...prev]);
        setValue("todo", "");
    };

    return (
        <form onSubmit={handleSubmit(handleValid)} style={{zIndex: 99}}>
            <TextField
                {...register("todo")}
                label="Write ToDo"
                variant="filled"
                color="success"
                size="small"
                focused
                sx={{width: "100%"}}
            />
        </form>
    );
}

export default CreateaToDo;