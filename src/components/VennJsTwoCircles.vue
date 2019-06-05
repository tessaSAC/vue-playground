<script>
import * as d3 from 'd3'
import * as venn from 'venn.js'

export default {
  data: _ => ({
    chart: venn
      .VennDiagram()
      .width(500)
      .height(500)
      .wrap(false), // nb: this doesn't help and can be harder to read; TODO: Ask Jared what he prefers

    sets: [
      { sets: [0], label: 'Size 28', size: 28 },
      { sets: [1], label: 'Size 5k', size: 5000 },
      { sets: [0, 1], size: 5, label: 'Size 5' },
    ],
  }),

  mounted() {
    const vennCompareTwo = d3.select('#vennCompareTwo')
    vennCompareTwo.datum(this.sets).call(this.chart)
    d3.selectAll('#vennCompareTwo .venn-circle path').style('fill-opacity', 0.3)

    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'venntooltip') // TODO: replace with tooltip class in app

    const getHoveredSelection = this.getHoveredSelection

    vennCompareTwo
      .selectAll('g')
      .on('mouseover', function(dataset, i) {
        // sort all the areas relative to the current item
        // nb: not sure of relevance of this function but not all areas have border highlight without this
        venn.sortAreas(vennCompareTwo, dataset)

        if (!dataset.label) return // don't show tooltip if there's no label

        // display tooltip with label
        tooltip
          .transition()
          .duration(400)
          .style('opacity', 0.9)

        tooltip.text(dataset.label)

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

    // DE-OVERLAP LABELS:
    this.relax()
  },

  methods: {
    getHoveredSelection(context) {
      return d3
        .select(context)
        .transition('tooltip')
        .duration(400)
        .select('path')
    },

    relax() {
      // https://web.archive.org/web/20140609125438/http://blog.safaribooksonline.com/2014/03/11/solving-d3-label-placement-constraint-relaxing
      // https://web.archive.org/web/20140609093256/http://jsfiddle.net/thudfactor/B2WBU/

      const textLabels = d3.selectAll('.label') // get all Venn diagram labels
      const alpha = 0.5 // How fast to animate labels de-overlapping
      const spacing = 10 // Label line height

      let again = false // Whether overlap needs to be recalculated

      textLabels.each(function(d, i) {
        const a = this
        const da = d3.select(a)
        const y1 = da.attr('y')

        textLabels.each(function(d, j) {
          const b = this
          // a & b are the same element and don't collide.
          if (a === b) return
          const db = d3.select(b)

          // a & b are on opposite sides of the chart and don't collide
          if (da.attr('text-anchor') !== db.attr('text-anchor')) return
          // Now let's calculate the distance between these elements.
          const y2 = db.attr('y')
          const deltaY = y1 - y2

          // If spacing is greater than our specified spacing, they don't collide.
          if (Math.abs(deltaY) > spacing) return

          // If the labels collide, we'll push each of the two labels up and down a little bit.
          again = true

          const sign = deltaY > 0 ? 1 : -1
          const adjust = sign * alpha

          da.attr('y', +y1 + adjust)
          db.attr('y', +y2 - adjust)
        })
      })

      // Adjust our line leaders here so that they follow the labels.
      if (again) setTimeout(this.relax, 20)
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
