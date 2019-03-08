
const easyhttp = new EasyHTTP
const ui = new UI
document.addEventListener('DOMContentLoaded' , getPost);

document.querySelector('#postIt').addEventListener('click' , submitPost);

document.querySelector('#posts').addEventListener('click', deletePost);

document.querySelector('#posts').addEventListener('click', editPost);

document.querySelector('#contain').addEventListener('click', cancelPost);



function getPost(){
 easyhttp.get('http://localhost:3000/posts')
 .then(data => ui.showPost(data))
 
 .catch(err => console.log(err))
 // e.preventDefault()
}

function submitPost(e){
 const title = document.querySelector('#title').value
 const body =  document.querySelector('#body').value
 const id =  document.querySelector('#id').value
 
 const data = {
  title: title,
  body: body
 }
 if(title==''|| body==''){
  ui.showAlert('please fill all fields')
 }
 else{
  if(id ==''){
 easyhttp.post('http://localhost:3000/posts', data)
 .then(() => {
  ui.showAlert('Post Added');
  ui.clearField();
  getPost();
 })
 .catch(err =>console.log(err))
 e.preventDefault()
}
 else{
  easyhttp.put(`http://localhost:3000/posts/${id}`, data)
  .then(() => {
   ui.showAlert('post Updated');
   ui.changeFormState('add');
   getPost()
  })
  .catch(err => err)
 }
 }

}
function deletePost(e){
 // const id = e.target

 // const able = id.children;
   
ui.removePost(e.target)
getPost();
 
}

function editPost(e){
 // const id = e.target

 // const able = id.children;
   
ui.edit(e.target)
// getPost();
 
}

function cancelPost(e){
 // const id = e.target

 // const able = id.children;
   
ui.cancelEdit(e.target)
// getPost();
 
}

