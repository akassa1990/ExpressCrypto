const MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

class Person{
    constructor(name,email){
        this.name = name;
        this.email = email;
    }
    getName(){
        return this.name;
    }
    getEmail(){
        return this.email;
    }
}

class Book{
    constructor(isbn,author,tags){
        this.isbn = isbn;
        this.author = author;
        this.tags = tags;
        this.borrowed = null;
    }
    changeBorrowed(borrow){
        this.borrowed = borrow;
    }
}

class BorrowedBook{
    constructor(student,borrowedDate,dueDate){
        this.student=student;
        this.borrowedDate = borrowedDate;
        this.dueDate = dueDate;
    }
    changeBook(book){
        this.book = book;
    }
}

MongoClient.connect(url,{ useNewUrlParser: true }, (err,db)=>{
    if(err) throw err;
    console.log('Connected to DB');
    var dbo = db.db('library');
    
    var author = new Person('Trevor Noah','tnoah@hotmail.com');
    var stu = new Person('Ahmed Kassa','akassa@mum.edu');
    var bDate = new Date(2018,6,1);
    var dueDate = new Date(2018,7,2);
    var borrowedbk = new BorrowedBook(stu,bDate,dueDate);
    var tags = ['Born a Crime','Trump','Dictator'];
    var book = new Book('112233',author,tags);
    book.changeBorrowed(borrowedbk);
    var obj = {book:book};

    dbo.collection('books').insertOne(obj,(err,result)=>{
        if(err) throw err;
        console.log('book added successfully');
    });
    db.close();
});