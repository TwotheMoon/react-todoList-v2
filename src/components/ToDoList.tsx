import styled from "@emotion/styled";
import { AppBar, Box, Button, Container, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryStateAtom, initCategoryStateAtom, modalOpenAtom, refrashAtom, todoStateSelector } from "../atoms";
import CreateaToDo from "./CreateToDo";
import ToDo from "./ToDo";
import AddIcon from '@mui/icons-material/Add';
import Modal from "./Modal";

const Section = styled(Container)`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const InputWrap = styled.div`
    width: 100%;
    position: absolute;
    bottom: 1px;
`;

const DeleteImg = styled.img`
    height: 20px;
    z-index: 99;
    margin: auto 0;
    cursor: pointer;    
`;

const TodoListWrap = styled.div`
    overflow-y: "scroll";
    max-height: 400px;
`;


function ToDoList() {
    const toDos = useRecoilValue(todoStateSelector);
    const setCategory = useSetRecoilState(categoryStateAtom)
    const [cateArr, setCateArr] = useRecoilState(initCategoryStateAtom); 
    const setModalOpen = useSetRecoilState(modalOpenAtom);
    const [value, setValue] = useState(0);
    const [refrash, setRefrash] = useRecoilState(refrashAtom);
    const initCate = ["TODO", "DOING", "DONE"];



    const handleChange = (event: React.SyntheticEvent | React.BaseSyntheticEvent , newValue: number) => {
        setValue(newValue);
        setCategory(event.target.innerText);
    };

    function a11yProps(index: number) {
        return {
          id: `full-width-tab-${index}`,
          'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    const openAddCateModal = () => {
        setModalOpen(true);
    }

    const deleteCate = (e: React.BaseSyntheticEvent) => {
        const deleteTarget = e.target.id;
        const localCate = localStorage.getItem("todoCate");
        if(localCate !== null){
            const parsedCate = JSON.parse(localCate);
            const updateCateArr = parsedCate.filter((val: string) => {
                return val !== deleteTarget;
            });
            localStorage.removeItem("todoCate");
            localStorage.setItem("todoCate", JSON.stringify(updateCateArr));
            setRefrash(Date.now());
        }
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
    }, [refrash])

    return (
        <Section>
            <Box sx={{ position: "absolute", bgcolor: 'background.paper', maxWidth: {xs: 300, sm: 400 }, minHeight: 500 }}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        scrollButtons
                        allowScrollButtonsMobile
                        variant="scrollable"
                    >

                    {cateArr?.map((cate, index) => (
                        [
                            <Tab key={cate} label={cate} {...a11yProps(index)} sx={{padding: "12px 0px", minWidth: 70, fontWeight: "bold"}} />,  
                            <DeleteImg src={require("../common/Img/trash-bin.png").default} id={cate} onClick={(e) => deleteCate(e)} style={{display: initCate.includes(cate) ? "none" : "inline" }}/>
                        ]
                        ))}
                        <Button onClick={openAddCateModal} variant="outlined" sx={{color:"white"}}>
                            <AddIcon />
                        </Button>
                    </Tabs>
                </AppBar>

                <TodoListWrap>
                    {toDos.map((todo) => (
                        <ToDo {...todo}/>
                    ))}
                </TodoListWrap>

                <InputWrap>
                    <CreateaToDo />
                </InputWrap>
            </Box>
            <Modal />
        </Section>
    );
}

export default ToDoList;