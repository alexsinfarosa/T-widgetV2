import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import { Slider } from "antd";
import { Box } from "styles";

@inject("store")
@observer
class TempSlider extends Component {
  onChange = e => {
    const { selectedProjection } = this.props.store.app;
    this.props.store.app.setTemperature(e);
    this.props.store.app.loadObservedData();
    if (selectedProjection === "Projection 2040-2069") {
      this.props.store.app.loadProjection2040();
    } else {
      this.props.store.app.loadProjection2070();
    }
  };

  render() {
    const { temperature } = this.props.store.app;
    const marks = {
      80: "80°F",
      85: "85°F",
      90: "90°F",
      95: "95°F",
      100: {
        style: {
          color: "#E63B2E"
        },
        label: <strong>100°F</strong>
      }
    };
    return (
      <Box>
        <Slider
          style={{ width: "60%" }}
          min={80}
          marks={marks}
          defaultValue={temperature}
          onAfterChange={this.onChange}
        />
      </Box>
    );
  }
}

export default TempSlider;
