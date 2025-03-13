import Image from 'next/image'

const Printpdf = ({ url, w, h }) => {
    return (
        <Image
            src={url}
            width={w}
            height={h}
            alt="Picture of the author"
            priority={true}
        />
    )
}
export default Printpdf;