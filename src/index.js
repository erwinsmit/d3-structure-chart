const svg = d3.select("svg");

const sizes = {
  svgContainer: {
    width: 800,
    height: 800
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
      subtitle: "Company a"
    },
    {
      title: "Director",
      subtitle: "John Jones"
    }
  ]
};

const topRectangleBinding = svg.selectAll("rect").data(data.top);

const topAreas = topRectangleBinding.enter().append("g");
const topRectangles = topAreas.append("rect");

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

function setAreas(areas) {
  const areaWidthWithMargin = sizes.rectangle.width + sizes.rectangle.margin;
  const areaCount = areas._groups[0].length;
  const totalAreasWidth = areaCount * areaWidthWithMargin;
  const offset = (sizes.svgContainer.width - totalAreasWidth) / 2;
  const getXValue = i => i * areaWidthWithMargin + offset;

  console.log("areas", areas, areaCount, totalAreasWidth, offset);

  areas
    .attr("transform", (d, i) => {
      return `translate(${getXValue(i)}, 50)`;
    })
    .attr("width", sizes.rectangle.width)
    .attr("height", sizes.rectangle.height)
    .attr("x", (d, i) => getXValue(i))
    .attr("y", 50);
}

setRectangles(topRectangles);
setLabelsToAreas(topAreas);
setAreas(topAreas);

const mainCircle = svg
  .append("circle")
  .attr("cx", sizes.svgContainer.width / 2 - sizes.centreCircle.width / 2)
  .attr("cy", sizes.svgContainer.height / 2 - sizes.centreCircle.width / 2)
  .attr("r", sizes.centreCircle.width / 2)
  .style("fill", "#114B5F");

const lineCreater = d3
  .line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(d3.curveBasis);

const drawLines = function(objects) {
  var lines = [];

  const mainCircleElement = mainCircle._groups[0][0];
  const objectElements = objects._groups[0];

  lines = objectElements.map(objectElement => {
    return [
      {
        x: mainCircleElement.getAttribute("cx"),
        y: mainCircleElement.getAttribute("cy")
      },
      {
        x: mainCircleElement.getAttribute("cx"),
        y: mainCircleElement.getAttribute("cy") - 80
      },
      {
        x: parseInt(objectElement.getAttribute("x")) + sizes.rectangle.width / 2,
        y: parseInt(objectElement.getAttribute("y")) + 150
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

drawLines(topAreas);
