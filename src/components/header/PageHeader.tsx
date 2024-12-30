import { Mountains, Lines, HorizontalLines } from '../decorative/Shapes';

export default function PageHeader() {
    return (
        <div className="relative w-full h-48 bg-[#1C3559]">
            {/* Top left decorative elements */}
            <div className="absolute top-12 left-8">
                <HorizontalLines />
                <Mountains />
            </div>

            {/* Bottom lines spanning full width */}
            <div className="absolute bottom-0 w-full">
                <Lines />
            </div>
        </div>
    );
}
