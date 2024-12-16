import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const features = [
    {
        title: "Enjoy on your TV",
        description: "Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
        image: "assets/tv.png",
        alt: "TV Image",
        video: "assets/hero-vid.m4v",
    },
    {
        title: "Download your shows to watch offline",
        description: "Save your favorites easily and always have something to watch.",
        image: "assets/stranger-things-lg.png",
        alt: "Stranger Things Image",
        video: null,
    },
    {
        title: "Watch everywhere",
        description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
        image: "assets/device-pile.png",
        alt: "Devices Image",
        video: "assets/video-devices.m4v",
    },
    {
        title: "Create profiles for kids",
        description: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
        image: "assets/kids.png",
        alt: "Kids Profile Image",
        video: null,
    },
];

const AuthScreen = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        navigate("/signup?email=" + email);
    };

    return (
        <div className='hero-bg relative'>

            <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
                <img
                    src='assets/netflix-logo.png'
                    alt='Netflix Logo'
                    className='w-32 md:w-52'
                />
                <Link
                    to='/login'
                    className='text-white bg-red-600 py-1 px-2 rounded'
                >
                    Sign In
                </Link>
            </header>


            <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
                <h1 className='text-4xl md:text-6xl font-bold mb-4'>
                    Unlimited movies, TV shows, and more
                </h1>
                <p className='text-lg mb-4'>Watch anywhere. Cancel anytime.</p>
                <p className='mb-4'>
                    Ready to watch? Enter your email to create or restart your membership.
                </p>
                <form
                    className='flex flex-col md:flex-row gap-4 w-1/2'
                    onSubmit={handleFormSubmit}
                >
                    <input
                        type='email'
                        placeholder='Email address'
                        className='p-2 rounded flex-1 bg-black/80 border border-gray-700'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'
                        type='submit'
                    >
                        Get Started
                        <ChevronRight className='size-8 md:size-10' />
                    </button>
                </form>
            </div>


            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />


            {features.map((feature, index) => (
                <div
                    key={index}
                    className={`py-10 bg-black text-white`}
                >
                    <div className={`flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                        {/* Left Side or Right Side depending on index */}
                        <div className={`flex-1 ${index % 2 === 1 ? 'md:text-left text-center' : 'text-center md:text-left'}`}>
                            <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>
                                {feature.title}
                            </h2>
                            <p className='text-lg md:text-xl'>{feature.description}</p>
                        </div>

                        {/* Right Side or Left Side depending on index */}
                        <div className='flex-1 relative'>
                            <img
                                src={feature.image}
                                alt={feature.alt}
                                className='mt-4 z-20 relative'
                            />
                            {feature.video && (
                                <video
                                    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10'
                                    playsInline
                                    autoPlay
                                    muted
                                    loop
                                >
                                    <source src={feature.video} type='video/mp4' />
                                </video>
                            )}
                        </div>

                    </div>
                    {
                        index !== features.length - 1 &&
                        <div className='h-1 w-full bg-[#232323]' aria-hidden='true' />
                    }
                </div>
            ))}



            <div className='h-2 w-full bg-[#232323]' aria-hidden='true' />
        </div>
    );
};

export default AuthScreen;
