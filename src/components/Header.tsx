import Link from 'next/link';
import "@/style/Header.css";

export default function Header(){
    return(
       

        
        <header className="header">
          <nav className='navbar'>
        
        <h1 className="logo">OpenShelf </h1>

         <ul className='navLinks'>
            
              <Link href="/">
                 <li>Accueil</li>
              </Link>

              <Link href="/books/create">
                 <li>Ajouter </li>
              </Link>

         </ul>
        
        </nav>
        </header>
       
    );
}