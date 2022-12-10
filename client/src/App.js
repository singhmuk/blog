import React, {useState, useEffect} from "react";
import axios from "axios";
import Edit from "./edit";


const formState = { name:'', username:'' }

const App = () => {
    const [items, setItems] = useState(formState);
    const [mockdata, setMockdata] = useState([]);
    const [editing, setEditing] = useState(false);
    const [current, setCurrent] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        await axios.get("/item")
          .then((res) => res.data)
          .then((data) => setMockdata(data))
      };

      const handleChange = (e) => { 
        const {name, value} = e.target;
        setItems({...items, [name]:value})
      }
    
      const handleAdd = async (e) => { 
        e.preventDefault();     
            await axios.post('/item', items); 
            setMockdata([...mockdata, items]);
            setItems(formState);
        }

        const handleDelete = async (_id) => { 
            await axios.delete(`/item/${_id}`); 
            setMockdata(mockdata.filter(data => data._id != _id));
        }

        const handleEdit = (user) => {
            setEditing(true);
            setCurrent({ id:user.id, name:user.name, username:user.username });
        }

        const handleUpdates = async (_id) => {
            setEditing(false);
            const res = await axios.put(`/item/${_id}`, items); 
            setMockdata(mockdata.map(items => items._id === _id ? res : items))
        }

    return(
        <div>
            {editing ? 
            <Edit 
                current = {current}
                handleUpdates = {handleUpdates}
            />
            :
            <form onSubmit={handleAdd}>
                <label>Name</label>
                <input type="text" name="name" value={items.name} onChange={handleChange} />
                <label>Username</label>
                <input type="text" name="username" value={items.username} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
}
            {mockdata.map(items => (
                <li key={items._id}>
                    {items._id} - {items.name} - {items.username}<br/>
                    <button onClick={()=>handleDelete(items._id)}>X</button> 
                    <button onClick={()=>handleEdit(items)}>E</button>
                </li>
            ))}
        </div>
    )
}

export default App;