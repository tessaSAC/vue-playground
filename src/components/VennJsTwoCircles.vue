<script>
import * as d3 from 'd3'
import * as venn from 'venn.js'

export default {
  data: _ => ({
    chart: venn
      .VennDiagram()
      .width(500)
      .height(300)
      .wrap(false),

    sets: [
      { sets: [0], label: 'Size: 0xxxx.xm', name: 'blue group', size: 1 },
      { sets: [1], label: 'Size: 1xxx.xm', name: 'orange group', size: 200 },
      { sets: [0, 1], size: 0.2, label: 'Size: 2xxxx.xm', name: 'overlap' },
    ],
  }),

  mounted() {
    this.chart.orientationOrder(function (a, b) { return a.setid.localeCompare(b.setid); })
    const vennCompareTwo = d3.select('#vennCompareTwo')
    vennCompareTwo.datum(this.sets).call(this.chart)
    d3.selectAll('#vennCompareTwo .venn-circle path').style('fill-opacity', 0.3)

    this.addTooltips(vennCompareTwo)
    this.deOverlapLabels()
  },

  methods: {
    addTooltips(vennDiagram) {
      const tooltip = d3
        .select('body')
        .append('div')
        .attr('class', 'venntooltip')

      const getHoveredSelection = this.getHoveredSelection

      vennDiagram
        .selectAll('g')
        .on('mouseover', function(dataset, i) {
          // sort all the areas relative to the current item
          // nb: not sure of relevance of this function but not all areas have border highlight without this
          venn.sortAreas(vennDiagram, dataset)

          if (!dataset.name) return // don't show tooltip if there's no name

          // display tooltip with name
          tooltip
            .transition()
            .duration(400)
            .style('opacity', 0.9)
          tooltip.text(dataset.name)

          // highlight hovered dataset
          getHoveredSelection(this)
            .style('fill-opacity', dataset.sets.length == 1 ? 0.4 : 0.1)
            .style('stroke', 'white')
            .style('stroke-opacity', 1)
        })

        // place tooltip
        .on('mousemove', function() {
          tooltip
            .style('left', d3.event.pageX + 'px')
            .style('top', d3.event.pageY - 28 + 'px')
        })

        // hide tooltip
        .on('mouseout', function(dataset, i) {
          tooltip
            .transition()
            .duration(400)
            .style('opacity', 0)

          getHoveredSelection(this)
            .style('fill-opacity', dataset.sets.length == 1 ? 0.25 : 0.0)
            .style('stroke-opacity', 0)
        })
    },

    getHoveredSelection(context) {
      return d3
        .select(context)
        .transition('tooltip')
        .duration(400)
        .select('path')
    },

    deOverlapLabels() {
      // NB: when the circles have total or almost total overlap, Venn.js moves the labels around automatically, i.e. this method is not responsible for their weird placement

      const textLabels = d3.selectAll('#vennCompareTwo .label') // get all Venn diagram labels
      const shiftIncrement = 0.5 // how much to de-overlap labels by each loop
      const theSpaceBetween = 12 // the minimum amount of vertical space between each label

      let delta_y,
          shiftAgain = false,
          shiftAmount,
          shiftDirection

      textLabels.each(function(d, i) {
        const contextA = this

        let labelA,
            labelA_left,
            labelA_right,
            labelA_y,

            labelB,
            labelB_left,
            labelB_right,
            labelB_y,

            tempNodeRef

        labelA = d3.select(contextA)
        tempNodeRef = labelA.node().getBoundingClientRect()  // more accurate than d3's getBBox which seems to be relative to the svg canvas?

        labelA_left = tempNodeRef.x
        labelA_right = tempNodeRef.x + tempNodeRef.width
        labelA_y = +labelA.attr('y')

        textLabels.each(function(d) {
          const contextB = this

          if(contextA === contextB) return  // the context is the same, therefore the element will be the same

          labelB = d3.select(contextB)
          tempNodeRef = labelB.node().getBoundingClientRect()

          labelB_left = tempNodeRef.x,
          labelB_right = tempNodeRef.x + tempNodeRef.width
          labelB_y = +labelB.attr('y')

          if(labelA_left <= labelB_left && labelA_right <= labelB_left) return  // if labelA is completely to the left of labelB return
          if(labelB_left <= labelA_left && labelB_right < labelA_left) return // if labelB is completely to the left of labelA return

          // otherwise the labels horizontally overlap
          shiftLabels()
        })

        function shiftLabels() {  // NB: can't figure out why this deOverlaps less if method and variable names are instantiated outside the loop
          // refresh coordinates
          labelA_y = +labelA.attr('y')
          labelB_y = +labelB.attr('y')

          delta_y = labelA_y - labelB_y

          if(Math.abs(delta_y) > theSpaceBetween) return  // don't do anything if the labels are already vertically spaced apart enough

          shiftAgain = true
          shiftDirection = delta_y > 0 ? 1 : -1
          shiftAmount = shiftDirection * shiftIncrement

          labelA.attr('y', labelA_y + shiftAmount)
          labelB.attr('y', labelB_y - shiftAmount)

          if(shiftAgain) setTimeout(shiftLabels, 20)  // check if we need to shift labels even more
        }
      })
    },
  },
}
</script>

<template>
  <div id="vennCompareTwo" ref="vennDiagram"/>
</template>

<style lang="scss">
.venntooltip {
  position: absolute;
  text-align: center;
  background: #333;
  color: #ddd;
  padding: 5px;
  border: 0px;
  border-radius: 8px;
  opacity: 0;
}
</style>
