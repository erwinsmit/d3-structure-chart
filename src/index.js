const svg = d3.select("svg");

const sizes = {
  svgContainer: {
    width: 900,
    height: 900,
    margin: 50
  },
  rectangle: {
    width: 150,
    height: 90,
    margin: 20
  },
  centreCircle: {
    width: 80
  }
};

svg.attr("width", sizes.svgContainer.width);
svg.attr("height", sizes.svgContainer.height);

const data = {
  top: [
    {
      title: "Bank",
      subtitle: "ABN Amro, London"
    },
    {
      title: "Director",
      subtitle: "Amber Smith"
    },
    {
      title: "Company Secretary",
      subtitle: "Important company"
    },
    {
      title: "Director",
      subtitle: "John Jones"
    }
  ],
  bottom: [
    {
      title: "John JONES",
      subtitle: "Director"
    },
    {
      title: "KPMG, Luxembourg",
      subtitle: "Auditor"
    },
    {
      title: "Orca, Tokyo",
      subtitle: "Shareholder"
    },
    {
      title: "ABN Amro, London",
      subtitle: "Bank"
    }
  ],
  left: [
    {
      title: "Ernst & Young, BVI",
      subtitle: "Auditor"
    },
    {
      title: "BVI Ltd",
      subtitle: "Company Secretary"
    },
    {
      title: "John JONES",
      subtitle: "Director"
    },
    {
      title: "Americas Holdings",
      subtitle: "Shareholder"
    }
  ],
  right: [
    {
      title: "ABN Amro, London",
      subtitle: "Bank"
    },
    {
      title: "Amber SMITH",
      subtitle: "Director"
    },
    {
      title: "Ben BAINES",
      subtitle: "Director"
    },
    {
      title: "Park Limited",
      subtitle: "Subsidiary"
    }
  ]
};

const topRectangleBinding = svg.selectAll("rect").data(data.top);
const bottomRectangleBinding = svg.selectAll("rect").data(data.bottom);
const leftRectangleBinding = svg.selectAll("rect").data(data.left);
const rightRectangleBinding = svg.selectAll("rect").data(data.right);

const topAreas = topRectangleBinding.enter().append("g");
const bottomAreas = bottomRectangleBinding.enter().append("g");
const leftAreas = leftRectangleBinding.enter().append("g");
const rightAreas = rightRectangleBinding.enter().append("g");

const topRectangles = topAreas.append("rect");
const bottomRectangles = bottomAreas.append("rect");
const leftRectangles = leftAreas.append("rect");
const rightRectangles = rightAreas.append("rect");

function setRectangles(rectangles, color) {
  rectangles
    .attr("y", (d, i) => {
      return 0;
    })
    .style("fill", color)
    .attr("x", (d, i) => {
      return 0;
    })
    .attr("width", sizes.rectangle.width)
    .attr("height", sizes.rectangle.height)
    .attr("rx", 15)
    .attr("ry", 15);
}

function setLabelsToAreas(areas, color) {
  areas
    .append("text")
    .text(d => d.title)
    .attr("fill", color)
    .attr("x", "10")
    .attr("y", "30");

  areas
    .append("text")
    .text(d => d.subtitle)
    .attr("fill", color)
    .attr("x", "10")
    .attr("y", "50");
}

function setHorizontalAreas(areas, position) {
  const areaWidthWithMargin = sizes.rectangle.width + sizes.rectangle.margin;
  const areaCount = areas._groups[0].length;
  const totalAreasWidth = areaCount * areaWidthWithMargin;

  const offset = (sizes.svgContainer.width - totalAreasWidth) / 2 + sizes.rectangle.margin / 2;
  const getXValue = i => i * areaWidthWithMargin + offset;
  const yPosition = position === "top" ? sizes.svgContainer.margin : sizes.svgContainer.height - sizes.rectangle.height - sizes.svgContainer.margin;

  areas
    .attr("transform", (d, i) => {
      return `translate(${getXValue(i)}, ${yPosition})`;
    })

    .attr("position", position)
    .attr("width", sizes.rectangle.width)
    .attr("height", sizes.rectangle.height)
    .attr("x", (d, i) => getXValue(i))
    .attr("y", yPosition);
}

