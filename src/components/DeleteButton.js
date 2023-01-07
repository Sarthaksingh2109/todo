import { Button } from 'react-bootstrap'
import {Delete} from '../indexddb';
export default function DeleteButton({ id,todoList, setTodo }) {
    const DeleteTodo=function(id){
        const items=todoList.filter((item)=>item.id!==id);
        setTodo(items);
    }
    return (
        <>
            <Button variant="outline-danger" onClick={() => {Delete(id);DeleteTodo(id)}}>Delete</Button>
        </>
    );
}