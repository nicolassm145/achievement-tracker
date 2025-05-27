const FooterComponent = () => {
    return (
        <footer className="bg-gray-800 text-white py-2 px-36">
        <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            <p>
            <a href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</a> | 
            <a href="/terms-of-service" className="text-blue-400 hover:underline"> Terms of Service</a>
            </p>
        </div>
        </footer>
    );
    } 
export default FooterComponent;