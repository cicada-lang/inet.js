import { edgeEqual } from "../edge"
import { HalfEdge } from "../half-edge"
import { Net } from "../net"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { findHalfEdgePort } from "../net/findHalfEdgePort"
import { findPortRecordOrFail } from "../net/findPortRecordOrFail"
import { Port } from "../port"

export function connectPortWithHalfEdge(
  net: Net,
  port: Port,
  halfEdge: HalfEdge,
): void {
  const portRecord = findPortRecordOrFail(net, port.node)
  portRecord[port.name].connection = { halfEdge }

  const halfEdgeEntry = findHalfEdgeEntryOrFail(net, halfEdge)
  if (halfEdgeEntry.port !== undefined) {
    throw new Error(
      `[connectPortWithHalfEdge] halfEdgeEntry is already connected`,
    )
  }

  halfEdgeEntry.port = port

  const otherHalfEdge = halfEdgeEntry.otherHalfEdge
  const otherPort = findHalfEdgePort(net, otherHalfEdge)

  if (otherPort !== undefined) {
    if (port.isPrincipal && otherPort.isPrincipal) {
      const edge = {
        first: halfEdge,
        second: otherHalfEdge,
      }

      if (!net.activeEdges.find((activeEdge) => edgeEqual(activeEdge, edge))) {
        net.activeEdges.push(edge)
      }
    }
  }
}
