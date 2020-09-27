import DijkstraSP from './DijkstraSP'
import EdgeWeightedDigraph from './EdgeWeightedDigraph'

const findDiameter = (edgeWeightedDigraph: EdgeWeightedDigraph) => {
  let diameter = -Infinity

  for (let vertex = 0; vertex < edgeWeightedDigraph.V(); vertex++) {
    const dijkstraSP = new DijkstraSP(edgeWeightedDigraph, vertex)

    for (let vertex2 = 0; vertex2 < edgeWeightedDigraph.V(); vertex2++) {
      if (dijkstraSP.distTo(vertex2) > diameter) {
        diameter = dijkstraSP.distTo(vertex2)
      }
    }
  }
}
