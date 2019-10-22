import React, { Component } from "react";
import "./style.scss";

import { Input, FormFeedback } from "reactstrap";

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      [props.item.name]: props.item.value
    };
  }

  onChange = e => {
    const { item, getFieldValue } = this.props;
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        getFieldValue({
          [item.name]: this.state[`${item.name}`]
        });
      }
    );
  };

  componentWillReceiveProps = nextProps => {
    const { item } = this.props;
    this.setState({
      [item.name]: nextProps.value
    });
  };

  render() {
    const { item, value, errors } = this.props;
    return (
      <div>
        <label className="select-label" for={item.name}>
          {item.vi_name}
        </label>
        <div className="select-input">
          <Input
            type={item.type}
            name={item.name}
            id={item.name}
            value={this.state[`${item.name}`]}
            onChange={this.onChange}
            invalid={errors ? true : false}
          >
            <option value="">Chọn {item.vi_name}</option>
            {item.options.map((opt, key) => (
              <option value={opt} key={key}>
                {opt}
              </option>
            ))}
          </Input>
          <FormFeedback className="form-feedback" invalid>
            {errors}
          </FormFeedback>
        </div>
      </div>
    );
  }
}

export default Select;
