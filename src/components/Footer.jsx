function Footer() {
    return (
        <footer className="bg-blue-900 text-white py-8 hidden md:block">
            {/* Centered container with padding */}
            <div className="container mx-auto px-6 flex justify-center">
                <div className="text-center">
                    <h3 className="font-bold">Quick Links</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#contact" className="hover:underline">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