function setVerticalAreas(areas, position) {
  const areaHeightWithMargin = sizes.rectangle.height + sizes.rectangle.margin;
  const areaCount = areas._groups[0].length;
  const totalAreasHeight = areaCount * areaHeightWithMargin;

  const offset = (sizes.svgContainer.height - totalAreasHeight) / 2 + sizes.rectangle.margin / 2;
  const getYValue = i => i * areaHeightWithMargin + offset;
  const xPosition = position === "left" ? sizes.rectangle.margin : sizes.svgContainer.width - sizes.rectangle.width - sizes.rectangle.margin;

  areas
    .attr("transform", (d, i) => {
      return `translate(${xPosition}, ${getYValue(i)})`;
    })

    .attr("position", position)
    .attr("width", sizes.rectangle.width)
    .attr("height", sizes.rectangle.height)
    .attr("x", xPosition)
    .attr("y", (d, i) => getYValue(i));
}

setRectangles(leftRectangles, "#57bb81");
setRectangles(topRectangles, "#e4e4e4");
setRectangles(bottomRectangles, "#e4e4e4");
setRectangles(rightRectangles, "#8ca8ba");

setLabelsToAreas(topAreas, "#000");
setLabelsToAreas(bottomAreas, "#000");
setLabelsToAreas(leftAreas, "#fff");
setLabelsToAreas(rightAreas, "#fff");

setHorizontalAreas(topAreas, "top");
setHorizontalAreas(bottomAreas, "bottom");
setVerticalAreas(leftAreas, "left");
setVerticalAreas(rightAreas, "right");

const mainCircle = svg
  .append("g")
  .attr("transform", `translate(${sizes.svgContainer.width / 2}, ${sizes.svgContainer.height / 2})`)
  .attr("cx", sizes.svgContainer.width / 2)
  .attr("cy", sizes.svgContainer.height / 2);

const mainCircleElement = mainCircle
  .append("circle")
  .attr("r", sizes.centreCircle.width / 2)
  .style("fill", "#114B5F");

const mainCircleBlob = mainCircle
  .append("path")
  .attr(
    "d",
    "M25,9.94736842 L25,4.42105263 L17.9347826,4.42105263 L17.9347826,6.63157895 L15.2173913,6.63157895 L15.2173913,9.94736842 L14.5,9.94736842 C14.3026794,9.22861249 13.7503293,8.66695972 13.0434783,8.46631579 L13.0434783,5.52631579 L16.8478261,5.52631579 L16.8478261,0 L8.15217391,0 L8.15217391,5.52631579 L11.9565217,5.52631579 L11.9565217,8.46631579 C11.2496707,8.66695972 10.6973206,9.22861249 10.5,9.94736842 L7.06521739,9.94736842 L7.06521739,7.73684211 L0,7.73684211 L0,13.2631579 L7.06521739,13.2631579 L7.06521739,11.0526316 L10.5,11.0526316 C10.6973206,11.7713875 11.2496707,12.3330403 11.9565217,12.5336842 L11.9565217,15.4736842 L8.15217391,15.4736842 L8.15217391,21 L16.8478261,21 L16.8478261,15.4736842 L13.0434783,15.4736842 L13.0434783,12.5336842 C13.7503293,12.3330403 14.3026794,11.7713875 14.5,11.0526316 L15.2173913,11.0526316 L15.2173913,14.3684211 L17.9347826,14.3684211 L17.9347826,16.5789474 L25,16.5789474 L25,11.0526316 L17.9347826,11.0526316 L17.9347826,13.2631579 L16.3043478,13.2631579 L16.3043478,7.73684211 L17.9347826,7.73684211 L17.9347826,9.94736842 L25,9.94736842 Z M19.0217391,5.52631579 L23.9130435,5.52631579 L23.9130435,8.84210526 L19.0217391,8.84210526 L19.0217391,5.52631579 Z M9.23913043,1.10526316 L15.7608696,1.10526316 L15.7608696,4.42105263 L9.23913043,4.42105263 L9.23913043,1.10526316 Z M5.97826087,12.1578947 L1.08695652,12.1578947 L1.08695652,8.84210526 L5.97826087,8.84210526 L5.97826087,12.1578947 Z M15.7608696,19.8947368 L9.23913043,19.8947368 L9.23913043,16.5789474 L15.7608696,16.5789474 L15.7608696,19.8947368 Z M12.5,11.5168421 C11.9477153,11.5168421 11.5,11.0615864 11.5,10.5 C11.5,9.93841361 11.9477153,9.48315789 12.5,9.48315789 C13.0522847,9.48315789 13.5,9.93841361 13.5,10.5 C13.5,11.0615864 13.0522847,11.5168421 12.5,11.5168421 Z M19.0217391,12.1578947 L23.9130435,12.1578947 L23.9130435,15.4736842 L19.0217391,15.4736842 L19.0217391,12.1578947 Z"
  )
  .attr("fill", "#fff")
  .attr("transform", "translate(-12, -9)")
  .attr("y", 0);

