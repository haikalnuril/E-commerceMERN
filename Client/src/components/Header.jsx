import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-neutral py-2 text-neutral-content">
            <div className="mx-auto nax-w-6xl px-8 flex justify-end">
                <div className="flex gap-x-6 justify-center items-center">
                    <Link to='/login' className="link link-hover text-xs sm:text-sm">
                        Sign In
                    </Link>
                    <Link to='/register' className="link link-hover text-xs sm:text-sm">
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    )
};

export default Header;
