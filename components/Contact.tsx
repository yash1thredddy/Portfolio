'use client';
import { useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import SectionWrapper from "./SectionWrapper"
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function Contact() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();  // Stop event propagation

        if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
            toast.warning("Please fill in all fields");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("/api/mail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Message sent successfully!");
                setValues({ name: "", email: "", message: "" });
            } else {
                throw new Error(data.message || "Failed to send message");
            }
        } catch (error) {
            console.error("Contact form error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };

    return (
        <SectionWrapper id="contact" className="mb-16 mx-4 lg:mx-0">
            <h2 className="text-center text-4xl">Contact Me</h2>
            <ToastContainer 
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
            />

            <div className="w-full lg:w-5/6 2xl:w-3/4 mt-10 md:mt-16 mx-auto flex justify-between rounded-xl">
                <Image 
                    unoptimized={true} 
                    quality={100} 
                    alt="contact" 
                    src="/contact.png" 
                    className="hidden md:block w-1/2 h-full object-cover" 
                    width={1000} 
                    height={1000} 
                    priority
                />
                <div className="flex-1 p-4 md:p-6">
                    <h3 className="text-2xl">Get in touch</h3>
                    <p className="text-gray-400 mb-4 text-sm md:text-base">
                        My inbox is always open! 💌 Whether you&apos;ve got a burning question or want to drop a friendly &quot;hello&quot;, I&apos;m all ears!👂 Let&apos;s chat! 🎉
                    </p>

                    <form 
                        onSubmit={handleSubmit} 
                        className="flex flex-col gap-4 rounded-xl"
                        noValidate
                    >
                        <input 
                            onChange={handleChange} 
                            value={values.name} 
                            name="name" 
                            type="text" 
                            placeholder='Full Name *' 
                            className="outline-none bg-gray-100 dark:bg-grey-800 placeholder-gray-400 rounded-lg py-3 px-4" 
                            disabled={loading}
                            required
                        />
                        <input 
                            onChange={handleChange} 
                            value={values.email} 
                            name="email" 
                            type="email" 
                            placeholder='Email *' 
                            className="outline-none bg-gray-100 dark:bg-grey-800 placeholder-gray-400 rounded-lg py-3 px-4" 
                            disabled={loading}
                            required
                        />
                        <textarea 
                            onChange={handleChange} 
                            value={values.message} 
                            name="message" 
                            rows={4} 
                            placeholder='Message *' 
                            className="outline-none resize-none bg-gray-100 dark:bg-grey-800 placeholder-gray-400 rounded-lg py-3 px-4" 
                            disabled={loading}
                            required
                        />
                        <button 
                            type="submit"
                            disabled={loading} 
                            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 transition-colors text-white rounded-lg disabled:cursor-not-allowed disabled:opacity-70 self-end"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    Sending <BiLoaderAlt className="animate-spin" />
                                </span>
                            ) : (
                                "Say Hello 👋"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </SectionWrapper>
    );
}