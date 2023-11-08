<template>
    <div >
        <svg :id="uid" :width="width + 'px'" :height="height + 'px'" role="img">
        </svg>
    </div>
</template>

<script >
    import * as d3 from 'd3';
    import { ref, getCurrentInstance } from 'vue'
    const _width = 100;
    const _height = 100;

export default {
    setup() {
        const inst = getCurrentInstance();
        const uid = ref('svg_' + inst.uid);
        return { uid }
    },
    data() {
        return {
            width: _width,
            height: _height
        }
    },
    async mounted() {
        // Create an SVG container
        const svg = d3.select("#" + this.uid);

        let data = await d3.json(
            "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
        );

        let geoJson = {
            "type": "FeatureCollection",
            "features": [
                {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [2.3522, 48.8566]
                },
                "properties": {
                    "name": "Paris",
                    "country": "France"
                }
                }
            ]
        }

        function drawCircle(customWidth, customHeight) {
            // Calculate the radius as half the smaller of the two dimensions
            const radius = Math.min(customWidth, customHeight) / 2;

            // Calculate center positions
            const centerX = customWidth / 2;
            const centerY = customHeight / 2;

            // Draw a circle to represent the globe
            svg
                .append("circle")
                .attr("cx", centerX) // Set the x-coordinate of the center of the circle
                .attr("cy", centerY) // Set the y-coordinate of the center of the circle
                .attr("r", radius) // Set the radius of the circle
                .style("fill", "#a9d6ec") // Set the fill color of the circle
                .attr("clip-path", "url(#clip)"); // Apply the clip path if necessary
        }

        function drawClip(customWidth, customHeight) {
            // Calculate the radius as half the smaller of the two dimensions
            const radius = Math.min(customWidth, customHeight) / 2;

            // Calculate center positions
            const centerX = customWidth / 2;
            const centerY = customHeight / 2;

            // Define a clip path with the same dimensions as the globe circle
            svg.append("clipPath") // Define a new clipPath element
                .attr("id", "clip") // Assign an ID for reference
                .append("circle")
                .attr("cx", centerX)
                .attr("cy", centerY)
                .attr("r", radius); // This radius should match the circle used for the globe
        }


        function drawGeo(customWidth, customHeight) {
            // Define the scale of the projection (you might need to adjust this based on your actual SVG size)
            const scale = Math.min(customWidth, customHeight) / 2; // or any other scale factor you find appropriate

            // Calculate center positions
            const translateX = customWidth / 2;
            const translateY = customHeight / 2;
        
            // Define the projection (stereographic projection centered on Paris)
            const projection = d3
                .geoAlbers()
                .scale(scale) // Use the scale factor calculated above
                .translate([translateX, translateY]) // Center the map in the SVG
                .center([2.3522, 48.8566]) // Paris coordinates (longitude, latitude)
                .rotate([-2.3522, 0]) // Rotate to center Paris
                ; // Clip the back half of the sphere

            // Create a path generator based on the projection
            const path = d3.geoPath().projection(projection);
            return path;
        }

        const path = drawGeo(_width, _height);
        drawCircle(_width, _height);
        drawClip(_width, _height);

        // Draw the countries, applying the clip path
        svg.selectAll(".country")
            .data(data.features)
            .enter().append("path")
            .attr("class", "country")
            .attr("d", path)
            .style("fill", "#d7e8bd") // Replace with your preferred color
            .attr("clip-path", "url(#clip)"); // Apply the clipPath to each country                     
    },
    unmounted() {
        const uid = this.uid;
        const svg = d3.select("#" + uid);
        svg.remove();
    }
}
</script>