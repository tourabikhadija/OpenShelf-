import Book from '@/models/Book';


export async function getAllBooks(){
  const books = await Book.find()
  return books
}

export async function getBookById(id:string){
  const book = await Book.findById(id)
  return book
}
export async function creatBook(bookData:{    
    title: string;
    author: string;
    isbn : string;
    category: string;
    publicationYear:string;
    description : string;
}){
  const book = await Book.create(bookData)
  return book
}

