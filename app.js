// showing overlay
const showOverlay = document.querySelector('.showBtn')
const overlay = document.querySelector('.overlay')
const hideOverlay = document.querySelector('.hide')

const hideModel = (e)=>{
    e.preventDefault()
    overlay.classList.remove('show')
} 

showOverlay.addEventListener('click',(e)=>{
    e.preventDefault()
    overlay.classList.add('show')
})
hideOverlay.addEventListener('click',hideModel)

// inter face 
const container =  document.querySelector('.cardContainer')



class book {
    constructor(title = '',author = '',pages = '0',isRead = false){
        this.title = title;
        this.author  = author,
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library{
    constructor(){
        this.library = []
    };
    // check if the book is in library
    inLibrary = function(book) {
        return this.library.some(( item )=>{ return item.title === book.title} )
    }
    // add book
    addBook = function(book){
        if (!this.inLibrary(book)) {
            this.library.push(book)
        }
    }
    // remove book 
    removeBook = function(book){
        this.library = this.library.filter((item)=> item != book)
    }
    // sreach for a book
    findBook = function(book){
        return this.library.find((item)=> item == book)
    }
}

const library = new Library();

const createBook = (book)=>{

    const parentElemetn = document.createElement('article');
    const Elemetn_img_container = document.createElement('div');
    const Elemetn_img = document.createElement('img');
    const Elemetn_title = document.createElement('h1');
    const Elemetn_author = document.createElement('h2');
    const Elemetn_pages = document.createElement('p');
    const Elemetn_Isread = document.createElement('p');
    const Elemetn_Btns_container = document.createElement('div');
    const Elemetn_done = document.createElement('button');
    const Elemetn_delete = document.createElement('button');
    
    parentElemetn.classList.add('card')
    Elemetn_img_container.classList.add('img')
    Elemetn_img.src = 'Logo.svg';
    Elemetn_Btns_container.classList.add('btns')
    if (book.isRead) {
        
        Elemetn_done.classList.add('done');
    }else{
        Elemetn_done.classList.add('delete');

    }

    parentElemetn.appendChild(Elemetn_img_container)
    Elemetn_img_container.appendChild(Elemetn_img);
    parentElemetn.appendChild(Elemetn_title);
    parentElemetn.appendChild(Elemetn_author);
    parentElemetn.appendChild(Elemetn_pages);
    parentElemetn.appendChild(Elemetn_Isread);
    parentElemetn.appendChild(Elemetn_Btns_container);
    Elemetn_Btns_container.appendChild(Elemetn_done)
    Elemetn_Btns_container.appendChild(Elemetn_delete);
    
    Elemetn_title.textContent = book.title;
    Elemetn_author.textContent = book.author;
    Elemetn_pages.textContent = book.pages;
    Elemetn_done.textContent = book.isRead? 'done': 'not yet';
    Elemetn_delete.textContent = 'delete';

    container.appendChild(parentElemetn)

    Elemetn_delete.onclick = ()=> removeBook(book);
    Elemetn_done.onclick = ()=> toggleRead(book);

}

const getinfo = ()=>{
    
    const book_title = document.querySelector('.title').value;
    const book_author = document.querySelector('.author').value
    const book_pages = document.querySelector('.pages').value
    const book_IsRead = document.querySelector('.read').checked

    return new book(book_title,book_author,book_pages,book_IsRead)
}

const updateContainer = ()=>{
    clearContainer();
    for(let book of library.library){
        createBook(book)
    }


}
const clearContainer = ()=>{
    container.innerHTML = '';

}

const addBook = (e)=>{
    e.preventDefault();
    const newBook = getinfo();
    if (library.inLibrary(newBook)) {
        return
    }else{
        library.addBook(newBook);
        updateContainer()
    }
    hideModel(e)
    saveTolocal()

}
const removeBook = (book)=>{
    library.removeBook(book);
    updateContainer()
}
const toggleRead = (book)=>{
    book.isRead = !book.isRead
    updateContainer()
}
const addBtn =  document.querySelector('.add').addEventListener('click',addBook)