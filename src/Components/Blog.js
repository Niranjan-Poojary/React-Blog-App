//Blogging App using Hooks

import {useState} from "react";

function Blog(){

    const[title,setTitle]=useState("");
    const[content,setContent]=useState("");

    //Passing the synthetic event as argument to stop refreshing the page on submit
    function handleSubmit(e){
        e.preventDefault();
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
                           value={title}
                           onChange={(e)=>setTitle(e.target.value)}
                    />
                </Row>

                 {/* Row component to create a row for Text area field */}
                <Row label="Content">
                    <textarea className="input content"
                              placeholder="Content goes here..."
                              value={content}
                              onChange={(e)=>setContent(e.target.value)}
                    />          
                </Row>

                {/* Button to submit the blog */} 
                <button className="btn">ADD</button>
            </form>
        </div>
        <hr/>
        {/* Section where submitted blogs will be displayed */}
        <h2>Blog</h2>
        <h3>{title}</h3>
        <p>{content}</p>
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