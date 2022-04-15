import { useContext, useState } from 'react';
import './Write.css';
import axios from 'axios';
import { Context } from '../../context/Context';
import { upload } from '@testing-library/user-event/dist/upload';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Write() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [fileInputSatate, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [previewSource, setPreviewSource] = useState();
  const { user } = useContext(Context);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // Uploading Image

  const uploadImage = async (base64EncodedImage) => {
    try {
      const datas = await axios.post(
        'https://blogapp-retry.herokuapp.com/api/upload',
        {
          data: base64EncodedImage,
        }
      );
      console.log(base64EncodedImage);
      setFile(datas.data.url);
      setFileInputState('');
      setPreviewSource('');
      toast.success('Image uploaded successfully');
      return datas.data.url;
    } catch (error) {
      console.log(error);
      alert('Something went wrong!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.warning('Uploading data..! Please wait for a while', {
      position: 'top-right',
      autoClose: 5000,
    });

    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (!selectedFile) return;
    /* Setup to upload images in cloudinary */
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    let img_url;

    reader.onloadend = async () => {
      img_url = await uploadImage(reader.result);
      newPost.photo = img_url;
      /* After Img upload save the image url and other post details in Database */
      try {
        const res = await axios.post(
          'https://blogapp-retry.herokuapp.com/api/posts',
          newPost
        );
        window.location.replace('/');
      } catch (err) {
        console.log(err.response);
      }
    };

    reader.onerror = () => {
      toast.error(
        'something went wrong! Make sure if you have proper internet connection!',
        {
          position: 'top-right',
          autoClose: 5000,
        }
      );
    };

    // {
    //   const data = new FormData();
    //   const filename = Date.now() + file.name;
    //   data.append("name", filename);
    //   data.append("file", file);
    //   newPost.photo = filename;
    //   try {
    //     await axios.post("https://my-blogger-be.herokuapp.com/api/upload", data);
    //   } catch (err) { }
    // }
    // try {
    //   const res = await axios.post("https://my-blogger-be.herokuapp.com/api/posts", newPost);
    //   window.location.replace("/");
    // } catch (err) { }
  };

  return (
    <div className="write">
      <ToastContainer />
      {previewSource && (
        <img
          src={previewSource}
          alt="chosen"
          style={{ height: '350px', marginLeft: '20px' }}
        />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className=" writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            name="image"
            id="fileInput"
            style={{ display: 'none' }}
            onChange={handleFileInputChange}
            value={fileInputSatate}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput titleInput-style"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
