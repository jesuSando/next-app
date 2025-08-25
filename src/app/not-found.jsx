import FuzzyText from '@/components/ui/text/FuzzyText';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-black text-white">
            <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
                fontSize="clamp(2rem, 12vw, 10rem)"
                fontWeight={900}
                color="#fff"
            >
                404
            </FuzzyText>
            <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
                fontSize="clamp(2rem, 12vw, 10rem)"
                fontWeight={900}
                color="#fff"
            >
                Not Found
            </FuzzyText>

            <Link href="/" className="underline opacity-80 hover:opacity-100">
                Volver al inicio
            </Link>
        </div>
    );
}
