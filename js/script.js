
let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');

class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI{
    // constructor(){

    // }
    // if we use static then we can use directly, else we have to use constructor and call these function object wise
    // when any of the method doesn't depend on the data of the constructor then we can use them as static
    static addToBooklist(book){
        let list = document.querySelector('#book-list');
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="delete">X</a></td>`;
        list.appendChild(row);
    }
    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
    static showAlert(message, className){
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000);
    }
    static deleteFormBook(target){
        if(target.hasAttribute('href')){
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());
            UI.showAlert('Book Removed!', 'success');
        }
    }
}


class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static displayBooks(){
        let books = Store.getBooks();
        books.forEach(book=>{
            UI.addToBooklist(book);
        });
    }
    static removeBook(isbn){
        let books = Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}


form.addEventListener('submit',newBook);
booklist.addEventListener('click',removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBooks());


function newBook(e){
    let title = document.querySelector('#title').value,
    author = document.querySelector('#author').value,
    isbn =  document.querySelector('#isbn').value;
    // let ui = new UI();
    if(title===''||author===''||isbn===''){
        // ui.showAlert("Please fill all the fields","error");
        UI.showAlert("Please fill all the fields","error"); 
    }
    else{
        let book = new Book(title, author, isbn);
        // ui.addToBooklist(book);
        // ui.clearFields();
        // ui.showAlert("Book Added!","success");
        UI.addToBooklist(book);
        UI.clearFields();
        UI.showAlert("Book Added!","success"); 
        Store.addBook(book);
    }
    e.preventDefault();
}

function removeBook(e){
    // let ui = new UI();
    // ui.deleteFormBook(e.target);
    // ui.showAlert('Book Removed!', 'success');
    UI.deleteFormBook(e.target);
    e.preventDefault();
}