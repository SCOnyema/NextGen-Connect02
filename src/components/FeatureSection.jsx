import InternIcon from '../assets/icons/intern-icon.svg'
import MentorIcon from '../assets/icons/mentorship.svg'
import WorkshopIcon from '../assets/icons/workshop-icon.svg'
import CompeteIcon from '../assets/icons/compete-icon.svg'

function FeatureSection() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto max-w-screen-lg px-6 grid grid-cols-2 gap-6">
                <div className="p-6 bg-gray-100 rounded-lg text-center">
                    <img src={InternIcon} alt="Intern Icon" className="mx-auto mb-4 w-12 h-12" />
                    <h3 className="text-xl font-bold">Internship</h3>
                    <p className="mt-2 text-gray-600">Find top internships tailored for you.</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg text-center">
                    <img src={MentorIcon} alt="MentorIcon" className="mx-auto mb-4 w-12 h-12" />
                    <h3 className="text-xl font-bold">Mentorship</h3>
                    <p className="mt-2 text-gray-600">Connect with experienced mentors.</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg text-center">
                    <img src={WorkshopIcon} alt="WorkshopIcon" className="mx-auto mb-4 w-12 h-12" />
                    <h3 className="text-xl font-bold">Workshop</h3>
                    <p className="mt-2 text-gray-600">Join skill-building workshops.</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg text-center">
                    <img src={CompeteIcon} alt="Compete Icon" className="mx-auto mb-4 w-12 h-12" />
                    <h3 className="text-xl font-bold">Compete</h3>
                    <p className="mt-2 text-gray-600">Participate in exciting competitions.</p>
                </div>
            </div>
        </section>
    );
}

export default FeatureSection;