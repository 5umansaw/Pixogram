import React , {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import M from "materialize-css"

const CreatePost = ()=>{
    const nevigate = useNavigate()
    const [title , setTitle] = useState("")
    const [body , setBody] = useState("")
    const [image , setImage] = useState("")
    const [url , setUrl] = useState("")
    
    useEffect(()=>{
        if(url){
          fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
               title,
               body,
               pic: url
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error , classes: "#ef5350 red lighten-1"})
            }else{
                M.toast({html: "Created post successfully" , classes:"#43a047 green darken-1"})
                nevigate('/')
            }
        })
        .catch(err=>console.log(err))
        }
    },[url])

    const postDetails = ()=>{
       const data = new FormData()
       data.append("file" , image)
       data.append("upload_preset" , "Insta-clone")
       data.append("cloud_name" , "dhax11hsw")
       fetch("https://api.cloudinary.com/v1_1/dhax11hsw/image/upload" , {
        method: "post",
        body: data
       })
       .then(res=>res.json())
       .then(data=>{
         setUrl(data.url)
       })
       .catch(err=>console.log(err))
    }

     return (
        <div className="card"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}>
            <input type="text" 
            placeholder="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            <input type="text" 
            placeholder="body"
            value = {body}
            onChange={(e)=>setBody(e.target.value)}
            />
            <div class="file-field input-field">
              <div class="btn">
                <span>Upload Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
              </div>
              <div class="file-path-wrapper">
                <input class="file-path validate" type="text"/>
              </div>
           </div>
           <button className="btn waves-effect waves-light"
           onClick={()=>postDetails()}>Create Post</button>
        </div>
     )
}

export default CreatePost