const lineCreater = d3
  .line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(d3.curveBasis);

const drawLines = function(objects, position, color) {
  var lines = [];

  const mainCircleElement = mainCircle._groups[0][0];
  const objectElements = objects._groups[0];

  lines = objectElements.map(objectElement => {
    let lineOffsets = {
      mainCircleOffsetX: 0,
      mainCircleOffsetY: 0,
      objectOffsetX: 0,
      objectOffsetY: 0
    };

    switch (position) {
      case "top":
        lineOffsets.mainCircleOffsetX = mainCircleElement.getAttribute("cx");
        lineOffsets.mainCircleOffsetY = mainCircleElement.getAttribute("cy") - 80;
        lineOffsets.objectOffsetX = parseInt(objectElement.getAttribute("x")) + sizes.rectangle.width / 2;
        lineOffsets.objectOffsetY = parseInt(objectElement.getAttribute("y")) + 150;
        break;
      case "bottom":
        lineOffsets.mainCircleOffsetX = mainCircleElement.getAttribute("cx");
        lineOffsets.mainCircleOffsetY = parseInt(mainCircleElement.getAttribute("cy")) + 80;
        lineOffsets.objectOffsetX = parseInt(objectElement.getAttribute("x")) + sizes.rectangle.width / 2;
        lineOffsets.objectOffsetY = parseInt(objectElement.getAttribute("y")) - 55;
        break;
      case "left":
        lineOffsets.mainCircleOffsetX = mainCircleElement.getAttribute("cx") - 80;
        lineOffsets.mainCircleOffsetY = parseInt(mainCircleElement.getAttribute("cy"));
        lineOffsets.objectOffsetX = parseInt(objectElement.getAttribute("x")) + sizes.rectangle.width + 50;
        lineOffsets.objectOffsetY = parseInt(objectElement.getAttribute("y")) + sizes.rectangle.height / 2;

        break;
      case "right":
        lineOffsets.mainCircleOffsetX = parseInt(mainCircleElement.getAttribute("cx")) + 80;
        lineOffsets.mainCircleOffsetY = parseInt(mainCircleElement.getAttribute("cy"));
        lineOffsets.objectOffsetX = parseInt(objectElement.getAttribute("x")) + sizes.rectangle.width - 200;
        lineOffsets.objectOffsetY = parseInt(objectElement.getAttribute("y")) + sizes.rectangle.height / 2;
        break;
      default:
    }

    return [
      {
        x: mainCircleElement.getAttribute("cx"),
        y: mainCircleElement.getAttribute("cy")
      },
      {
        x: lineOffsets.mainCircleOffsetX,
        y: lineOffsets.mainCircleOffsetY
      },
      {
        x: lineOffsets.objectOffsetX,
        y: lineOffsets.objectOffsetY
      },
      {
        x: parseInt(objectElement.getAttribute("x")) + sizes.rectangle.width / 2,
        y: parseInt(objectElement.getAttribute("y")) + sizes.rectangle.height / 2
      }
    ];
  });

  const createdLines = [];

  lines.forEach(line => {
    const createdLine = svg
      .insert("path")
      .attr("d", lineCreater(line))
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .attr("fill", "none");

    createdLine.lower();

    createdLines.push(createdLine);
  });
};

drawLines(topAreas, "top", "#e4e4e4");
drawLines(bottomAreas, "bottom", "#e4e4e4");
drawLines(leftAreas, "left", "#57bb81");
drawLines(rightAreas, "right", "#8ca8ba");
