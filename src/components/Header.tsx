import Link from 'next/link';


export default function Header(){
    return(
        <div>

        <ul>
        <h1>OpenShelf </h1>

        <Link href="/">
        <li>Accueil</li>
        </Link>
         <Link href="/books/create">
         <li>Ajouter </li>
         </Link>

        </ul>

        </div>
    );
}