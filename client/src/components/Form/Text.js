import React, { Component } from "react";
import "./style.scss";

import { FormFeedback, Input } from "reactstrap";

class Text extends Component {
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
      <form className="text-form">
        <label className="text-label" htmlFor={item.name}>
          {item.vi_name}
        </label>

        <div className="text-input">
          <Input
            className="text"
            type={item.type}
            name={item.name}
            id={item.name}
            value={this.state[`${item.name}`]}
            onChange={this.onChange}
            invalid={errors ? true : false}
          />
          <FormFeedback className="form-feedback" invalid>
            {errors}
          </FormFeedback>
        </div>
      </form>
    );
  }
}

export default Text;
