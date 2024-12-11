// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";
import { geoTimes } from 'd3-geo-projection'
import * as d3 from "d3";
import { WORLD_LIST } from '@/lib/const'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const D3Map = ({ instances, onSelect }: { instances: any, onSelect: (d: any) => void }) => {
  const active = 'asian'
  console.log(instances)

  const { width } = useWindowSize()
  const [list, setList] = useState([])

  const svgWidth = useMemo(()=>{
    return Math.max(375, 0.62* width) 
    // 640/830
  }, [width])

  const svgHeight = useMemo(()=>{
    return 0.493*svgWidth
    // return 0.554 * svgWidth
  }, [svgWidth])

  const getJson = async (item) => {
    const { value: id } = item
    const data = await d3.json(`/geojson/${id}.json`)
    return {
      ...data,
      ...item,
      id
    }
  }


  const fetchJson =  async ()=> {
    let jsonArr = [...WORLD_LIST]
    jsonArr = jsonArr.sort((a,b)=>(a.priority - b.priority))
    let arr = await Promise.allSettled(jsonArr.map(item=>getJson(item)))
    arr = arr.map(item=>item.value)
    setList(arr);
  }

  const render = () => {
    const offset = [svgWidth/2, svgHeight/1.6];
    const features = list.reduce((res, item)=>{
      res.push(...item.features)
      return res
    },[])
    let projection = geoTimes().rotate([-8.2, 0])
    let path = d3.geoPath().projection(projection);
    const bounds  = path.bounds({
      "type":"FeatureCollection", features
    });
    let scale = 250
    const hscale  = scale* svgHeight  / (bounds[1][0] - bounds[0][0]);
    const vscale  = scale* svgWidth / (bounds[1][1] - bounds[0][1]);
    scale   = (hscale < vscale) ? hscale : vscale;
    projection = projection.scale(scale).translate(offset);
    path = d3.geoPath().projection(projection);


    const xMargin = 4
    const yMargin = 2

    const svg = d3.select(".svg")
    svg.selectAll(".group")
    .data(list)
    .join("g")
    .attr("class", "group")
    .attr("id", d=>d.id)

    svg.selectAll('.group')
    .selectAll("path")
    .data(d=>d.features.map(item=>({
      ...item,
      fill: d.id === active?'#FC0407':'#fff'
    })))
    .join("path")
    .attr("fill", (d) => d.fill??'#fff')
    .attr("stroke", "#868686")
    .attr("stroke-width",0.27)
    .attr("d", path)

    const buttons = svg.selectAll(".buttons")
    .data(JSON.parse(JSON.stringify(instances)))
    .join("g")
    .attr("class", "buttons")
    .attr("transform", (d)=>{
      return `translate(${projection([d.geo.longitude, d.geo.latitude])[0]}, ${projection([d.geo.longitude, d.geo.latitude])[1]})`
    })
    .style("cursor","pointer")
    .on('mouseover', function(_,d) {
      d3.select(this).raise();
    })
    .on('click', function(_,d) {
      onSelect(d)
    })




    buttons
    .selectAll("rect")
    .data(d=>{
      return [d]
    })
    .join("rect")
    .style("fill", (d)=>{
      return "#F3F7FF"
     })
    .style("filter", (d)=>{
       return "drop-shadow(0px 4px 7px rgba(0, 0, 0, 0.25))"
    })


    const buttonInner = buttons
    .selectAll("g")
    .data(d=>{
      return [d]
    })
    .join("g")
    .attr("class", "inner")

    const text = buttonInner
    .selectAll('text')
    .data(d=>{
      return [d]
    })
    .join("text")
    .text(d=>d.geo.ip + ": " + d.geo.city + ", " + d.geo.country)
    .style("color", "rgba(0, 0, 0, 0.9)")
    .style("font-weight", 500)
    .style("font-size", `${Math.max(12,(14))}px`)

    buttonInner
    .selectAll('.icon')
    .data(d=>[d])
    .join("image")
    .attr('width', 24)
    .attr('height', 24)
    .attr("xlink:href", d=> `/${d.provider}.svg`)
    .attr("class", "icon")
    .attr("x", xMargin)
    .attr("y", yMargin)
    .each(function(d) { d.icon = this.getBBox() })

    text
    .attr("dy", '0.75em')
    .attr("x", d=>d.icon.width + 6)
    .attr("y", 0)


    buttonInner
    .each(function(d) { d.bbox = this.getBBox() })

    text
    .attr("x", d=>d.icon.width + 6)
    .attr("y", function(d){
      const height = this.getBBox()?.height
      return yMargin + (d.bbox.height - height)/2
    })

    buttons
    .selectAll("rect")
    .data(d=>[d])
    .join("rect")
    .attr("width", d => (d.bbox?.width + 2 * xMargin + 2))
    .attr("height", d => (d.bbox?.height ))
    .attr("fill", "#F3F7FF")
    .attr("rx", 2 )
    .attr("ry", 2 )
  }
  

  useEffect(()=>{
    fetchJson()
  },[])

  useEffect(()=>{
    if(!list.length && width) return
    render()
  },[width, instances, list])
  

  return (
      <svg className='D3_map' width={svgWidth} height={svgHeight}>
        <g className="svg"></g>
      </svg>
)}
 