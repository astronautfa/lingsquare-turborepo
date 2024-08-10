export type BentoGridInfoType = {
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    icon?: React.ReactNode;
};

export const BentoGridInfo = ({ title, description, icon }: BentoGridInfoType) => {
    return (
        <div className="absolute bottom-3 md:relative pt-1">
            <div className="group-hover/bento:translate-x-1 transition duration-200">
                {icon}
                <div className="font-sans font-bold text-neutral-600 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs">
                    {description}
                </div>
            </div>
        </div>
    );
};