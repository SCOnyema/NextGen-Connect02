import SectionIllustrator from '../assets/group-career.svg';

function HeroSection() {
    return (
        <section className="flex flec-col items-center md:text-left justify-center text-center md:justify-between md:flex-row  py-16 bg-gray-50">
            <div className="w-full w-1/2 px-8">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900">Unlock Your Career!</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Get direct access to internships, mentorship, and more. Start shaping your future today!
                </p>
                <button className="mt-8 bg-green-600 text-white px-6 py-3 rounded-full">Explore Opportunities</button>
            </div>
            <div className="w-full lg:w-1/2 hidden lg:block">
                <img src={SectionIllustrator} alt="Career Opportunities" className="w-full h-auto"/>
            </div>
        </section>
    );
}

export default HeroSection;
