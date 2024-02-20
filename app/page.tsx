import ServiceCard from "@/components/ServiceCard";
import Student from '@/public/assets/images/student.png'
import Teacher from '@/public/assets/images/teacher.png'
import Wrench from '@/public/assets/images/wrench.png'
import Password from '@/public/assets/images/password.png'
import { ServicesType } from "@/types";

export default function Home() {
	const services:ServicesType = {
		studentServices: ['Enroll.', 'Take a homework.', 'Do examination', 'ETC.'],
		teacherServices: ['Create subject & class.', 'Create & assign the homework.', 'Create & assign the examination'],
		manualServices: ['How to use our website.', 'PDF file', 'Easy readable'],
		authServices: ['Reset password', 'Change user data that sensitivity', 'Fast response.'],
	}
	return (
		<div className="flex flex-col items-center gap-8">
			<span className="text-5xl text-primary-gradient">XAMS</span>
			<p className=" indent-12 text-md max-md:indent-6 max-md:text-sm"> <span className="text-primary-gradient">XAMS</span> serves as an innovative platform tailored to meet the needs of both educators and learners, offering comprehensive support for conducting examinations and managing assignments. With its user-friendly interface and robust features, XAMS streamlines the assessment process, providing teachers with efficient tools to create, administer, and evaluate tests, while empowering students to engage actively in their learning journey. This dynamic platform fosters collaboration and efficiency within educational settings, enhancing the overall teaching and learning experience.</p>
			<div className="flex justify-evenly w-full max-sm:flex-col max-sm:gap-8">
				<ServiceCard image={Student} title="Student" content={services.studentServices} width={180} height={180}/>
				<ServiceCard image={Teacher} title="Teacher" content={services.teacherServices} width={200} height={200}/>
				<ServiceCard image={Wrench} title="Manual" content={services.manualServices} width={150} height={150}/>
				<ServiceCard image={Password} title="Authentication" content={services.authServices} width={150} height={150}/>
			</div>
		</div>
	);
}
