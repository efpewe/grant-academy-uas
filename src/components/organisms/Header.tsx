
const Header = () => {
  return (
    <>
    <header className="w-[90%] max-w-[1140px] my-0 mx-auto">
    <div className="flex justify-between items-center px-0 py-[25px] relative z-10">
        <div className="logo">
            <img className="w-[200px]" src="assets/logo.png" alt=""/>
        </div>

        <input type="checkbox" id="menu-toggle" className="hidden"/>
        
        <label htmlFor="menu-toggle" className="hidden cursor-pointer w-[30px] h-[24px] flex-col justify-between z-1001 relative">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
        </label>

        <nav>
            <ul className="list-none flex gap-[45px]">
                <li><a href="#" className="active">HOME</a></li>
                <li><a href="pages/about.html">ABOUT</a></li>
                <li><a href="pages/course.html">COURSE</a></li>
                <li><a href="pages/news.html">NEWS</a></li> 
                <li><a href="pages/subscribe.html">SUBSCRIBE</a></li>
                <li><a href="pages/contact.html">CONTACT</a></li>
            </ul>
        </nav>
    </div>
</header>
    </>
  )
}

export default Header