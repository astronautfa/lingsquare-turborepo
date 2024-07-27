import { Menu, useChapterOptions, Thumbnail } from '@lingsquare/vidstack';

// TODO : clicking on chapter should jump to chapter
// TODO : fix loading size of chapters
const ChaptersMenu = ({ thumbnails }: { thumbnails: string | undefined }) => {
    const options = useChapterOptions(),
        disabled = !options.length;

    return (
        <div
            className="flex flex-col gap-1"
            defaultValue="default"
            aria-label="View density"
        >
            {options.map(
                ({ cue, label, value, startTimeText, durationText, select, setProgressVar }, i) => (
                    <div
                        className="vds-chapter-radio vds-radio hover:bg-slate-200/70 p-2 min-h-20 rounded-lg cursor-pointer "
                        // value={value}
                        key={value}
                        onClick={() => { select() }}
                        ref={setProgressVar}
                    >
                        {thumbnails ? (
                            <div className='flex gap-1'>
                                <Thumbnail.Root
                                    src={thumbnails}
                                    time={cue.startTime}
                                    className="block rounded-md mb-1 h-[var(--thumbnail-height)] max-h-[60px] min-h-[30px] w-[var(--thumbnail-width)] min-w-[100px] max-w-[140px] overflow-hidden border border-white bg-black"
                                >
                                    <Thumbnail.Img />
                                </Thumbnail.Root>
                                <div className="w-full justify-end pb-1 flex flex-col">
                                    <p className="vds-chapter-radio-label text-slate-950">{label}</p>
                                    <div className='flex justify-between'>
                                        <p className="text-sm text-slate-500">{startTimeText}</p>
                                        <p className="text-sm text-slate-500">{durationText}</p>
                                    </div>
                                </div>
                            </div>
                        ) :
                            <div className="w-full pb-2">
                                <p className="vds-chapter-radio-label text-slate-950">{label}</p>
                                <div className='flex justify-between'>
                                    <p className="text-sm text-slate-500">{startTimeText}</p>
                                    <p className="text-sm text-slate-500">{durationText}</p>
                                </div>
                            </div>}
                    </div>
                )
            )}
        </div>
    )
}

export default ChaptersMenu;
