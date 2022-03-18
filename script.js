let movieDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'

let movieData

let canvas = d3.select('#canvas')

let drawTreeMap = () => {

  let hierarchy = d3.hierarchy(movieData, (node) => {
    return node['children']
  }).sum(node => {
    return node['value']
  }).sort((node1, node2) => {
    return node2['value'] - node1['value']
  })

  let createTreeMap = d3.treemap()
                        .size([1000, 600])

  createTreeMap(hierarchy)

  let movieTitles = hierarchy.leaves()

  let block = canvas.selectAll('g')
                    .data(movieTitles)
                    .enter()
                    .append('g')

  block.append('rect')
       .attr('class', 'tile')

}


d3.json(movieDataUrl).then(
  (data, error) => {
    if(error) {
      console.log(error)
    } else {
      movieData = data.children
      drawTreeMap()
    }
  }
)
