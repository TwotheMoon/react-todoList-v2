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
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("todo", { required: "Please Write a To Do" })} />
            <button>Add</button>
        </form>
    );
}

export default CreateaToDo;