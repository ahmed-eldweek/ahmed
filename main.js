let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads   = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
//get total

let mood ='create';
let check ;

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }else{
        total.style.background = '#a00d02';
        total.innerHtml = '';
    }
}



//creat product
let dataPro ;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}
 

submit.onclick = function(){
    let newPro = {
        title : title.value,
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value,
    }
    if(mood === 'create'){
        if(newPro.count > 1){
            for(let i=0 ; i<newPro.count;i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[check] = newPro;
        mood = 'create';
        submit.innerHTML = 'create';
        count.style.display = 'block';
        
    }
    
    localStorage.setItem('product' , JSON.stringify(dataPro));
    console.log(dataPro);
    clearData()
    showData()
}
showData()

//clear inputs

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '' ;
    discount.value = '' ;
    total.innerHTML = '';
    count.value = '';
    category.value = '' ;
    total.style.background = '#a00d02'
}

//read
function showData(){
let table = '';
for(let i=0 ;i<dataPro.length ;i++){
    table += `
    <tr>
        <td>${i} </td>
        <td>${dataPro[i].title} </td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = "updateData(${i})"  id="update">update</button></td>
        <td><button onclick = "deleteData(${i})"  id="delete">delete </button></td>
        </tr>
    `;
}
document.getElementById('tbody').innerHTML = table ;
let btnDelete = document.getElementById('deleteAll');
if(dataPro.length >0){
btnDelete.innerHTML = `
<button onclick="deleteAll()">deleteAll (${dataPro.length})</button>
`
}else{
    btnDelete.innerHTML = '' ;
}

}

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}


//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    category.value = dataPro[i].category;
    
    count.style.display = 'none';
    submit.innerHTML = 'update';
    mood = 'update';
    check = i;
   scroll({
    top : 0,
    behavior : 'smooth',
   })
}

let searchMood = 'title';
let search = document.getElementById('search');
function getsearchMood(id){
    if(id === 'searchTitle'){
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }else{
        searchMood = 'Categroy';
        search.placeholder = 'Search By Categroy';
    }
    search.focus();
}


function searchData(value){
    let table = '';
    if(searchMood== 'title'){

        for(let i=0 ;i<dataPro.length;i++){
            if(dataPro[i].title.includes(value.toLowerCase())){

                table += `
                <tr>
                    <td>${i} </td>
                    <td>${dataPro[i].title} </td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick = "updateData(${i})"  id="update">update</button></td>
                    <td><button onclick = "deleteData(${i})"  id="delete">delete </button></td>
                    </tr>
                `;
            }
        }

    }
    
    else{

        for(let i=0 ;i<dataPro.length;i++){
            if(dataPro[i].category.includes(value.toLowerCase())){

                table += `
                <tr>
                    <td>${i} </td>
                    <td>${dataPro[i].title} </td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick = "updateData(${i})"  id="update">update</button></td>
                    <td><button onclick = "deleteData(${i})"  id="delete">delete </button></td>
                    </tr>
                `;
            }
        }
    }
    document.getElementById('tbody').innerHTML = table ;
}