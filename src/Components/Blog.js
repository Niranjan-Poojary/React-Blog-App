//Blogging App using Hooks

import {useState,useRef,useEffect} from "react";
import {db} from "../firebaseInit";

import { collection, addDoc,doc, setDoc,getDocs, onSnapshot, deleteDoc } from "firebase/firestore"; 


function Blog(){

    //const[title,setTitle]=useState("");
    //const[content,setContent]=useState("");

    const[formData,setFormData]=useState({title:"", content:""})
    const[blogs,setBlogs]=useState([])
    const titleRef=useRef(null)

    useEffect(()=>{
        titleRef.current.focus()
    },[])

    useEffect(()=>{
        if(blogs.length && blogs[0].title){
            document.title = blogs[0].title;
        }else{
            document.title = "No blogs"
        }
    },[blogs])

    
    useEffect(()=>{

        // async function fetchData(){
        //     const snapShot=await getDocs(collection(db,"blogs"));
        //     console.log(snapShot);

        //     const blogs = snapShot.docs.map((doc)=>{
        //         return{
        //             id:doc.id,
        //             ...doc.data()
        //         }
        //     })
        //     console.log(blogs);
        //     setBlogs(blogs);
            
        // }
        // fetchData();

        //To get real time update

        const unsub = onSnapshot(collection(db,"blogs"),(snapShot)=>{
            const blogs = snapShot.docs.map((doc)=>{
                return{
                    id:doc.id,
                    ...doc.data()
                }
            })
            console.log(blogs);
            setBlogs(blogs);
                
            
        })

    },[]);

    //Passing the synthetic event as argument to stop refreshing the page on submit
   async function handleSubmit(e){
        e.preventDefault();
        titleRef.current.focus();
       // setBlogs([{title:formData.title,content:formData.content},...blogs])

        // Add a new document with a generated id.
             const docRef=doc(collection(db, "blogs"))
             await setDoc(docRef, {
                title: formData.title,
                content: formData.content,
                createdOn:new Date()
            });
            //console.log("Document written with ID: ", docRef.id);
        // setTitle("");
        // setContent("");
        setFormData({title:"",content:""})
        
    }

    async function removeBlog(id){
        //setBlogs(blogs.filter((blog,index)=> i!==index)
        const docRef = doc(db,"blogs",id);
       await deleteDoc(docRef);


       // )
    }
    return(
        <>
        <h1>Write a Blog</h1>
        <div className="section">
            <form onSubmit={handleSubmit}>

                 {/* Row component to create a row for first input field */}
                <Row label="Title">
                    <input className="input"
                           placeholder="Enter the title here..."
                           //value={title}
                           value={formData.title}
                          // onChange={(e)=>setTitle(e.target.value)}
                          ref={titleRef}
                           onChange={(e)=>setFormData({title:e.target.value,content:formData.content})}
                    />
                </Row>

                 {/* Row component to create a row for Text area field */}
                <Row label="Content">
                    <textarea className="input content"
                              placeholder="Content goes here..."
                              required
                              //value={content}
                              value={formData.content}
                             // onChange={(e)=>setContent(e.target.value)}
                              onChange={(e)=>setFormData({title:formData.title,content:e.target.value})}
                    />          
                </Row>

                {/* Button to submit the blog */} 
                <button className="btn">ADD</button>
            </form>
        </div>
        <hr/>
        {/* Section where submitted blogs will be displayed */}
        <h2>Blog</h2>
        {blogs.map((blog,i)=>(
            <div className="blog" key={i}>
                 <h3>{blog.title}</h3>
                 <p>{blog.content}</p>

                    <div className="blog-btn">
                        <button onClick={()=>removeBlog(blog.id)} className="btn remove">Delete</button>
                    </div>
            </div>
            
        ))}
        </>
         
        
    )
}
//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
export default Blog;