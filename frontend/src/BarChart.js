import { useD3 } from './hooks/useD3';
import React from 'react';
import * as d3 from 'd3';
import * as flextree from 'd3-flextree'

function BarChart({ treeData }) {
  const ref = useD3(
    (svg) => {
        var width = window.innerWidth,
            height = window.innerHeight;

        // Remove the old svg
        d3.selectAll("g > *").remove();

        // append the svg object to the body of the page
        const g = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr('transform',`translate(${width/2},100)`)


        const duration = 750;
        let i = 0,
            root = d3.hierarchy(treeData, function(d) {
                return d.children;
            });

        console.log("Fancy UI", root)
        // Collapse after second level
        if (root.children != undefined) {
            root.children.forEach(collapse);
            root.x0 = 0;
            root.y0 = 0;
        }

        const flexLayout = flextree.flextree();

        update(root);
        // Collapse the node and all it's children
        function collapse(d) {
            if (d.children) {
                d._children = d.children
                d._children.forEach(collapse)
                d.children = null
            }
        }

        function update(source) {

            // Assigns the x and y position for the nodes
            var treeData = flexLayout(root)

            // Compute the new tree layout.
            var nodes = treeData.descendants(),
                links = treeData.descendants().slice(1);

            // ****************** Nodes section ***************************

            // Update the nodes...
            var node = g.selectAll('g.node')
                .data(nodes, d=> d.id || (d.id = ++i));

            // Enter any new modes at the parent's previous position.
            var nodeEnter = node.enter().append('g')
                .attr('class', 'node')
                .attr("transform", function(d) {
                    return "translate(" + source.x0 + "," + source.y0 + ")";
                })
                .on('dblclick', click);

            // Add Circle for the nodes
            nodeEnter.append('circle')
                .attr('class', 'node')
                .attr('r', 1e-6)
                .style("fill", function(d) {
                    return d._children ? "lightsteelblue" : "#fff";
                });

            // Add labels for the nodes
            nodeEnter.append('text')
                .attr('pointer-events', 'none')
                .attr('dy', '0.35em')
                .text(function(d) {
                    return d.data.name;
                })
                .attr('text-anchor', 'middle')

            // UPDATE
            var nodeUpdate = nodeEnter.merge(node)
                .attr("fill", "#fff")
                .attr("stroke", "black")
                .attr("stroke-width", "3px;")
                .style('font', '12px consolas')
                .on('click', toggleButton)

            // Transition to the proper position for the node
            nodeUpdate.transition()
                .duration(duration)
                .attr("transform", function(event, i, arr) {
                    const d = d3.select(this).datum();
                    return "translate(" + d.x + "," + d.y + ")";
                });

            // Update the node attributes and style
            nodeUpdate.select('circle.node')
                .attr('r', 50)
                .style("fill", function(d) {
                    return d._children ? "lightsteelblue" : "#fff";
                })
                .attr('cursor', 'pointer')

            // Create Event Handlers for toggling buttons
            function toggleButton(d, i) {
                if (nodeUpdate.select('#button' + i.data.id).empty()) {
                    // Add button
                    d3.select(this)
                        .append('circle')
                        .attr('id', 'button' + i.data.id)
                        .attr('cx', 40)
                        .attr('cy', 40)
                        .attr('r', 25)
                        .attr('stroke', 'black')
                        .attr('fill', '#69a3b2')
                        .on('click', handleOnClick)
                }
                else {
                    // Delete button
                    nodeUpdate.selectAll('#button' + i.data.id).remove()
                    d3.select(this)
                        .on('click', toggleButton)
                }
            }

            function handleOnClick(d, i) {
                alert("clicking")
                d.stopPropagation()  // Prevent propagation to parent
            }

            // Remove any exiting nodes
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(event, i, arr) {
                    const d = d3.select(this).datum();
                    return "translate(" + source.x + "," + source.y + ")";
                })
                .remove();

            // On exit reduce the node circles size to 0
            nodeExit.select('circle')
                .attr('r', 1e-6);

            // On exit reduce the opacity of text labels
            nodeExit.select('text')
                .style('fill-opacity', 1e-6)



            // ****************** links section ***************************

            // Update the links...
            var link = g.selectAll('path.link')
                .data(links, function(d) {
                    return d.id;
                });

            // Enter any new links at the parent's previous position.
            var linkEnter = link.enter().insert('path', "g")
                .attr("class", "link")
                .attr('d', function(d) {
                    var o = {
                        x: source.x0,
                        y: source.y0
                    }
                    return diagonal(o, o)
                });

            // UPDATE
            var linkUpdate = linkEnter.merge(link)
                .attr("fill", "none")
                .attr("stroke", "#ccc")
                .attr("stroke-width", "2px")

            // Transition back to the parent element position
            linkUpdate.transition()
                .duration(duration)
                .attr('d', function(d) {
                    return diagonal(d, d.parent)
                });

            // Remove any exiting links
            var linkExit = link.exit().transition()
                .duration(duration)
                .attr('d', function(event, i, arr) {
                    const d = d3.select(this).datum();
                    var o = {
                        x: source.x,
                        y: source.y
                    }
                    return diagonal(o, o)
                })
                .remove();

            // Store the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });

            // Creates a curved (diagonal) path from parent to the child nodes
            function diagonal(s, d) {
                const path = `M ${s.x} ${s.y}
                C ${(s.x + d.x) / 2} ${s.y},
                ${(s.x + d.x) / 2} ${d.y},
                ${d.x} ${d.y}`

                return path
            }

            // Toggle children on click.
            function click(event, d) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
            }
        }
    },
    [treeData]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 1000,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      {/* <g className="plot-area" /> */}
    </svg>
  );
}

export default BarChart;