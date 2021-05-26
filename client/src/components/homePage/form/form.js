import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import "./form.css";
import storage from '../../../firebase';
import axios from 'axios';
import { UserContext } from '../../../contexts/UserContext';

function Form() {

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const { user } = useContext(UserContext)

    const handleChange = (event) => {
        setFile(event.target.files[0])
    }
    const changeTitle = (event) => {
        setTitle(event.target.value)
    }
    const changeDesc = (event) => {
        setDesc(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // send image to firebase storage, and get reference url
        await storage.ref(`/images/${file.name}`).put(file);     
        const imageUrl = await storage.ref('images').child(file.name).getDownloadURL();
        
        // create formdata to send to database 
        const formData = {
            user: user.uid,
            name: user.displayName,
            pfp: user.photoURL,
            title: title,
            desc: desc,
            image: imageUrl
        }
        console.log(formData);
        await axios.post('/api/post', formData);
    };

    return (
        <div >
            <form onSubmit={handleSubmit} enctype='multipart/form-data' id="upload-form">
                <div>
                    <label for="name">Image Title:</label>
                    <input type="text" id="title" placeholder="Title Name"
                        name="title" onChange={changeTitle} required className="formInput" />
                </div>
                <div className="descFormEntry">
                    <label for="desc" className="formLabel">Image Description:</label>
                    <textarea id="desc" name="desc" rows="2"
                        placeholder="Description" onChange={changeDesc} required>
                    </textarea>
                </div>
                <div className="imgUploadButton">
                    <label for="image" className="uploadButton">Upload Image:</label>
                    <input type="file" id="image"
                        name="image" onChange={handleChange} required />
                </div>
                <div className="formButton">
                    <Button type="submit" variant="contained" >Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default Form;
