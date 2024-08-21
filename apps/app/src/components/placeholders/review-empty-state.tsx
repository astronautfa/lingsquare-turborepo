import { Button, SeparatorGradient } from "@ui/components";
import { PlusRegular } from "@ui/icons";
import Link from "next/link";

const ReviewEmptyState = () => {
    return (
        <div className="mx-5">
            <div className="relative block rounded-lg p-12 text-center focus:outline-none focus:ring-2 focus:ring-SKY-700 focus:ring-offset-2 backdrop-blur-xs transition-colors duration-400">
                <div className="mx-auto max-w-lg">
                    <h2 className="text-base font-semibold leading-6">
                        You have no decks
                    </h2>
                    <p className="mt-1 text-sm ">
                        Get started by creating a deck
                    </p>
                    <SeparatorGradient gradient className="my-5 opacity-30" />
                    <div>
                        <Link href={'/create-deck' as any}>
                            <Button variant={"outline"}>
                                <PlusRegular className="w-3 h-3 mr-2" />
                                Create Deck
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ReviewEmptyState;
