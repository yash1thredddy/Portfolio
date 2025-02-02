import { useState } from 'react';
import { skill } from '@/types/main';
import SkillCard from "./SkillCard"
import SectionWrapper from '../SectionWrapper';

interface Props {
    skillData: skill[]
}

const Skills = ({ skillData }: Props) => {

    const categories = Array.from(new Set(skillData.map((s: { category: any; }) => s.category)))
    const [category, setCategory] = useState(categories[0])

    return (
        <SectionWrapper id='skills' className="min-h-screen mt-16 md:mt-8 mx-6 md:mx-4 xl:my-24 2xl:my-8">
            <h2 className="text-5xl text-center mb-10">Tech Stack</h2>

            <div className="md:w-2/3 lg:w-1/2 overflow-x-auto scroll-hide mx-auto mt-8 bg-white dark:bg-grey-800 p-3 flex justify-between items-center gap-4 rounded-lg">
                {categories.map((c: string, i: number) => (
                    <span 
                        key={i} 
                        onClick={() => setCategory(c)} 
                        className={`p-2.5 md:p-3 text-base md:text-lg w-full text-center cursor-pointer rounded-lg ${
                            category.toLowerCase() === c.toLowerCase() 
                                ? "bg-violet-600 dark:bg-violet-600 text-white" 
                                : "bg-white dark:bg-grey-800 hover:bg-gray-100 hover:dark:bg-grey-900"
                        } transition-all capitalize`}
                    >
                        {c}
                    </span>
                ))}
            </div>

            <div className="lg:w-4/5 2xl:w-2/3 my-12 mx-auto md:px-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-12">
                {skillData
                    .filter((s: skill) => s.category.toLowerCase() === category.toLowerCase())
                    .map((s: any, i: number) => (
                        <SkillCard key={i} {...s} />
                    ))
                }
            </div>
        </SectionWrapper>
    )
}

export default Skills