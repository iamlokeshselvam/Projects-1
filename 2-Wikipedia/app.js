const form=document.querySelector("#form");
const search=document.querySelector("#input");
const btn=document.querySelector("#btn");
const result=document.querySelector("#result-wrapper");
const myArr=[]
class UI{ 
async Wikipedia(){
  
    try{
   if(result.innerHTML===""){
    const code =await search.value;
    var url =await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=${code}`);
    const response =await url.json();
    const urlLink=await response.query.search;
    
   urlLink.forEach(e => {
       const title =e.title;
       const snippet =e.snippet;
       const pageid =e.pageid;
       const url = `https://en.wikipedia.org/?curid=${pageid}`;
       const a = document.createElement('a');
       a.href=`${url}`
       a.className='blocks';
       a.innerHTML=`
                     <h3>${title}</h3>
                      <p>${snippet}</p>
   `
   console.log(a);
   myArr.push(a);
   myArr.forEach(e=>{
         result.append(e);
    })
    }); 
   }
   else{
    result.innerHTML="";
    const code =await search.value;
    var url =await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=${code}`);
    const response =await url.json();
    const urlLink=await response.query.search;
    const myArr=[]
   urlLink.forEach(e => {
       const title =e.title;
       const snippet =e.snippet;
       const pageid =e.pageid;
       const url = `https://en.wikipedia.org/?curid=${pageid}`;
       const a = document.createElement('a');
       a.href=`${url}`
       a.className='blocks';
       a.innerHTML=`
                     <h2>${title}</h2>
                      <p>${snippet}</p>
   `
   console.log(a);
   myArr.push(a);
   myArr.forEach(e=>{
         result.append(e);
    })
    });
    
   }
   
}
catch{
    if(!url){
    console.error("err");
    }
}
search.value="";
}

}



const ui= new UI();

form.addEventListener("click",(e)=>{
    e.preventDefault();
});
btn.addEventListener("click",ui.Wikipedia)


