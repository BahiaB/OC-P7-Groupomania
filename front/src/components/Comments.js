import axios from 'axios';
import trash from"../image/icons/trash.svg"
function Comments({commentId, commentUserId, comment, firstName , admin, getComments}) {
   
    const token = JSON.parse(localStorage.token);
    const userId = JSON.parse(localStorage.userId);
    const deleteComment = () => {
       
        axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}api/post/comment/${commentId}`,

            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log("res", res);
            getComments();
           
            if (res.data.error) {
                console.log("ici222", res.data.errors)

            }
        })
            .catch((err) => {
                console.log(err);
            });
    }

 
    return (
        
        <div className='comment'>
            <p className='name'>{firstName}</p>
            <p className='text'> {comment}</p>
        
            {commentUserId === userId  || admin === 1 ? (
    <li onClick={deleteComment} id="delete_comment" className='active-btn'><img src={trash} alt="poubelle"/></li>
)
    : ("")
}
       
        </div>
        
    )

}

export default Comments; 
