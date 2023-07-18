import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <div className="absolute inset-y-1/2 ">
                        <div className="">
                            <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                Ooops!
                                Não há nada para ver por aqui!
                            </h1>
                            <Link to="/" className="transition-colors sm:w-full lg:w-auto  rounded py-2 px-4 text-center bg-indigo-600 text-white hover:bg-indigo-500 hover:text-white focus:outline-none">Voltar para Home</Link>
                        </div>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
                    </div>
                </div>
            </div>
            <div>
                <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
        </div>
    );
};

export default ErrorPage;