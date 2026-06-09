"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

import type { UniverseGraph } from "@/types/movie";

export function UniverseGraphClient({ graph }: { graph: UniverseGraph }) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = ref.current.clientWidth || 960;
    const height = 620;
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const links = graph.links.map((link) => ({ ...link }));
    const nodes = graph.nodes.map((node) => ({ ...node }));

    const simulation = d3
      .forceSimulation(nodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(links).id((d) => (d as { id: string }).id).distance(140).strength((d) => (d as { strength: number }).strength))
      .force("charge", d3.forceManyBody().strength(-520))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(58));

    const link = svg
      .append("g")
      .attr("stroke", "rgba(255,255,255,.18)")
      .attr("stroke-width", 1.5)
      .selectAll("line")
      .data(links)
      .join("line");

    const node = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .style("cursor", "grab");

    node
      .append("circle")
      .attr("r", (d) => (d.type === "movie" ? 30 : 24))
      .attr("fill", (d) => (d.type === "movie" ? "rgba(236,72,153,.85)" : d.type === "director" ? "rgba(34,211,238,.85)" : "rgba(139,92,246,.85)"))
      .attr("stroke", "rgba(255,255,255,.45)")
      .attr("stroke-width", 1.5);

    node
      .append("text")
      .text((d) => d.label)
      .attr("text-anchor", "middle")
      .attr("y", 48)
      .attr("fill", "white")
      .attr("font-size", 12)
      .attr("font-weight", 700);

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => ((d.source as d3.SimulationNodeDatum).x ?? 0))
        .attr("y1", (d) => ((d.source as d3.SimulationNodeDatum).y ?? 0))
        .attr("x2", (d) => ((d.target as d3.SimulationNodeDatum).x ?? 0))
        .attr("y2", (d) => ((d.target as d3.SimulationNodeDatum).y ?? 0));

      node.attr("transform", (d) => `translate(${(d as d3.SimulationNodeDatum).x ?? 0},${(d as d3.SimulationNodeDatum).y ?? 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [graph]);

  return <svg ref={ref} className="h-[620px] w-full rounded-[2rem] border border-white/10 bg-black/30" />;
}
