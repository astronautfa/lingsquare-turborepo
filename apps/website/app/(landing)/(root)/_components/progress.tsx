
import LandingProgressHeatmap from "./progress-heatmap"

const LandingProgress = () => {
    return (
        <section id="progress">
            <div className="bg-white py-20 mb-32">
                <div className="mx-auto max-w-7xl px-4 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center px-4">
                        <h2 className="text-base font-semibold leading-7 text-sky-600"></h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Track your <span className="text-sky-700">Momentum</span>
                        </p>
                        <p className="mt-6 text-lg leading-7 text-gray-600">
                            Learning is a habit. Celebrate progress not perfection with powerful tools to build lasting learning habits.
                        </p>
                    </div>
                    <div className="flex justify-center px-2.5 lg:px-20 py-10">
                        <LandingProgressHeatmap />
                    </div>
                    {/* <div className="mx-auto max-w-2xl lg:text-center px-2">
                        <p className="mt-0 text-md leading-7 text-gray-600">
                            Habits are not built by focusing on streak counts. They are built by being consistent throughout the process. Every streak is inevitably broken. It’s how you bounce back that truly matters in the long run.
                        </p>
                    </div> */}
                </div>
            </div>
        </section>

    )
}

export default LandingProgress



