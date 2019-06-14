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
      { sets: [0], label: 'Size: 0xxxx.xm', name: 'orange group', size: 1 },
      { sets: [1], label: 'Size: 1xxx.xm', name: 'blue group', size: 200 },
      { sets: [0, 1], size: 0.2, label: 'Size: 2xxxx.xm', name: 'overlap' },
    ],
  }),

  mounted() {
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
      const textLabels = d3.selectAll('#vennCompareTwo .label') // get all Venn diagram labels
      const alpha = 0.5 // how much to de-overlap labels by each loop
      const spacing = 10 // the minimum amount of vertical space between each label

      let again = false // whether overlap needs to be recalculated

      textLabels.each(function(_, idx) {
        if(idx > textLabels.length - 2) return  // don't compare labels if there aren't two left to compare

        const contextA = this,
              shiftIncrement = 0.5,
              theSpaceBetween = 10

        let labelA,
            labelA_left,
            labelA_right,
            labelA_y,

            labelB,
            labelB_left,
            labelB_right,
            labelB_y,

            delta_y,
            shiftAgain,
            shiftAmount,
            shiftDirection,

            tempNodeRef

        labelA = d3.select(contextA)
        tempNodeRef = labelA.node().getBBox()
        labelA_left = tempNodeRef.x
        labelA_right = tempNodeRef.x + tempNodeRef.width
        labelA_y = tempNodeRef.y

        ;[ labelA_left, labelA_right, labelA_y ] = [ tempNodeRef.x, (tempNodeRef.x + tempNodeRef.width), tempNodeRef.y ]
        // NB from Di Fan: can't start semi-colonless code with { or [

        textLabels.each(function() {
          const contextB = this

          labelB = d3.select(contextB)  // idgy this is never the same as labelA.....
          tempNodeRef = labelB.node().getBBox()
          labelB_left = tempNodeRef.x,
          labelB_right = tempNodeRef.x + tempNodeRef.width
          labelB_y = tempNodeRef.y

          delta_y = labelA_y - labelB_y
          if(Math.abs(delta_y) > theSpaceBetween) return  // don't do anything if the labels are already vertically spaced apart enough

          if(labelA_right > labelB_left && labelA_left < labelB_right || labelB_right > labelA_left && labelB_left < labelA_right) {  // if the labels horizontally overlap
            console.log(labelA_right, labelB_left)
            console.log(labelA_left, labelB_right)
            console.dir(labelA.node())
            console.dir(labelB.node())

            shiftAgain = true
            shiftDirection = delta_y > 0 ? 1 : -1
            shiftAmount = shiftDirection * shiftIncrement

            labelA.attr('y', labelA_y + shiftAmount)
            labelB.attr('y', labelB_y - shiftAmount)
          }

          if(again) setTimeout(this.deOverlapLabels, 20)  // check if we need to shift labels even more
        })


        // textLabels.each(function(d, j) {
        //   const b = this
        //   if (a === b) return // a & b are the same element and don't collide.

        //   const db = d3.select(b)

        //   // Now let's calculate the distance between these elements.
        //   const y2 = db.attr('y')
        //   const deltaY = y1 - y2

        //   if (Math.abs(deltaY) > spacing) return // If spacing is greater than our specified spacing, they don't collide.

        //   // If the labels collide, we'll push each of the two labels up and down a little bit.
        //   again = true

        //   const sign = deltaY > 0 ? 1 : -1
        //   const adjust = sign * alpha

        //   da.attr('y', +y1 + adjust)
        //   db.attr('y', +y2 - adjust)
        // })
      })

      // Adjust our line leaders here so that they follow the labels.
      if (again) setTimeout(this.deOverlapLabels, 20)
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
