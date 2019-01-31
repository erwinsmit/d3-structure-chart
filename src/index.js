const svg = d3.select("svg");

const sizes = {
  rectangle: {
    width: 150,
    height: 90,
    margin: 20
  }
};

const data = [
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
    subtitle: "Intertrust"
  },
  {
    title: "Director",
    subtitle: "John Jones"
  }
];

const rectangleBinding = svg.selectAll("rect").data(data);

const areas = rectangleBinding.enter().append("g");
const rectangles = areas.append("rect");

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
  const getXValue = i => i * (sizes.rectangle.width + sizes.rectangle.margin);

  areas
    .attr("transform", (d, i) => {
      return `translate(${getXValue(i)}, 50)`;
    })
    .attr("width", sizes.rectangle.width)
    .attr("height", sizes.rectangle.height)
    .attr("x", (d, i) => getXValue(i))
    .attr("y", 50);
}

setRectangles(rectangles);
setLabelsToAreas(areas);
setAreas(areas);

const mainCircle = svg
  .append("circle")
  .attr("cx", 280)
  .attr("cy", 300)
  .attr("r", 40)
  .style("fill", "#114B5F");

const lineCreater = d3
  .line()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  })
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
        x: parseInt(objectElement.getAttribute("x")) + 40,
        y: parseInt(objectElement.getAttribute("y")) + 150
      },
      {
        x: parseInt(objectElement.getAttribute("x")) + 40,
        y: parseInt(objectElement.getAttribute("y")) + 30
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

drawLines(areas);
