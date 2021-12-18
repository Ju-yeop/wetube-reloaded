const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const deleteBtn = document.querySelectorAll(".video__comment-delete");
const videocomment = document.getElementById("videoComment");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul");
    const newComment = document.createElement("li");
    newComment.dataset.id = id;
    newComment.className = "video__comment";
    const icon = document.createElement("i");
    icon.className = "fas fa-comment";
    const span = document.createElement("span");
    span.innerText = `${text}`;
    const button = document.createElement("button");
    button.innerText = "❌"
    newComment.appendChild(icon);
    newComment.appendChild(span);
    newComment.appendChild(button);
    videoComments.prepend(newComment);
    button.addEventListener("click", handleDelete);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    const textArea = form.querySelector("textarea");
    const text = textArea.value;
    const videoId = videoContainer.dataset.id;
    if(text===""){
        return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text}),
    });
    if (response.status === 201) {
        textArea.value = "";
        const {newCommentId} = await response.json();
        addComment(text, newCommentId);
    }
};

const handleDelete = async (event) => {
    const videoId = videoContainer.dataset.id;
    const li = event.srcElement.parentNode;
    const {dataset:{id}} = li;
    const response = await fetch(`/api/comments/${id}`, {
        method:"DELETE",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({videoId}),
    });
    if (response.status === 200){
        li.remove();
    }
};

if (form){
    form.addEventListener("submit", handleSubmit);
}

if (deleteBtn){
    deleteBtn.forEach((deleteB) => {
        deleteB.addEventListener("click", handleDelete);
    });
}