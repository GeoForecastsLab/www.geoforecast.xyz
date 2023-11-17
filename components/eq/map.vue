<template>
    <div >
        <svg ref="root" :width="width + 'px'" :height="height + 'px'" role="img">
        </svg>
    </div>
</template>

<script >
    import * as d3 from 'd3';
    import * as turf from '@turf/turf';
    import { ref } from 'vue'

    const _width = 125;
    const _height = 125;

    export default {
        setup() {
            const root = ref(null);
            return { root }
        },
        props: ['prediction'],
        data() {
            return {
                width: _width,
                height: _height
            }
        },
        async mounted() {
            // Create an SVG container
            const svg = d3.select(this.$refs.root);
            const {lat, long} = this.prediction.point;

            let data = await d3.json(
                "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
            );

            // Define the scale of the projection (you might need to adjust this based on your actual SVG size)
            const scale = Math.min(_width, _height) / 2; // or any other scale factor you find appropriate

            // Calculate center positions
            const translateX = _width / 2;
            const translateY = _height / 2;
            
                // Define the projection (stereographic projection centered on Paris)
            const projection = d3
                    .geoAlbers()
                    .scale(scale) // Use the scale factor calculated above
                    .translate([translateX, translateY]) // Center the map in the SVG
                    .center([long,lat]) // Paris coordinates (longitude, latitude)
                    .rotate([0, 0]); // Rotate the globe to center the specified lat, long 

                // Create a path generator based on the projection
            const path = d3.geoPath().projection(projection);        

            
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

            function drawRedDot() {
                // Convert the longitude and latitude to x and y coordinates
                const [x, y] = projection([long, lat]);

                // Draw a red circle at the calculated x and y coordinates
                svg.append('circle')
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('r', 3) // radius of the circle
                    .style('fill', 'red');
            }


            drawCircle(_width, _height);
            drawClip(_width, _height);

            function filteredFeatures(data, customWidth, customHeight) {
                const center = projection.invert([customWidth / 2, customHeight / 2]);

                function _radiusKm(customWidth, customHeight) {
                    // Calculate the radius in pixels
                    const radiusPixels = Math.min(customWidth, customHeight) / 2;
                    const otherPointPixels = [customWidth / 2 + radiusPixels, customHeight / 2];
                    const otherPointGeo = projection.invert(otherPointPixels);
                    const distanceKm = turf.distance(center, otherPointGeo, { units: 'kilometers' });

                    // Now 'radiusPixels' corresponds to 'distanceKm' kilometers
                    return distanceKm;
                }

                const radius = _radiusKm(customWidth, customHeight);
                const circle = turf.circle(center, radius, { units: 'kilometers' });

                function _isWithinPolygon(polygon) {
                    const poly = turf.polygon(polygon);
                    return turf.booleanOverlap(poly, circle) || turf.booleanWithin(poly, circle);
                }
                
                    // Filter the features (countries) based on the circular region
                return data.features.filter(function(feature) {
                        const geometry = feature.geometry;
                        function _filter() { 
                            if (geometry.type === "MultiPolygon") {
                                // Handle MultiPolygon geometries
                                for (const polygon of geometry.coordinates) {                                
                                    if (_isWithinPolygon(polygon)) {
                                        return true;
                                    }
                                }
                            } else if (geometry.type === "Polygon") {
                                // Handle Polygon geometries
                                if (_isWithinPolygon( geometry.coordinates )) {
                                    return true;
                                }
                            }
                            return false;
                        }

                        try {
                            return _filter();
                        } catch(err) {
                            console.error(err);
                        }
                    });
            }

            const features = filteredFeatures(data, _width, _height);

            // Draw the countries, applying the clip path
            svg.selectAll(".country")
                .data(features)
                .enter().append("path")
                .attr("class", "country")
                .attr("d", path)
                .style("fill", "#d7e8bd") // Color of the water 
                .attr("clip-path", "url(#clip)"); // Color of the earth 
                
            drawRedDot();
        },
        unmounted() {
            const svg = d3.select(this.$refs.root);
            svg.remove();
        }
    }
</script>