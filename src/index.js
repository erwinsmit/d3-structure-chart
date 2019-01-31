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
      title: "Dolphin Retail Park Limited",
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

function setRectangles(rectangles) {
  rectangles
    .attr("y", (d, i) => {
      return 0;
    })
    .style("fill", "#e4e4e4")
    .attr("x", (d, i) => {
      return 0;
    })
    .attr("width", sizes.rectangle.width)
    .attr("height", sizes.rectangle.height)
    .attr("rx", 15)
    .attr("ry", 15);
}

function setLabelsToAreas(areas) {
  areas
    .append("text")
    .text(d => d.title)
    .attr("x", "10")
    .attr("y", "30");

  areas
    .append("text")
    .text(d => d.subtitle)
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

setRectangles(leftRectangles);
setRectangles(topRectangles);
setRectangles(bottomRectangles);
setRectangles(rightRectangles);

setLabelsToAreas(topAreas);
setLabelsToAreas(bottomAreas);
setLabelsToAreas(leftAreas);
setLabelsToAreas(rightAreas);

setHorizontalAreas(topAreas, "top");
setHorizontalAreas(bottomAreas, "bottom");
setVerticalAreas(leftAreas, "left");
setVerticalAreas(rightAreas, "right");

const mainCircle = svg
  .append("circle")
  .attr("cx", sizes.svgContainer.width / 2)
  .attr("cy", sizes.svgContainer.height / 2)
  .attr("r", sizes.centreCircle.width / 2)
  .style("fill", "#114B5F");

const lineCreater = d3
  .line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(d3.curveBasis);

const drawLines = function(objects, position) {
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
      .attr("stroke", "#e4e4e4")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    createdLine.lower();

    createdLines.push(createdLine);
  });
};

drawLines(topAreas, "top");
drawLines(bottomAreas, "bottom");
drawLines(leftAreas, "left");
drawLines(rightAreas, "right");
