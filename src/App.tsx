import { useRecoilValue } from "recoil";
import { enterAtom } from "./atoms";
import { GlobalStyle } from "./common/css/reset";
import Enter from "./components/Enter";
import ToDoList from "./components/ToDoList";



function App() {
  const enter = useRecoilValue(enterAtom);


  return (
    <>
      <GlobalStyle />
      {!enter ?
        <Enter />
        :
        <ToDoList />
       }
    </>
  );
}
export default App;
