import Link from 'next/link';
import Navbar from '../navbar';
import './header.scss';


export default () =>
<div>
    <div className="header">
        <h1>
            <Link href="/">
                <a href="#">I Want</a>
            </Link>
        </h1>
        <blockquote className="blockquote">
            <footer className="blockquote-footer">
                <cite title="Marketplace of Desire">Marketplace of Desire</cite>
            </footer>
        </blockquote>
    </div>
    <Navbar />
</div>