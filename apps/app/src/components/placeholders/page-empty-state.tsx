import { Button, SeparatorGradient } from "@ui/components";
import { PlusRegular } from "@ui/icons";
import Link from "next/link";

type actionBtns = {
    label: string,
    href: string,
    icon: React.ReactNode
}[]


const EmptyState = ({ title, subtitle, actionBtns }: { title: string, subtitle: string, actionBtns: actionBtns }) => {
    return (
        <div className="mx-5">
            <div className="relative block rounded-lg p-12 text-center focus:outline-none focus:ring-2 focus:ring-SKY-700 focus:ring-offset-2 backdrop-blur-xs transition-colors duration-400">
                <div className="mx-auto max-w-lg">
                    <h2 className="text-base font-semibold leading-6">
                        {title}
                    </h2>
                    <p className="mt-1 text-sm ">
                        {subtitle}
                    </p>
                    <SeparatorGradient gradient className="my-5 opacity-30" />
                    <div className="flex flex-row gap-2 items-center justify-center">
                        {actionBtns.map((actionBtn, index) => (<Link key={index} href={actionBtn.href as any}>
                            <Button variant={"outline"}>
                                {actionBtn.icon}
                                {actionBtn.label}
                            </Button>
                        </Link>))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmptyState;
