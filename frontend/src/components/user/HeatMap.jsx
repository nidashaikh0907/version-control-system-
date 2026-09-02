import react, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

//function to generate random activity
const generateActivityData = (startData, endData) => {
  const data = [];
  const currentDate = new Date(startData);
  const endDate = new Date(endData);

  while (currentDate <= endDate) {
    const count = Math.floor(Math.random() * 50);

    data.push({
      date: currentDate.toISOString().split("T")[0].replaceAll("-", "/"),
      count: count,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const getPanelColors = (maxCount) => {
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenValue = Math.floor((i / maxCount) * 255);
    colors[i] = `rgb(0,${greenValue},0)`;
  }
  return colors;
};
const HeatMapProfile = () => {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const startDate = "2001-01-01";
      const endDate = "2001-12-31";
      const data = generateActivityData(startDate, endDate);
      setActivityData(data);

      const maxCount = Math.max(...data.map((d) => d.count));
      setPanelColors(getPanelColors(maxCount));
    };

    fetchData();
  }, []);

  return (
    <div>
      <h4>Recent Contribution</h4>
      <HeatMap
        className="HeatMapprofile"
        style={{ maxWidth: "700px", height: "200px", color: "white" }}
        value={activityData}
        weekLabels={["sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date("2001-01-01")}
        endDate={new Date("2001-12-31")}
        rectSize={15}
        space={3}
        rectProps={{
          rx: 2.5,
        }}
        panelColors={panelColors}
      />
    </div>
  );
};

export default HeatMapProfile;
