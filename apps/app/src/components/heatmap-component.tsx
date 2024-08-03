'use client'

import CalHeatmap from "heatmap"
import "@ui/styles/heatmap.css"

const Heatmap = () => {
    const cal = new CalHeatmap();
    cal.paint({ theme: 'dark' });

    return <div id="cal-heatmap"></div>;
}

export default Heatmap