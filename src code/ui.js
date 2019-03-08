const http = new EasyHTTP

class UI{
 constructor(){
  this.post = document.querySelector('#posts')
  this.posttitle = document.querySelector('#title')
  this.postbody = document.querySelector('#body')
  this.postid = document.querySelector('#id')
  this.submitpost = document.querySelector('#postIt')
  this.forstate = 'add'
 }

 clearId(){
   this.postid.value = ''
 }

 fillForm(data){
   this.posttitle.value = data.title
   this.postbody.value = data.body
   this.postid.value = data.id

   this.changeFormState('edit')
 }

 changeFormState(type){
   if(type == 'edit'){
     this.submitpost.textContent = 'Edit Post'
     this.submitpost.style.backgroundColor = 'lightpurple'

     const button = document.createElement('button')
     button.appendChild(document.createTextNode('Cancel Edit'))
     button.className ='cancel'
    //  button.style.backgroundColor = 'pink'
    

     const cont = document.querySelector('#contain')
     const span = document.querySelector('#form')

     cont.insertBefore(button, span)

   }
   else{
    this.submitpost.textContent = 'Post It'
    this.submitpost.style.backgroundColor = 'purple';

    if(document.querySelector('.cancel')){
      document.querySelector('.cancel').remove()
    }

    ui.clearId();
    ui.clearField()

   }
 }
 showPost(posts){
  let output ='';
  
  
 
  posts.forEach((post) =>{
  
   output += `
    <div id= "postStyle">
    <h4>${post.title}</h4>
    <p>${post.body}</p>
    <input type="submit" data-id="${post.id}" class= "edit" value="Edit">
    <input type="submit" data-id="${post.id}" class= "delete" value="delete">
    </div>
    ` 
    

  })
  this.post.innerHTML =output;
  



 }

 showAlert(message){
  const show = document.createElement('div');
  show.className= 'alert';
  show.appendChild(document.createTextNode(message))
  const parent = document.querySelector('#container')
  const before = document.querySelector('#posts')
  parent.insertBefore(show, before)

 setTimeout(function(){
   document.querySelector('.alert').remove()
 },3000)
 }
 clearField(){
  this.posttitle.value = '';
  this.postbody.value = ''
 }

 removePost(target){
   if(target.classList.contains('delete')){
     const id = target.dataset.id
     http.delete(`http://localhost:3000/posts/${id}`)
     .then(() =>{
       ui.showAlert('post deleted')
     })
     .catch(err => err)
   }

 }
 edit(target){
  if(target.classList.contains('edit')){
    const id = target.dataset.id
    const title= target.previousElementSibling.previousElementSibling.textContent;
    const body= target.previousElementSibling.textContent;
    
    const data ={
      id,
      title,
      body
    }
    ui.fillForm(data)
  }
 }

 cancelEdit(target){
   if(target.classList.contains('cancel'))
   ui.changeFormState('add')
 }
}
