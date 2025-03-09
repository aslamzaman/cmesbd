import Image from "next/image";

const Loading = ({message}) => {
    return (
        <div className='fixed inset-0 bg-gray-100 bg-opacity-10 z-10'>
            <div className='w-[250px] mt-48 mx-auto flex flex-col items-center justify-center space-y-1'>
                <Image src="/images/loading/dot.png" alt="loading" width={837} height={837} className="w-10 h-auto mx-auto animate-spin" />
                <p className='w-fit text-center text-xl'>{message} <span className='animate-ping'>...</span></p>
            </div>
        </div>
    )
}
export default Loading;